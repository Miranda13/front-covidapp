import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Injectable({
  providedIn: 'root'
})
export class TraerDataEdadesDeptosService {

  constructor(
    private http: HttpClient,
  ) { }

  public agedeptoGraficaEstado = "Recuperado";
  public deptoAgeArr: number[][] = [[0, 0, 0, 0, 0],
                                    [0, 0, 0, 0, 0],
                                    [0, 0, 0, 0, 0]];


  public deptoAgeData: ChartDataSets[] = [
    { 
      data:[0, 0, 0, 0, 0],
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
    [[10, 29], [30, 49], [50, 69], [70, 89], [90, 99]].forEach((edad, indx) => {
      this.deptoAgeArr = [[0, 0, 0, 0, 0],
                          [0, 0, 0, 0, 0],
                          [0, 0, 0, 0, 0]]

      const httpOptions = {
        headers: new HttpHeaders({ 
          'Access-Control-Allow-Origin':'*',
          'X-App-Token':'xNxLhvbzsP0BoUfsyIAS7ka0H',
        })
      };
  
      this.http.get(`https://www.datos.gov.co/resource/gt2j-8ykr.json?departamento=${_depto}&$where=edad%20between%20%27${edad[0]}%27%20and%20%27${edad[1]}%27&$limit=999999999&$$app_token=xNxLhvbzsP0BoUfsyIAS7ka0H`, httpOptions).subscribe((res: any[]) => {
        for (let persona of res){
          if (persona["atenci_n"] === "Recuperado"){
            this.deptoAgeArr[1][indx] += 1;

          } else if(persona["atenci_n"] === "Fallecido"){
            this.deptoAgeArr[2][indx] += 1;

          }
        }
        
        this.deptoAgeArr[0][indx] = this.deptoAgeArr[1][indx] + this.deptoAgeArr[2][indx];
        this.deptoAgeData[0].data[indx] = this.deptoAgeArr[1][indx];
      });

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
