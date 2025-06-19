import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PointObservationModel } from '../models/point-observation.model';

@Injectable({
  providedIn: 'root',
})
export class PointObservationService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getPointObservations(filters: {
    [key: string]: string | string[];
  }): Observable<PointObservationModel[]> {
    const params = new URLSearchParams();

    for (const key in filters) {
      const value = filters[key];
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.set(key, value);
      }
    }

    const url = `${
      this.baseUrl
    }/station_information/estaciones/visores/?${params.toString()}`;

    return this.http.get<any[]>(url).pipe(
      map((data) =>
        data.map((item) => ({
          // Genéricos para el visor
          name: item.punto_obs,
          code: item.id_estacion,
          type: item.id_captor,
          latitude: item.latitud,
          longitude: item.longitud,
          altitude: item.altitud,
          status: item.id_estado_estacion,

          // Campos adicionales completos
          id_propietario: item.id_propietario,
          id_captor: item.id_captor,
          id_categoria: item.id_categoria,
          id_provincia: item.id_provincia,
          id_region: item.id_region,
          id_cuenca: item.id_cuenca,
          id_estado_transmision: item.id_estado_transmision,
          id_estado_estacion: item.id_estado_estacion,
          codigo_inamhi: item.codigo,
        }))
      )
    );
  }
}
