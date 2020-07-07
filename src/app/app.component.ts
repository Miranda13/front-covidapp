import { Component, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TraerDataGraficosService } from './services/traer-data-graficos.service';
import { TraerDataEdadesService } from './services/traer-data-edades.service';

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
    private servicioEdades: TraerDataEdadesService,

  ) {
    this.initializeApp();
    servicioEdades.getAgeData();
    servicioGraficosTotales.totalData().then((res) => {
      // servicioEdades.getAgeData();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
