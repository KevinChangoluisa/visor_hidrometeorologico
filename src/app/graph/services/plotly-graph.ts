declare const Plotly: any;

import { Injectable } from '@angular/core';
import { PointObservationModel } from '../../data-core/models/point-observation.model';
import {
  ParametroEstacion,
  ParametroEstacionItem,
} from '../../data-core/models/observation-point';

interface SerieResponse {
  nemonico: string;
  id_estacion: number;
  color: string;
  data: { fecha_toma_dato: string; valor: number }[];
}

@Injectable({
  providedIn: 'root',
})
export class PlotlyGraph {
  // Principal
  renderSeriesChart(
    containerElement: HTMLElement,
    station: PointObservationModel,
    parametro: ParametroEstacion,
    seriesData: SerieResponse[],
    traceType: string = 'lines+markers'
  ): void {
    const traces = this.createTraces(seriesData, parametro.params, traceType);
    const layout = this.createLayout(station, parametro);
    Plotly.newPlot(containerElement, traces, layout);
  }

  // Traza por serie
  private createTraces(
    seriesData: SerieResponse[],
    definiciones: ParametroEstacionItem[],
    traceType: string
  ): any[] {
    return seriesData.map((serie) => {
      const def = definiciones.find((d) => d.nemonico === serie.nemonico);
      const unidad = def?.simbolo_unidad || '';
      const estadistico =
        def?.estadistico?.toUpperCase() === 'SUMA'
          ? 'Acum'
          : def?.simbolo_estadistico || def?.estadistico || '';
      const name = `${estadistico.toUpperCase()} (${unidad})`;

      const x = serie.data.map((d) => new Date(d.fecha_toma_dato));
      const y = serie.data.map((d) => d.valor);

      const common = {
        name,
        x,
        y,
        line: { color: serie.color },
        marker: { color: serie.color, size: 6 },
        connectgaps: false,
        hovertemplate: `<b>%{fullData.name}:</b> %{y:.2f} ${unidad}<extra></extra>`,
      };

      if (traceType === 'bar') {
        return {
          type: 'bar',
          ...common,
        };
      }

      if (traceType === 'area') {
        return {
          type: 'scatter',
          mode: 'lines',
          fill: 'tozeroy',
          ...common,
        };
      }

      // scatter con mode personalizado: lines, markers, lines+markers
      return {
        type: 'scatter',
        mode: traceType,
        ...common,
      };
    });
  }

  // Layout general
  private createLayout(
    station: PointObservationModel,
    parametro: ParametroEstacion
  ): any {
    return {
      title: {
        text:
          `<b>ESTACIÓN METEOROLÓGICA ${station.punto_obs?.toUpperCase()}</b><br>` +
          `${station.provincia?.toUpperCase()} - ${station.canton?.toUpperCase()}<br>` +
          `CÓDIGO: <b>${station.codigo?.toUpperCase()}</b> | LAT: <b>${
            station.latitud
          }</b> | LONG: <b>${station.longitud}</b> | ALTURA: <b>${
            station.altitud
          } M S.N.M.</b>`,
        font: { size: 13, color: '#000' },
        xref: 'paper',
        x: 0.5,
        xanchor: 'center',
      },
      margin: { t: 120, l: 80, r: 30, b: 60 },
      paper_bgcolor: 'white',
      plot_bgcolor: 'white',
      font: {
        family: 'Arial, sans-serif',
        size: 12,
      },
      legend: {
        orientation: 'h',
        y: -0.3,
        x: 0.5,
        xanchor: 'center',
        font: {
          size: 11,
        },
      },
      showlegend: true,
      hovermode: 'x unified',
      hoverlabel: {
        bgcolor: 'white',
        bordercolor: 'black',
        font: {
          family: 'Arial, sans-serif',
          size: 13,
          color: '#002B52',
        },
      },
      yaxis: {
        title: {
          text: `${parametro.name_param} (${parametro.simbolo_unidad})`,
          font: {
            size: 13,
          },
        },
        automargin: true,
      },

      // Marca de agua
      annotations: [
        {
          text: 'INAMHI',
          font: {
            size: 80,
            color: '#002B52',
            family: 'Arial Black, sans-serif',
          },
          xref: 'paper',
          yref: 'paper',
          x: 0.5,
          y: 0.5,
          xanchor: 'center',
          yanchor: 'middle',
          opacity: 0.07,
          showarrow: false,
        },
      ],
    };
  }
}
