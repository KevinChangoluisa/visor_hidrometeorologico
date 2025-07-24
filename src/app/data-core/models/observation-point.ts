export interface ObservationPoint {}

export interface ParametroEstacionItem {
  nemonico: string;
  fecha_ultimo_dato: string;
  descripcion: string;
  unidad: string;
  simbolo_unidad: string;
  estadistico: string;
  simbolo_estadistico: string;
}

export interface ParametroEstacion {
  id_param: number;
  id_estacion: number;
  nombre_parametro: string;
  simbolo_unidad: string;
  parametros: ParametroEstacionItem[];
}
