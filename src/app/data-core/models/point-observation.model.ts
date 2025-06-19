export interface PointObservationModel {
  // Genéricos para el visor
  name: string;
  code: string;
  type: string;
  latitude: number;
  longitude: number;
  altitude: number;
  status: string;

  // Campos adicionales completos
  id_propietario: number;
  id_captor: number;
  id_categoria: number;
  codigo_inamhi: string;
  id_provincia: number;
  id_region: number;
  id_cuenca: number;
  id_estado_transmision: number;
  id_estado_estacion: number;
}
