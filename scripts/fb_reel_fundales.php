<?php

declare(strict_types=1);

/*
 * Publica (o programa) un Reel en la página de Facebook «Fundales.com» usando la conexión que ya existe en edwinortizNET
 * (token de página cifrado en su base de datos). No modifica ese proyecto y nunca imprime el token.
 *
 *   C:\xampp\php\php.exe scripts/fb_reel_fundales.php --check
 *   C:\xampp\php\php.exe scripts/fb_reel_fundales.php video.mp4 texto.txt [--programar "AAAA-MM-DD HH:MM"] [--simular]
 *
 * Hora en Colombia (UTC-5). Flujo de la API de Reels: start → subida a rupload.facebook.com → finish.
 * Salida: una línea JSON {"ok":true,"video_id":"…","estado":"PUBLISHED|SCHEDULED","programado":"…"}.
 */

const PROYECTO_FB = 'C:/xampp/htdocs/edwinortizNET';
const PAGINA = 'Fundales.com';

require PROYECTO_FB . '/vendor/autoload.php';
App\Core\App::boot(PROYECTO_FB);

use App\Services\Social\Accounts;
use App\Services\Social\MetaClient;

function salir(string $msg, int $code = 1): never
{
    fwrite(STDERR, MetaClient::scrub($msg) . PHP_EOL);
    exit($code);
}

$args = array_slice($argv, 1);
$cuenta = null;
foreach (Accounts::all() as $a) {
    if ($a['network'] === 'fb' && $a['name'] === PAGINA) {
        $cuenta = $a;
    }
}
if (!$cuenta) {
    salir('No encontré la página «' . PAGINA . '» conectada en edwinortizNET (Redes sociales → Conexión).');
}
$token = Accounts::token($cuenta);
$pagina = (string) $cuenta['external_id'];
$api = MetaClient::graph();

if (in_array('--check', $args, true)) {
    $p = $api->get($pagina, ['fields' => 'id,name,link,fan_count,followers_count'], $token);
    echo json_encode(['ok' => true, 'pagina' => $p['name'] ?? '', 'id' => $p['id'] ?? '', 'seguidores' => $p['followers_count'] ?? null, 'me_gusta' => $p['fan_count'] ?? null], JSON_UNESCAPED_UNICODE) . PHP_EOL;
    exit(0);
}

$posicionales = array_values(array_filter($args, fn ($x) => !str_starts_with($x, '--')));
[$archivo, $textoArchivo] = $posicionales + [null, null];
if (!$archivo || !is_file($archivo) || !$textoArchivo || !is_file($textoArchivo)) {
    salir('Uso: fb_reel_fundales.php video.mp4 texto.txt [--programar "AAAA-MM-DD HH:MM"] [--simular]');
}
$descripcion = trim((string) file_get_contents($textoArchivo));
$programado = null;
$i = array_search('--programar', $args, true);
if ($i !== false) {
    $fecha = DateTime::createFromFormat('Y-m-d H:i', (string) ($args[$i + 1] ?? ''), new DateTimeZone('America/Bogota'));
    if (!$fecha) {
        salir('Fecha inválida: usa "AAAA-MM-DD HH:MM" (hora de Colombia).');
    }
    if ($fecha->getTimestamp() < time() + 15 * 60) {
        salir('La hora programada debe ser al menos 15 minutos en el futuro.');
    }
    $programado = $fecha;
}
$bytes = filesize($archivo);

if (in_array('--simular', $args, true)) {
    echo json_encode(['ok' => true, 'simulado' => true, 'pagina' => PAGINA, 'archivo' => basename($archivo), 'mb' => round($bytes / 1048576, 1), 'programado' => $programado?->format('Y-m-d H:i'), 'caracteres' => mb_strlen($descripcion)], JSON_UNESCAPED_UNICODE) . PHP_EOL;
    exit(0);
}

// 1. Iniciar la subida.
$ini = $api->post($pagina . '/video_reels', ['upload_phase' => 'start'], $token);
$videoId = (string) ($ini['video_id'] ?? '');
$url = (string) ($ini['upload_url'] ?? '');
if ($videoId === '' || $url === '') {
    salir('La API no devolvió video_id/upload_url.');
}

// 2. Subir el archivo (binario) a rupload.facebook.com.
$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => ['Authorization: OAuth ' . $token, 'offset: 0', 'file_size: ' . $bytes, 'Content-Type: application/octet-stream'],
    CURLOPT_POSTFIELDS => file_get_contents($archivo),
    CURLOPT_TIMEOUT => 600,
    CURLOPT_SSL_VERIFYPEER => true,
]);
$resp = curl_exec($ch);
$http = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
curl_close($ch);
$j = json_decode((string) $resp, true);
if ($http !== 200 || empty($j['success'])) {
    salir('Falló la subida del video (HTTP ' . $http . '): ' . substr((string) $resp, 0, 300));
}

// 3. Finalizar: publicar o programar.
$fin = ['upload_phase' => 'finish', 'video_id' => $videoId, 'description' => $descripcion, 'video_state' => $programado ? 'SCHEDULED' : 'PUBLISHED'];
if ($programado) {
    $fin['scheduled_publish_time'] = (string) $programado->getTimestamp();
}
$r = $api->post($pagina . '/video_reels', $fin, $token);
if (empty($r['success'])) {
    salir('La API no confirmó la publicación: ' . json_encode($r));
}
echo json_encode(['ok' => true, 'video_id' => $videoId, 'estado' => $fin['video_state'], 'programado' => $programado?->format('Y-m-d H:i')], JSON_UNESCAPED_UNICODE) . PHP_EOL;
