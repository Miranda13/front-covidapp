import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TraerDataGraficosService {

  constructor( 
    public http: HttpClient,
    public firestore: AngularFirestore
    ) { }

  public totalSexArr: number[] = [0, 0, 0, 0, 0, 0];
  public totalStateArr: number[] = [0, 0, 0, 0];

  public totalSex: any = "Cargando...";
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


  totalData(){
    this.firestore.collection('totales').doc('totales').valueChanges()
    .subscribe((totales)=>{
      this.totalSexArr = [
        totales["Confirmados"]["M"], 
        totales["Confirmados"]["F"],
        totales["Recuperado"]["M"],
        totales["Recuperado"]["F"],
        totales["Fallecido"]["M"],
        totales["Fallecido"]["F"],
      ]
      
      this.actualizeTotalSexData(this.sexTotalGraficaEstado);

      this.totalStateArr = [
        totales["Recuperado"]["M"] + totales["Recuperado"]["F"],
        totales["Fallecido"]["M"] + totales["Fallecido"]["F"],
        totales["Moderado"],
        totales["Grave"],
      ]

      this.totalStateData[0].data = this.totalStateArr;
    });
  }


  public actualizeTotalSexData(tipo:string){
    console.log(tipo);
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
