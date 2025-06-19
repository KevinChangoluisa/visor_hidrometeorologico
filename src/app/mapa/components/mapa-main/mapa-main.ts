// src/app/mapa/components/mapa-main/mapa-main.ts
import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenLayersMapService } from '../../services/openlayers-map';
@Component({
  selector: 'app-mapa-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mapa-main.html',
  styleUrl: './mapa-main.scss'
})
export class MapaMain implements AfterViewInit {

  constructor(private olService: OpenLayersMapService) {}

  ngAfterViewInit(): void {
    this.olService.createMap('mapContainer');
  }
}
