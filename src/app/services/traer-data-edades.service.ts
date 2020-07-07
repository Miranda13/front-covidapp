import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Injectable({
  providedIn: 'root'
})
export class TraerDataEdadesService {

  constructor(
    private http: HttpClient,
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
    [[10, 29], [30, 49], [50, 69], [70, 89], [90, 99]].forEach((edad, indx) => {
      const httpOptions = {
        headers: new HttpHeaders({ 
          'Access-Control-Allow-Origin':'*',
          'X-App-Token':'aqPLGyt6aQBu9LNwyPf3PjGM8',
        })
      };
  
      this.http.get(`https://www.datos.gov.co/resource/gt2j-8ykr.json?$where=edad%20between%20%27${edad[0]}%27%20and%20%27${edad[1]}%27&$limit=999999999&$$app_token=aqPLGyt6aQBu9LNwyPf3PjGM8`, httpOptions).subscribe((res: any[]) => {
        for (let persona of res){
          if (persona["atenci_n"] === "Recuperado"){
            this.totalAgeArr[1][indx] += 1;

          } else if(persona["atenci_n"] === "Fallecido"){
            this.totalAgeArr[2][indx] += 1;

          }
        }
        this.totalAgeArr[0][indx] = this.totalAgeArr[1][indx] + this.totalAgeArr[2][indx];
        this.totalAgeData[0].data[indx] = this.totalAgeArr[1][indx];
      });
    })
    // }
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
