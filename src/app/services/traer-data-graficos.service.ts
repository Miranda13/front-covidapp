import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Injectable({
  providedIn: 'root'
})
export class TraerDataGraficosService {

  constructor( 
    private http: HttpClient,
    ) { }

  public URL_Confirmados: string;
  public URL_Recuperados: string;
  public URL_Fallecidos: string;
  public URL_Grave: string;
  public URL_Moderado: string;  
  public totalSexArr: number[] = [0, 0, 0, 0, 0, 0];
  public totalStateArr: number[] = [0, 0, 0, 0];

  public totalSex: any = "Cargando...";
  public totalRecuperado: number = 0;
  public totalFallecido: number = 0;
  public totalModerado: number = 0;
  public totalGrave: number = 0;
  public sexTotalGraficaEstado = "Confirmados";

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


  // URL = `https://www.datos.gov.co/resource/gt2j-8ykr.json?sexo=${this.sexo}&departamento=${this.depto}$limit=9999999999`;
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
      data:[0, 0, 0, 0],
      label: "Estado"
    }
  ]

  public totalSexLabels: Label[] = ["Masculino", "Femenino"];
  public totalStateLabels: Label[] = ["Recuperados", "Fallecidos", "Moderado", "Grave"];


  async totalData(){
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
    await this.http.get(this.URL_Confirmados, httpOptions).subscribe((res: any[]) => {
      for (let persona of res){
        if (persona["sexo"] === "M"){
          this.totalSexArr[0] += 1;
  
        } else {
          this.totalSexArr[1] += 1;
        }

      }
      this.actualizeTotalSexData(this.sexTotalGraficaEstado);
    })


    await this.http.get(this.URL_Recuperados, httpOptions).subscribe((res: any[]) => {
      for (let persona of res){
        if (persona["sexo"] === "M"){
          this.totalSexArr[2] += 1;
  
        } else {
          this.totalSexArr[3] += 1;
        }
      }
      this.totalRecuperado = this.totalSexArr[2] + this.totalSexArr[3];
      this.totalStateArr[0] = this.totalRecuperado;
      // this.totalStateData[0].data[0] = this.totalRecuperado;
      this.totalStateData[0].data = this.totalStateArr;
      console.log("Recuperados: ", this.totalStateArr[0]);
      this.actualizeTotalSexData(this.sexTotalGraficaEstado);
    })


    await this.http.get(this.URL_Fallecidos, httpOptions).subscribe((res: any[]) => {
      for (let persona of res){
        if (persona["sexo"] === "M"){
          this.totalSexArr[4] += 1;

  
        } else {
          this.totalSexArr[5] += 1;
        }
      }

      this.totalFallecido = this.totalSexArr[4] + this.totalSexArr[5];
      this.totalStateArr[1] = this.totalFallecido;
      this.totalStateData[0].data[1] = this.totalFallecido;
      console.log("Fallecidos: ", this.totalStateArr[1]);
      this.actualizeTotalSexData(this.sexTotalGraficaEstado);

    });


    await this.http.get(this.URL_Moderado, httpOptions).subscribe((res: any[]) => {
      this.totalModerado = res.length;
      this.totalStateArr[2] = this.totalModerado;
      // this.totalStateData[0].data[2] = this.totalModerado;
      this.totalStateData[0].data = this.totalStateArr;
      console.log("Moderado: ", this.totalStateArr[2]);
    });


    await this.http.get(this.URL_Grave, httpOptions).subscribe((res: any[]) => {
      this.totalGrave = res.length;
      this.totalStateArr[3] = this.totalGrave;
      // this.totalStateData[0].data[3] = this.totalGrave;
      this.totalStateData[0].data = this.totalStateArr;
      console.log("Grave: ", this.totalStateArr[3]);
    });
  }


  public actualizeTotalSexData(tipo:string){
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

  public actualizeStates(){
    this.totalStateData[0].data = [0, 0, 0, 0];
    this.totalStateData[0].data = this.totalStateArr;
  }

}
