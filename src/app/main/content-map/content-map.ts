import { Component, OnInit } from '@angular/core';
import { MapaMain } from '../../mapa/components/mapa-main/mapa-main';
import { CommonModule } from '@angular/common';
import { PointObservationModel } from '../../data-core/models/point-observation.model';
import { PointObservationService } from '../../data-core/services/point-observation';
import { FloatingSearchComponent } from '../../mapa/components/floating-search/floating-search';
import { OpenLayersMapService } from '../../mapa/services/openlayers-map';
import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-content-map',
  standalone: true,
  imports: [CommonModule, MapaMain, FloatingSearchComponent],
  templateUrl: './content-map.html',
  styleUrl: './content-map.scss',
})
export class ContentMap implements OnInit {
  observations: PointObservationModel[] = [];

  constructor(
    private pointObsService: PointObservationService,
    private olService: OpenLayersMapService
  ) {}

  ngOnInit(): void {
    const params = {
      id_provincia: ['17', '04'],
      id_estado_transmision: '2',
    };

    this.pointObsService.getPointObservations(params).subscribe({
      next: (data) => {
        this.observations = data;
      },
      error: (err) => {
        console.error('Error al obtener observaciones:', err);
      },
    });
  }

  onStationSelected(obs: PointObservationModel) {
    const map = this.olService.getMap(); // ✅ correctamente desde OpenLayersMapService
    if (map) {
      const coords = fromLonLat([obs.longitude, obs.latitude]);
      map.getView().animate({ center: coords, zoom: 18, duration: 800 });
    }
  }
}
