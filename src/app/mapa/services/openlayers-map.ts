// src/app/mapa/services/openlayers-map.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { transformExtent, fromLonLat } from 'ol/proj';
import { DEFAULT_OL_CONFIG } from '../../settings/ol-default-config';

@Injectable({
  providedIn: 'root',
})
export class OpenLayersMapService {
  private map?: Map;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Crea el mapa si se está ejecutando en el navegador (no en SSR).
   * @param targetId ID del contenedor HTML donde se renderizará el mapa.
   */
  createMap(container: HTMLElement): Map | undefined {
    if (!isPlatformBrowser(this.platformId)) return;

    const center = fromLonLat(DEFAULT_OL_CONFIG.center);
    const extent = transformExtent(
      DEFAULT_OL_CONFIG.extent4326,
      'EPSG:4326',
      DEFAULT_OL_CONFIG.projection
    );

    this.map = new Map({
      target: container, // CAMBIADO: antes era un string
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center,
        zoom: DEFAULT_OL_CONFIG.zoom,
        maxZoom: DEFAULT_OL_CONFIG.maxZoom,
        minZoom: DEFAULT_OL_CONFIG.minZoom,
        projection: DEFAULT_OL_CONFIG.projection,
        extent,
      }),
    });

    this.enableMarkerPointerEffect();
    return this.map;
  }

  /**
   * Devuelve el mapa actual (si existe).
   */
  getMap(): Map | undefined {
    return this.map;
  }

  /**
   * Fuerza el redimensionamiento del mapa.
   */
  resizeMap(): void {
    if (this.map) {
      setTimeout(() => {
        this.map!.updateSize();
      }, 100); // Espera para que el DOM se asiente completamente
    }
  }

  /**
   * Agrega efecto visual de clickeable al pasar sobre estaciones.
   * Cambia el cursor a 'pointer' al estar sobre un marker.
   */
  enableMarkerPointerEffect(): void {
    const map = this.map;
    if (!map) return;

    map.on('pointermove', (event) => {
      const pixel = map.getEventPixel(event.originalEvent);
      const hit = map.hasFeatureAtPixel(pixel);

      const target = map.getTargetElement();
      if (target) {
        target.style.cursor = hit ? 'pointer' : '';
      }
    });
  }
}
