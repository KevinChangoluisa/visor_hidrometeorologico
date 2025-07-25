// src/app/graph/services/plotly-graph.ts
declare const Plotly: any;

import { Injectable } from '@angular/core';
import { PointObservationModel } from '../../data-core/models/point-observation.model';

@Injectable({
  providedIn: 'root',
})
export class PlotlyGraph {
  drawSampleGraph(containerId: string, infoStation: PointObservationModel) {
    const data = [
      {
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'blue' },
      },
    ];

    const layout = this.createStationLayout(infoStation);

    Plotly.newPlot(containerId, data, layout);
  }

  createStationLayout(infoStation: PointObservationModel): any {
    return {
      title: {
        text:
          `Estación ${infoStation.categoria} <b>${infoStation.punto_obs}</b><br>` +
          `${infoStation.provincia.toUpperCase()} - ${infoStation.canton.toUpperCase()}<br>` +
          `Código: <b>${infoStation.codigo}</b> &nbsp;|&nbsp; Lat: <b>${infoStation.latitud}</b> &nbsp;|&nbsp; Long: <b>${infoStation.longitud}</b> &nbsp;|&nbsp; Altura: <b>${infoStation.altitud} m s.n.m.</b>`,
        font: {
          size: 14,
          color: '#333',
        },
        xref: 'paper',
        x: 0.5,
        xanchor: 'center',
      },
      margin: { t: 100, l: 60, r: 30, b: 50 },
      paper_bgcolor: 'white',
      plot_bgcolor: 'white',
      font: {
        family: 'Arial, sans-serif',
        size: 12,
      },
    };
  }
}
