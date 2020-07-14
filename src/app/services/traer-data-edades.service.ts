import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TraerDataEdadesService {

  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore
  ) { }

  public ageTotalGraficaEstado = "Recuperado";
  public totalAgeArr: number[][] = [[0, 0, 0, 0, 0],
                                    [0, 0, 0, 0, 0],
                                    [0, 0, 0, 0, 0]];


  public totalAgeData: ChartDataSets[] = [
    { 
      data:[0, 0, 0, 0, 0 ],
      label: "Edades"
    }
  ]


  public totalAgeChartOptions: ChartOptions = {
    responsive: true,
    title:{
      display: true,
      text:"Casos por categoría de edad",
      fontSize: 20,
    },
    legend: {
      position: 'bottom',
    },
    plugins: {
      datalabels: {
        color:"black",
      },
    }
  };


  public totalChartPlugins = [pluginDataLabels];
  public totalAgeChartColors = [
    {
      backgroundColor: ['rgba(0, 119, 255, 0.5)',
                        'rgba(0, 119, 255, 0.5)', 
                        'rgba(0, 119, 255, 0.5)', 
                        'rgba(0, 119, 255, 0.5)', 
                        'rgba(0, 119, 255, 0.5)', 
                        'rgba(0, 119, 255, 0.5)', 
                        'rgba(0, 119, 255, 0.5)', 
                        'rgba(0, 119, 255, 0.5)', 
                        'rgba(0, 119, 255, 0.5)', 
                        'rgba(0, 119, 255, 0.5)', ],
    },
  ];
  
  public totalAgeLabels: Label[] = ["10-29", "30-49", "50-69", "70-89", "90-99"];

  public getAgeData(){

    this.firestore.collection('totales').doc('totales').valueChanges()
    .subscribe((totales)=>{
      this.totalAgeArr = [];
      this.totalAgeArr = [
        [
          totales["Confirmados"]["10-29"], 
          totales["Confirmados"]["30-49"], 
          totales["Confirmados"]["50-69"], 
          totales["Confirmados"]["70-89"], 
          totales["Confirmados"]["90-99"], 
        ],
        [
          totales["Recuperado"]["10-29"], 
          totales["Recuperado"]["30-49"], 
          totales["Recuperado"]["50-69"], 
          totales["Recuperado"]["70-89"], 
          totales["Recuperado"]["90-99"], 
        ],
        [
          totales["Fallecido"]["10-29"], 
          totales["Fallecido"]["30-49"], 
          totales["Fallecido"]["50-69"], 
          totales["Fallecido"]["70-89"], 
          totales["Fallecido"]["90-99"], 
        ],
      ] 
      
      this.actualizeTotalAgeData(this.ageTotalGraficaEstado);
    });
  }


  public actualizeTotalAgeData(tipo:string){
    if (tipo === "Confirmados"){
      this.totalAgeData[0].data = this.totalAgeArr[0];

      
    } else if (tipo === "Recuperado"){
      this.totalAgeData[0].data = this.totalAgeArr[1];


    } else if (tipo === "Fallecido"){
      this.totalAgeData[0].data = this.totalAgeArr[2];
    }
  }

}
