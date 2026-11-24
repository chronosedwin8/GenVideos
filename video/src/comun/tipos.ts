export type Palabra = {texto: string; inicio: number; fin: number};

export type EscenaManifest = {
  num: string;
  titulo: string;
  audio: string;
  inicio: number;
  duracion: number;
  palabras: Palabra[];
};

export type Manifest = {
  canal: string;
  slug: string;
  duracion_total: number;
  pausa_entre_escenas: number;
  escenas: EscenaManifest[];
};

export type Tema = {
  nombre: string;
  lema: string;
  monograma: string;
  colores: {
    principal: string; // fondo principal (naranja)
    principal2: string; // gradiente claro
    azul: string; // azul del canal
    acento: string; // amarillo
    acento2: string; // verde
    acento3: string; // magenta
    acento4: string; // turquesa
    rojo: string;
    dorado: string;
    oscuro: string;
    claro: string;
    texto: string;
  };
  fuentes: {titulo: string; texto: string; codigo: string};
};

/** Props que recibe cada escena de un episodio. Los tiempos son en segundos, relativos a la escena. */
export type EscenaProps = {
  tema: Tema;
  palabras: Palabra[];
  duracion: number;
  /** Segundo en que se dice la palabra (n-ésima ocurrencia). Sirve para sincronizar entradas con la voz. */
  t: (palabra: string, ocurrencia?: number) => number;
};
