import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TraerDeptoSexStateDataService {

  constructor( 
    private http: HttpClient,
    private firestore: AngularFirestore
    ) { 

    }
  
  public deptoFirebaseData;
  public _depto;
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
    this.firestore.collection('deptos', ref => ref.where('Departamento', '==', _depto))
    .valueChanges()
    .subscribe((doc) => {
      this.deptoFirebaseData = doc["0"];
      this.deptoStateArr = [];
      this.deptoSexArr = [];

      this.deptoSexArr = [
        this.deptoFirebaseData["datos_extra"]["Confirmados"]["M"], 
        this.deptoFirebaseData["datos_extra"]["Confirmados"]["F"],
        this.deptoFirebaseData["datos_extra"]["Recuperado"]["M"],
        this.deptoFirebaseData["datos_extra"]["Recuperado"]["F"],
        this.deptoFirebaseData["datos_extra"]["Fallecido"]["M"],
        this.deptoFirebaseData["datos_extra"]["Fallecido"]["F"],
      ]
  
      this.actualizedeptoSexData(this.sexdeptoGraficaEstado);

      this.deptoStateArr = [
        this.deptoFirebaseData["Recuperados"],
        this.deptoFirebaseData["Fallecidos"],
        this.deptoFirebaseData["Est.Moderado"],
        this.deptoFirebaseData["Est.Grave"],
      ]

      this.deptoStateData[0].data = this.deptoStateArr;

    })
    
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
