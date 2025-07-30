import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { ParametroEstacion } from '../../data-core/models/observation-point';
import { PointObservationModel } from '../../data-core/models/point-observation.model';
import { DataCore } from '../../data-core/services/data-core';
import { PlotlyGraph } from '../services/plotly-graph';
import { SpinnerService } from '../../main/services/spinner-service/spinner-service';

@Component({
  standalone: true,
  selector: 'app-station-chart',
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRadioModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  templateUrl: './station-chart.html',
  styleUrl: './station-chart.scss',
})
export class StationChart implements AfterViewInit {
  @Input() stationInformation!: PointObservationModel;

  @Input() set parametros(value: ParametroEstacion[]) {
    this._parametros = value
      ?.slice()
      .sort((a, b) => a.name_param.localeCompare(b.name_param));
  }

  get parametros(): ParametroEstacion[] {
    return this._parametros;
  }

  private _parametros: ParametroEstacion[] = [];

  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  selectedParam: ParametroEstacion | null = null;
  selectedParams: ParametroEstacion[] = [];
  tipoGrafica: 'simple' | 'combinada' = 'simple';
  tipoGraficaColapsado = false;
  constructor(
    private plotlyService: PlotlyGraph,
    private dataService: DataCore,
    private spinnerService: SpinnerService
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.stationInformation && this.chartContainer) {
        this.plotlyService.drawSampleGraph(
          this.chartContainer.nativeElement,
          this.stationInformation
        );
      }

      // No seleccionar ningún parámetro por defecto
      this.selectedParam = null;
      this.selectedParams = [];
    }, 0);
  }

  onParamChange(): void {
    console.log('Parámetro seleccionado (simple):', this.selectedParam);

    if (!this.selectedParam || !this.stationInformation?.id_estacion) {
      return;
    }

    const nemonicos = this.selectedParam.params?.map((p) => p.nemonico) || [];

    if (nemonicos.length === 0) {
      console.warn(
        'No se encontró ningún nemónico en el parámetro seleccionado.'
      );
      return;
    }

    this.spinnerService.show()

    this.dataService
      .postDataHour(this.stationInformation.id_estacion, nemonicos)
      .then((response) => {
        console.log('✅ Respuesta del backend:', response);
      })
      .catch((error) => {
        console.error('❌ Error al obtener datos horarios:', error);
      })
      .finally(() => {
        this.spinnerService.hide();

      });
  }

  onParamsChange(): void {
    console.log('Parámetros seleccionados (combinada):', this.selectedParams);
  }

  onTipoGraficaChange(event: any): void {
    this.tipoGrafica = event.value;

    // Limpiar selección al cambiar tipo
    this.selectedParam = null;
    this.selectedParams = [];

    console.log('Tipo de gráfica cambiada a:', this.tipoGrafica);
  }
}
