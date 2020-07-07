import { Component, ViewChildren, QueryList } from '@angular/core';
import { TraerDataGraficosService } from '../services/traer-data-graficos.service';
import { TraerDataEdadesService } from '../services/traer-data-edades.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  // @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;
  @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;
  constructor(
    private servicioGraficosTotales: TraerDataGraficosService,
    private servicioEdades: TraerDataEdadesService,
  ) {
    this.servicioGraficosTotales.actualizeTotalSexData('Confirmados');

    setInterval(() => {
      this.charts.forEach((child) => {
        child.chart.update();
      });
    }, 1000);
  }

  private deptosList = [
    "Bogotá D.C.",
    "Barranquilla D.E.",
    "Atlántico",
    "Valle del Cauca",
    "Cartagena D.T. y C.",
    "Antioquia",
    "Nariño",
    "Cundinamarca",
    "Amazonas",
    "Chocó",
    "Sucre",
    "Buenaventura D.E.",
    "Meta",
    "Cesar",
    "Santa Marta D.T. y C.",
    "Tolima",
    "Bolívar",
    "Córdoba",
    "Magdalena",
    "Santander",
    "Risaralda",
    "La Guajira",
    "Cauca",
    "Boyacá",
    "Huila",
    "Norte de Santander",
    "Caldas",
    "Quindío",
    "Casanare",
    "Arauca",
    "Caquetá",
    "Guaviare",
    "Putumayo",
    "Archipiélago de San Andrés Providencia y Santa Catalina",
    "Vaupés",
    "Guainía",
    "Vichada"
  ]

  public tabGraficas: string = "Totales";

  tipoGraficas(event){
    this.tabGraficas = event.detail.value;
    this.servicioGraficosTotales.sexTotalGraficaEstado = event.detail.value;
  }

  sexTotalTipoGrafica(event){
    this.servicioGraficosTotales.sexTotalGraficaEstado = event.detail.value;
    this.servicioGraficosTotales.actualizeTotalSexData(event.detail.value);
  }

  ageTotalTipoGrafica(event){
    this.servicioEdades.ageTotalGraficaEstado = event.detail.value;
    this.servicioEdades.actualizeTotalAgeData(event.detail.value);
  }

}
