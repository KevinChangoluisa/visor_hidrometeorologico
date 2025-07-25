import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { PointObservationModel } from '../../../data-core/models/point-observation.model';
import { MarkerLayerService } from '../../services/marker-layer';
import { OpenLayersMapService } from '../../services/openlayers-map';

@Component({
  selector: 'app-mapa-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mapa-main.html',
  styleUrl: './mapa-main.scss',
})
export class MapaMain implements OnInit {
  @Input() observations: PointObservationModel[] = [];

  @ViewChild('mapContainerRef') mapContainerRef!: ElementRef;

  constructor(
    private olService: OpenLayersMapService,
    private markerService: MarkerLayerService
  ) {}

  ngOnInit(): void {
    // Espera a que el contenedor esté disponible en el DOM
    setTimeout(() => {
      const container = this.mapContainerRef.nativeElement;
      this.olService.createMap(container);
      this.olService.resizeMap();

      const map = this.olService.getMap();
      if (map) {
        this.markerService.renderMarkers(map, this.observations);
      }

      console.log(this.observations);
    });
  }
}
