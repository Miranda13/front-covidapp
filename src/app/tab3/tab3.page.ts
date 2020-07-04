import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private http: HttpClient,
  ) {
    this.traerDeptosData();
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


  public deptoChartOptions: ChartOptions = {
    responsive: true,
    title:{
      display: true,
      text:"Casos reportados por sexo"
    },
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        color:"black",
      },
    }
  };

  sexo = "F";
  depto = "Bogotá D.C.";
  estado = "Leve"
  URL = `https://www.datos.gov.co/resource/gt2j-8ykr.json?sexo=${this.sexo}&departamento=${this.depto}`;
  URL_depos = `https://www.datos.gov.co/resource/gt2j-8ykr.json?departamento=${this.depto}`;
  deptosSexM:number = 0;
  deptosSexF:number = 0;
  leyendaDepto = true;
  deptoChartPlugins = [pluginDataLabels];
  deptoPieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)'],
    },
  ];

  deptoChartData: ChartDataSets[] = [
    { 
      data:[],
      label: "Sexo"
    }
  ]

  deptoChartLabels: Label[];
  chartType = 'pie';

  traerDeptosData(){
    this.deptosSexM = 0;
    this.deptosSexF = 0;
    this.URL_depos = `https://www.datos.gov.co/resource/gt2j-8ykr.json?departamento=${this.depto}`;

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'X-App-Token':'HfpRjVYxQZ7DAKrrpe5hIjnoj',
      })
    };

    this.http.get(this.URL_depos, httpOptions).subscribe((res: any[]) => {
      this.deptoChartLabels = ["M", "F"];
      // console.log(res);
      for (let persona of res){
        this.deptosSexM += persona["sexo"] === "M" ? 1 : 0;
        this.deptosSexF += persona["sexo"] === "F" ? 1 : 0;
      }

      this.deptoChartData[0].data = [this.deptosSexM, this.deptosSexF]
    })
  }


  onChangeDepto(_depto){
    this.traerDeptosData()
    // console.log(this.depto);
    // console.log(this.URL_depos);
  }
}
