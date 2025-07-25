import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SideMenu } from '../side-menu/side-menu';
import { HeaderTitle } from '../header-title/header-title';
import { MessageBar } from '../../message-bar/message-bar/message-bar';
import { ContentMap } from '../content-map/content-map';

import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { StationDataPanel } from '../../graph/station-data-panel/station-data-panel';
import { PointObservationModel } from '../../data-core/models/point-observation.model';
import { ParametroEstacion } from '../../data-core/models/observation-point';

@Component({
  selector: 'app-main-root',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    SideMenu,
    HeaderTitle,
    MessageBar,
    ContentMap,
    StationDataPanel,
  ],
  templateUrl: './main-root.html',
  styleUrl: './main-root.scss',
  animations: [
    trigger('menuAnimation', [
      state(
        'open',
        style({
          width: '250px',
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          width: '0px',
          opacity: 0,
        })
      ),
      transition('open <=> closed', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class MainRoot {
  isMenuOpen = false;
  panelVisible = false;
  stationInfo: PointObservationModel | null = null;
  parametrosEstacion: ParametroEstacion[] = [];
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onShowPanel(event: {
    info: PointObservationModel;
    parametros: ParametroEstacion[];
  }) {
    this.stationInfo = event.info;
    this.parametrosEstacion = event.parametros;
    this.panelVisible = true;
  }
}
