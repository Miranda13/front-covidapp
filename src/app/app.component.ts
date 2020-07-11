import { Component, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TraerDataGraficosService } from './services/traer-data-graficos.service';
import { TraerDataEdadesService } from './services/traer-data-edades.service';
import { TraerDeptoSexStateDataService } from './services/traer-depto-sex-state-data.service';
import { TraerDataEdadesDeptosService } from './services/traer-data-edades-deptos.service';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private servicioGraficosTotales: TraerDataGraficosService,
    private servicioGraficosDeptos: TraerDeptoSexStateDataService,
    private servicioEdades: TraerDataEdadesService,
    private servicioEdadesDeptos: TraerDataEdadesDeptosService,

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.servicioGraficosTotales.totalData();

    setTimeout(() => {
      this.servicioEdades.getAgeData();
    }, 8000);


    setTimeout(() => {
      console.log("servicioGraficosDeptos 12000");
      this.servicioGraficosDeptos.deptoData('Bogotá D.C.');
    }, 12000);


    setTimeout(() => {
      console.log("servicioEdadesDeptos 16000");
      this.servicioEdadesDeptos.getAgeData('Bogotá D.C.');
    }, 16000);
  }
}
