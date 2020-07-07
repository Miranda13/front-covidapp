import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Injectable({
  providedIn: 'root'
})
export class TraerDeptoSexStateDataService {

  constructor( 
    private http: HttpClient,
    ) { }

  public URL_deptos: string;
  public deptoSexArr: number[] = [0, 0, 0, 0, 0, 0];
  public deptoStateArr: number[] = [0, 0, 0, 0];
  public URL_Recuperados: string;
  public URL_Fallecidos: string;
  public URL_Grave: string;
  public URL_Moderado: string;  

  public depto: string = "Bogotá D.C.";
  public deptoSex: any = "Cargando...";
  public deptoRecuperado: number = 0;
  public deptoFallecido: number = 0;
  public deptoModerado: number = 0;
  public deptoGrave: number = 0;
  public sexdeptoGraficaEstado = "Recuperado";

  public deptoSexChartOptions: ChartOptions = {
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


  public deptoStateChartOptions: ChartOptions = {
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


  public deptoChartPlugins = [pluginDataLabels];
  public deptoSexChartColors = [
    {
      backgroundColor: ['rgba(0, 119, 255, 0.5)', 'rgba(223, 174, 230, 0.5)'],
    },
  ];

  public deptoStateChartColors = [
    {
      backgroundColor: ['rgba(153, 213, 201, 0.5)', 'rgba(108, 150, 157 0.5)', 'rgba(100, 94, 157, 0.5)', 'rgba(57, 43, 88, 0.5)'],
    },
  ];

  public deptoSexData: ChartDataSets[] = [
    { 
      data:[],
      label: "Sexo"
    }
  ]

  public deptoStateData: ChartDataSets[] = [
    { 
      data:[0, 0, 0, 0],
      label: "Estado"
    }
  ]

  public deptoSexLabels: Label[] = ["Masculino", "Femenino"];
  public deptoStateLabels: Label[] = ["Recuperados", "Fallecidos", "Moderado", "Grave"];


  deptoData(_depto){
    this.URL_deptos = `https://www.datos.gov.co/resource/gt2j-8ykr.json?departamento=${_depto}&$limit=99999999999&$$app_token=fwQbFGdMRazADrKP7dhnEZe4j`;
    this.URL_Recuperados = `https://www.datos.gov.co/resource/gt2j-8ykr.json?departamento=${_depto}&$limit=99999999999&atenci_n=Recuperado&$$app_token=fwQbFGdMRazADrKP7dhnEZe4j`;
    this.URL_Fallecidos = `https://www.datos.gov.co/resource/gt2j-8ykr.json?departamento=${_depto}&$limit=99999999999&atenci_n=Fallecido&$$app_token=fwQbFGdMRazADrKP7dhnEZe4j`;
    this.URL_Grave = `https://www.datos.gov.co/resource/gt2j-8ykr.json?departamento=${_depto}&$limit=99999999999&estado=Grave&$$app_token=fwQbFGdMRazADrKP7dhnEZe4j`;
    this.URL_Moderado = `https://www.datos.gov.co/resource/gt2j-8ykr.json?departamento=${_depto}&$limit=99999999999&estado=Moderado&$$app_token=fwQbFGdMRazADrKP7dhnEZe4j`;
    
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'X-App-Token':'fwQbFGdMRazADrKP7dhnEZe4j',
      })
    };

    // Confirmados
    this.http.get(this.URL_deptos, httpOptions).subscribe((res: any[]) => {
      this.deptoSexArr[0] = 0;
      this.deptoSexArr[1] = 0;
      for (let persona of res){
        if (persona["sexo"] === "M"){
          this.deptoSexArr[0] += 1;
  
        } else {
          this.deptoSexArr[1] += 1;
        }

      }
      this.actualizedeptoSexData(this.sexdeptoGraficaEstado);
    })


    this.http.get(this.URL_Recuperados, httpOptions).subscribe((res: any[]) => {
      this.deptoSexArr[2] = 0;
      this.deptoSexArr[3] = 0;
      for (let persona of res){
        if (persona["sexo"] === "M"){
          this.deptoSexArr[2] += 1;
  
        } else {
          this.deptoSexArr[3] += 1;
        }
      }
      this.deptoRecuperado = this.deptoSexArr[2] + this.deptoSexArr[3];
      this.deptoStateArr[0] = this.deptoRecuperado;
      // this.deptoStateData[0].data[0] = this.deptoRecuperado;
      this.deptoStateData[0].data = this.deptoStateArr;
      // console.log("Recuperados: ", this.deptoStateArr[0]);
      this.actualizedeptoSexData(this.sexdeptoGraficaEstado);
    })


    this.http.get(this.URL_Fallecidos, httpOptions).subscribe((res: any[]) => {
      this.deptoSexArr[4] = 0;
      this.deptoSexArr[5] = 0;
      for (let persona of res){
        if (persona["sexo"] === "M"){
          this.deptoSexArr[4] += 1;

  
        } else {
          this.deptoSexArr[5] += 1;
        }
      }

      this.deptoFallecido = this.deptoSexArr[4] + this.deptoSexArr[5];
      this.deptoStateArr[1] = this.deptoFallecido;
      this.deptoStateData[0].data[1] = this.deptoFallecido;
      // console.log("Fallecidos: ", this.deptoStateArr[1]);
      this.actualizedeptoSexData(this.sexdeptoGraficaEstado);
    });


    this.http.get(this.URL_Moderado, httpOptions).subscribe((res: any[]) => {
      this.deptoModerado = res.length;
      this.deptoStateArr[2] = this.deptoModerado;
      // this.deptoStateData[0].data[2] = this.deptoModerado;
      this.deptoStateData[0].data = this.deptoStateArr;
      // console.log("Moderado: ", this.deptoStateArr[2]);
    });


    this.http.get(this.URL_Grave, httpOptions).subscribe((res: any[]) => {
      this.deptoGrave = res.length;
      this.deptoStateArr[3] = this.deptoGrave;
      // this.deptoStateData[0].data[3] = this.deptoGrave;
      this.deptoStateData[0].data = this.deptoStateArr;
      // console.log("Grave: ", this.deptoStateArr[3]);
    });
  }


  public actualizedeptoSexData(tipo:string){
    if (tipo === "Confirmados"){
      this.deptoSexData[0].data = [this.deptoSexArr[0], this.deptoSexArr[1]];
      this.deptoSex = this.deptoSexArr[0] + this.deptoSexArr[1];
      if (this.deptoSex === 0){
        this.deptoSex = "Cargando...";
      }
      
    } else if (tipo === "Recuperado"){
      this.deptoSexData[0].data = [this.deptoSexArr[2], this.deptoSexArr[3]];
      this.deptoSex = this.deptoSexArr[2] + this.deptoSexArr[3];
      if (this.deptoSex === 0){
        this.deptoSex = "Cargando...";
      }

    } else{
      this.deptoSexData[0].data = [this.deptoSexArr[4], this.deptoSexArr[5]];
      this.deptoSex = this.deptoSexArr[4] + this.deptoSexArr[5];
      if (this.deptoSex === 0){
        this.deptoSex = "Cargando...";
      }
    }
  }

  public actualizeStates(){
    this.deptoStateData[0].data = [0, 0, 0, 0];
    this.deptoStateData[0].data = this.deptoStateArr;
  }


  

}
