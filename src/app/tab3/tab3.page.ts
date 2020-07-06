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
    this.totalData();
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
  public URL_Confirmados: string;
  public URL_Recuperados: string;
  public URL_Fallecidos: string;
  public URL_Grave: string;
  public URL_Moderado: string;
  public sexTotalGraficaEstado = "Recuperado";
  public totalSexChartOptions: ChartOptions = {
    responsive: true,
    title:{
      display: true,
      text:"Casos por sexo"
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


  public totalStateChartOptions: ChartOptions = {
    responsive: true,
    title:{
      display: true,
      text:"Casos por condición"
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



  public totalSexArr: number[] = [0, 0, 0, 0, 0, 0];
  public totalStateArr: number[] = [30, 20, 50, 80];
  public totalSex: any = "Cargando...";
  public totalRecuperado: number = 0;
  public totalFallecido: number = 0;
  public totalModerado: number = 0;
  public totalGrave: number = 0;
  // URL = `https://www.datos.gov.co/resource/gt2j-8ykr.json?sexo=${this.sexo}&departamento=${this.depto}$limit=9999999999`;
  // URL_depos = `https://www.datos.gov.co/resource/gt2j-8ykr.json?departamento=${this.depto}$limit=9999999999`;
  public totalChartPlugins = [pluginDataLabels];
  public totalSexChartColors = [
    {
      backgroundColor: ['rgba(0, 119, 255, 0.5)', 'rgba(223, 174, 230, 0.5)'],
    },
  ];

  public totalStateChartColors = [
    {
      backgroundColor: ['rgba(153, 213, 201, 0.5)', 'rgba(108, 150, 157 0.5)', 'rgba(100, 94, 157, 0.5)', 'rgba(57, 43, 88, 0.5)'],
    },
  ];

  public totalSexData: ChartDataSets[] = [
    { 
      data:[],
      label: "Sexo"
    }
  ]

  public totalStateData: ChartDataSets[] = [
    { 
      data:[],
      label: "Estado"
    }
  ]

  public totalSexLabels: Label[] = ["Masculino", "Femenino"];
  public totalStateLabels: Label[] = ["Recuperados", "Fallecidos", "Moderado", "Grave"];


  totalData(){
    this.URL_Confirmados = `https://www.datos.gov.co/resource/gt2j-8ykr.json?$limit=99999999999&`;
    this.URL_Recuperados = `https://www.datos.gov.co/resource/gt2j-8ykr.json?$limit=99999999999&atenci_n=Recuperado`;
    this.URL_Fallecidos = `https://www.datos.gov.co/resource/gt2j-8ykr.json?$limit=99999999999&atenci_n=Fallecido`;
    this.URL_Grave = `https://www.datos.gov.co/resource/gt2j-8ykr.json?$limit=99999999999&estado=Grave`;
    this.URL_Moderado = `https://www.datos.gov.co/resource/gt2j-8ykr.json?$limit=99999999999&estado=Moderado`;
    
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'X-App-Token':'HfpRjVYxQZ7DAKrrpe5hIjnoj',
      })
    };

    // Confirmados
    this.http.get(this.URL_Confirmados, httpOptions).subscribe((res: any[]) => {
      for (let persona of res){
        if (persona["sexo"] === "M"){
          this.totalSexArr[0] += 1;
  
        } else {
          this.totalSexArr[1] += 1;
        }
      }
      this.TotalSexData(this.sexTotalGraficaEstado);
    })

    this.http.get(this.URL_Recuperados, httpOptions).subscribe((res: any[]) => {
      for (let persona of res){
        if (persona["sexo"] === "M"){
          this.totalSexArr[2] += 1;

  
        } else {
          this.totalSexArr[3] += 1;
        }
      }
      this.TotalSexData(this.sexTotalGraficaEstado);
      this.totalRecuperado = this.totalSexArr[2] + this.totalSexArr[3];
      this.totalStateArr[0] = this.totalRecuperado;
      this.totalStateData[0].data = [this.totalRecuperado, this.totalFallecido, this.totalModerado, this.totalGrave];
      console.log("Recuperados: ", this.totalStateArr[0]);
    })

    this.http.get(this.URL_Fallecidos, httpOptions).subscribe((res: any[]) => {
      for (let persona of res){
        if (persona["sexo"] === "M"){
          this.totalSexArr[4] += 1;

  
        } else {
          this.totalSexArr[5] += 1;
        }
      }
      this.TotalSexData(this.sexTotalGraficaEstado);
      this.totalFallecido = this.totalSexArr[4] + this.totalSexArr[5];
      this.totalStateArr[1] = this.totalFallecido;
      console.log("Fallecidos: ", this.totalStateArr[1]);
      this.totalStateData[0].data = [this.totalRecuperado, this.totalFallecido, this.totalModerado, this.totalGrave];
    })

    this.http.get(this.URL_Moderado, httpOptions).subscribe((res: any[]) => {
      this.totalModerado = res.length;
      this.totalStateArr[2] = this.totalModerado;
      console.log("Moderado: ", this.totalStateArr[2]);
      this.totalStateData[0].data = [this.totalRecuperado, this.totalFallecido, this.totalModerado, this.totalGrave];
    });

    this.http.get(this.URL_Grave, httpOptions).subscribe((res: any[]) => {
      this.totalGrave = res.length;
      this.totalStateArr[3] = this.totalGrave;
      console.log("Grave: ", this.totalStateArr[3]);
      this.totalStateData[0].data = [this.totalRecuperado, this.totalFallecido, this.totalModerado, this.totalGrave];
    });
  }


  TotalSexData(tipo:string){
    if (tipo === "Confirmados"){
      this.totalSexData[0].data = [this.totalSexArr[0], this.totalSexArr[1]];
      this.totalSex = this.totalSexArr[0] + this.totalSexArr[1];
      if (this.totalSex === 0){
        this.totalSex = "Cargando...";
      }
      
    } else if (tipo === "Recuperado"){
      this.totalSexData[0].data = [this.totalSexArr[2], this.totalSexArr[3]];
      this.totalSex = this.totalSexArr[2] + this.totalSexArr[3];
      if (this.totalSex === 0){
        this.totalSex = "Cargando...";
      }

    } else{
      this.totalSexData[0].data = [this.totalSexArr[4], this.totalSexArr[5]];
      this.totalSex = this.totalSexArr[4] + this.totalSexArr[5];
      if (this.totalSex === 0){
        this.totalSex = "Cargando...";
      }
    }
  }


  tipoGraficas(event){
    this.tabGraficas = event.detail.value;
    this.sexTotalGraficaEstado = event.detail.value;
  }

  sexTotalTipoGrafica(event){
    this.TotalSexData(event.detail.value);
  }
}
