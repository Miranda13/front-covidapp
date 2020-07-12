import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as xml2js from "xml2js";
import { NewsRss } from '../news-rss';
import * as $ from "jquery";

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {

  constructor(
    public http: HttpClient
    ) {}

  public URL_oms = 'https://covid-noticias-oms.herokuapp.com/';
  public URL_oms_2 = 'https://covid-noticias-oms-2.herokuapp.com/';
  public URL_colombia = 'https://www.minsalud.gov.co/_layouts/15/listfeed.aspx?List=%7BCC536310-0C15-4295-82EA-2FD45206219D%7D';
  public noticiasOmsActivadas = false;
  public noticiasColombiaActivadas = true;
  public _descripcion;
  public _date;
  
  public noticias_colombia = [];
  public noticias_oms = [];

  public meses = {
    0: 'Enero',
    1: 'Febrero',
    2: 'Marzo',
    3: 'Abril',
    4: 'Mayo',
    5: 'Junio',
    6: 'Julio',
    7: 'Agosto',
    8: 'Septiembre',
    9: 'Octubre',
    10: 'Noviembre',
    11: 'Diciembre'
  }

  async getNoticias(){

    const requestOptions: Object = {
      observe: "body",
      responseType: "text"
    };

    this.http.
          get<any>(this.URL_colombia, requestOptions).
          subscribe((data) => {
            let parseString = xml2js.parseString;

            parseString(data, (err, result: NewsRss) => {
              result.rss.channel[0].item.forEach((noticia) => {
                this._descripcion = $(noticia.description.toString());
                this._date = new Date(noticia.pubDate.toString());

                if (noticia.title.toString().indexOf('-') != -1) {
                  this.noticias_colombia.push(
                    {
                      titulo: noticia.title.toString().replace(/-/g, ' ').replace(/(ano)/g, 'año'),
                      fecha: `${this._date.getDate()} de ${this.meses[this._date.getMonth()]} de ${this._date.getFullYear()}`,
                      imagen: "https://www.minsalud.gov.co" + this._descripcion.find('img').attr('src'),
                      link: "https://www.minsalud.gov.co/Paginas/" + noticia.title + ".aspx",
                      parrafo: (this._descripcion.find('em').text() || this._descripcion.find('span').text()).trim().replace(/(-|– )/, "") ,
                    }
                  )
                }
              })
            });
          });   

    await this.http.get(this.URL_oms, 
      { observe: "body"}).toPromise().then((data: any[]) => {this.noticias_oms.push(...data);
    });

    
    await this.http.get(this.URL_oms_2, 
      { observe: "body"}).toPromise().then((data: any[]) => {this.noticias_oms.push(...data);
    });

    console.log('noticias cargadas');

  }


  activarNoticiasOms(){
    this.noticiasOmsActivadas = true;
    this.noticiasColombiaActivadas = false;
  }


  activarNoticiasColombia(){
    this.noticiasOmsActivadas = false;
    this.noticiasColombiaActivadas = true;
  }


  ngOnInit(): void {
    this.getNoticias();
  }

  irA(url_noticia){
    window.open(url_noticia), "_blank";
  }
}

export interface IRssData {}