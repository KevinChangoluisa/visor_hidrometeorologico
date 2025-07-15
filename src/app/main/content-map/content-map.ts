import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  computed,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { fromLonLat } from 'ol/proj';
import { PointObservationModel } from '../../data-core/models/point-observation.model';
import { PointObservationService } from '../../data-core/services/point-observation';
import { FloatingSearchComponent } from '../../mapa/components/floating-search/floating-search';
import { MapaMain } from '../../mapa/components/mapa-main/mapa-main';
import { PointFilterComponent } from '../../mapa/components/settings/point-filter';
import { MarkerLayerService } from '../../mapa/services/marker-layer';
import { OpenLayersMapService } from '../../mapa/services/openlayers-map';
import { DEFAULT_OBSERVATION_FILTER } from '../../settings/observation-config';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-content-map',
  standalone: true,
  imports: [
    CommonModule,
    MapaMain,
    FloatingSearchComponent,
    PointFilterComponent,
    MatIconModule,
  ],
  templateUrl: './content-map.html',
  styleUrl: './content-map.scss',
})
export class ContentMap implements OnInit {
  observations: PointObservationModel[] = [];
  selectedCaptorTypes: number[] = [
    ...DEFAULT_OBSERVATION_FILTER.allowedCaptors,
  ];

  // Panel activo: 'filter', 'search' o null
  private currentPanel = signal<'filter' | 'search' | null>(null);

  showFilterPanel = computed(() => this.currentPanel() === 'filter');
  showSearchPanel = computed(() => this.currentPanel() === 'search');

  constructor(
    private pointObsService: PointObservationService,
    private olService: OpenLayersMapService,
    private markerService: MarkerLayerService,
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {
    const params = {
      id_aplicacion: environment.id_aplicacion_horario,
    };

    this.pointObsService.getPointObservations(params).subscribe({
      next: (data) => {
        this.observations = data;
        this.updateMarkers();
      },
      error: (err) => {
        console.error('Error al obtener observaciones:', err);
      },
    });
  }

  onStationSelected(obs: PointObservationModel): void {
    const map = this.olService.getMap();
    if (map) {
      const coords = fromLonLat([obs.longitud, obs.latitud]);
      map.getView().animate({ center: coords, zoom: 18, duration: 800 });
    }
  }

  onCaptorFilterChange(newList: number[]): void {
    console.log(this.filteredObservations);
    this.selectedCaptorTypes = newList;
    this.updateMarkers();
  }

  get filteredObservations(): PointObservationModel[] {
    return this.observations.filter((obs) => {
      const tipo = [1, 2].includes(obs.id_captor) ? obs.id_captor : 0;
      return this.selectedCaptorTypes.includes(tipo);
    });
  }

  togglePanel(panel: 'filter' | 'search'): void {
    const current = this.currentPanel();
    this.currentPanel.set(current === panel ? null : panel);
  }

  private updateMarkers(): void {
    const map = this.olService.getMap();
    if (map) {
      this.markerService.renderMarkers(map, this.filteredObservations);
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    // Evita cerrar si haces clic en los botones o dentro del panel de configuración o búsqueda
    const isInsidePanel =
      target.closest('.top-right-settings') ||
      target.closest('.bottom-right-search') ||
      target.closest('.floating-panel') ||
      target.closest('.search-panel') ||
      target.closest('.floating-search');

    if (!isInsidePanel) {
      this.currentPanel.set(null);
    }
  }
}
