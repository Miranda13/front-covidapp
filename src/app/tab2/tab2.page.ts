import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { resolve } from 'path';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  encapsulation: ViewEncapsulation.None
})

export class Tab2Page {

  private rows: any[];

  constructor(
    private http: HttpClient,
  ) {
    this.columns = [
      { name: 'Departamento' },
      { name: 'Confirmados' },
      { name: 'Recuperados' },
      { name: 'Est.Moderado' },
      { name: 'Est.Grave' },
      { name: 'Fallecidos' }
    ];
  }

  private URL_confirmado: string;
  private URL_recuperado: string;
  private URL_moderado: string;
  private URL_grave: string;
  private URL_fallecido: string;
  private columns;


  async getDeptosTableData(){
    await this.http.get('../../assets/deptos_data.json')
    .toPromise().then((res: any []) => {
      this.rows = res;
    });

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'X-App-Token':'2wez7eXZ52N8BLFYZExTeAbpI',
      })
    };


    for (let depto_info of this.rows){
      this.URL_confirmado = `https://www.datos.gov.co/resource/gt2j-8ykr.json?departamento=${depto_info.Departamento}&$limit=99999999999&$$app_token=2wez7eXZ52N8BLFYZExTeAbpI`
      this.URL_recuperado = `https://www.datos.gov.co/resource/gt2j-8ykr.json?departamento=${depto_info.Departamento}&$limit=99999999999&atenci_n=Recuperado&$$app_token=2wez7eXZ52N8BLFYZExTeAbpI`;
      this.URL_fallecido = `https://www.datos.gov.co/resource/gt2j-8ykr.json?departamento=${depto_info.Departamento}&$limit=99999999999&atenci_n=Fallecido&$$app_token=2wez7eXZ52N8BLFYZExTeAbpI`;
      this.URL_grave = `https://www.datos.gov.co/resource/gt2j-8ykr.json?departamento=${depto_info.Departamento}&$limit=99999999999&estado=Grave&$$app_token=2wez7eXZ52N8BLFYZExTeAbpI`;
      this.URL_moderado = `https://www.datos.gov.co/resource/gt2j-8ykr.json?departamento=${depto_info.Departamento}&$limit=99999999999&estado=Moderado&$$app_token=2wez7eXZ52N8BLFYZExTeAbpI`;

      // await this.http.get(this.URL_confirmado, httpOptions).subscribe((res: any[]) => {
      //   depto_arr[1] = res.length;
      // })

      await this.http.get(this.URL_confirmado, httpOptions).toPromise().then( (res: any[]) => {
        depto_info["Confirmados"] = res.length;
        // console.log(depto_info["Confirmados"], depto_info.Departamento);
      })

      await this.http.get(this.URL_recuperado, httpOptions).toPromise().then( (res: any[]) => {
        depto_info["Recuperados"] = res.length;
      })

      await this.http.get(this.URL_grave, httpOptions).toPromise().then( (res: any[]) => {
        depto_info["Est.Grave"] = res.length;
      })

      await this.http.get(this.URL_moderado, httpOptions).toPromise().then( (res: any[]) => {
        depto_info["Est.Moderado"] = res.length;
      })

      await this.http.get(this.URL_fallecido, httpOptions).toPromise().then( (res: any[]) => {
        depto_info["Fallecidos"] = res.length;
      })

      this.rows = [...this.rows];
    }
  }



  ngOnInit(){
    this.getDeptosTableData();
    
  }
}
