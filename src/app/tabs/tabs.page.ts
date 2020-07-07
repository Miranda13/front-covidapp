import { Component } from '@angular/core';
import { TraerDataGraficosService } from '../services/traer-data-graficos.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private datosTotales: TraerDataGraficosService,
  ) {}


  public actualizarEstados(){
    this.datosTotales.actualizeStates();
  }
}
