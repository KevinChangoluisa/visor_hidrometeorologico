import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  SimpleChanges,
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
export class MapaMain implements AfterViewInit {
  @Input() observations: PointObservationModel[] = [];

  @ViewChild('mapContainerRef') mapContainerRef!: ElementRef;

  private mapInitialized = false;

  constructor(
    private olService: OpenLayersMapService,
    private markerService: MarkerLayerService
  ) {}

  ngAfterViewInit(): void {
    const container = this.mapContainerRef.nativeElement;
    this.olService.createMap(container);
    this.mapInitialized = true;
    this.olService.resizeMap();

    if (this.observations.length) {
      this.processObservations();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['observations'] && this.mapInitialized) {
    //   this.processObservations();
    // }
  }

  private processObservations(): void {
    console.log(this.observations);

    const map = this.olService.getMap();
    if (map) {
      this.markerService.renderMarkers(map, this.observations);
    }
  }
}
