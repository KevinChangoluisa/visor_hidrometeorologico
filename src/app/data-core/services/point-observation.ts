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
    return this.http.get<PointObservationModel[]>(url);
  }
}
