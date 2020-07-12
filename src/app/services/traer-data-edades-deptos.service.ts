import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TraerDataEdadesDeptosService {

  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore
  ) { }

  public agedeptoGraficaEstado = "Recuperado";
  public deptoAgeArr: number[][] = [[0, 0, 0, 0, 0],
                                    [0, 0, 0, 0, 0],
                                    [0, 0, 0, 0, 0]];

  public deptoFirebaseData;

  public deptoAgeData: ChartDataSets[] = [
    { 
      data:[],
      label: "Edades"
    }
  ]


  public deptoAgeChartOptions: ChartOptions = {
    responsive: true,
    title:{
      display: true,
      text:"Casos por categoria de edad"
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


  public deptoChartPlugins = [pluginDataLabels];
  public deptoAgeChartColors = [
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
  
  public deptoAgeLabels: Label[] = ["10-29", "30-49", "50-69", "70-89", "90-99"];

  public getAgeData(_depto){

    this.firestore.collection('deptos', ref => ref.where('Departamento', '==', _depto))
    .valueChanges()
    .subscribe((doc) => {
      this.deptoFirebaseData = doc["0"];
      this.deptoAgeArr = [];
      this.deptoAgeArr = [
        [
          this.deptoFirebaseData["datos_extra"]["Confirmados"]["10-29"], 
          this.deptoFirebaseData["datos_extra"]["Confirmados"]["30-49"], 
          this.deptoFirebaseData["datos_extra"]["Confirmados"]["50-69"], 
          this.deptoFirebaseData["datos_extra"]["Confirmados"]["70-89"], 
          this.deptoFirebaseData["datos_extra"]["Confirmados"]["90-99"], 
        ],
        [
          this.deptoFirebaseData["datos_extra"]["Recuperado"]["10-29"], 
          this.deptoFirebaseData["datos_extra"]["Recuperado"]["30-49"], 
          this.deptoFirebaseData["datos_extra"]["Recuperado"]["50-69"], 
          this.deptoFirebaseData["datos_extra"]["Recuperado"]["70-89"], 
          this.deptoFirebaseData["datos_extra"]["Recuperado"]["90-99"], 
        ],
        [
          this.deptoFirebaseData["datos_extra"]["Fallecido"]["10-29"], 
          this.deptoFirebaseData["datos_extra"]["Fallecido"]["30-49"], 
          this.deptoFirebaseData["datos_extra"]["Fallecido"]["50-69"], 
          this.deptoFirebaseData["datos_extra"]["Fallecido"]["70-89"], 
          this.deptoFirebaseData["datos_extra"]["Fallecido"]["90-99"], 
        ],
      ] 
      
      this.actualizeDeptoAgeData(this.agedeptoGraficaEstado);
    })
    // }
  }


  public actualizeDeptoAgeData(tipo:string){
    if (tipo === "Confirmados"){
      this.deptoAgeData[0].data = this.deptoAgeArr[0];
      
    } else if (tipo === "Recuperado"){
      this.deptoAgeData[0].data = this.deptoAgeArr[1];

    } else if (tipo === "Fallecido"){
      this.deptoAgeData[0].data = this.deptoAgeArr[2];
    }
  }
}
