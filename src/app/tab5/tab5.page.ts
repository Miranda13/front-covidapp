import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as xml2js from "xml2js";
import { NewsRss } from '../news-rss';
import * as $ from "jquery";

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {

  constructor(private http: HttpClient) {}

  private URL_oms = 'https://covid-noticias-oms.herokuapp.com/';
  // private URL_colombia = 'https://covid-noticias-colombia.herokuapp.com/';
  // private URL_oms = 'https://www.who.int/feeds/entity/mediacentre/news/es/rss.xml';
  private URL_colombia = 'https://www.minsalud.gov.co/_layouts/15/listfeed.aspx?List=%7BCC536310-0C15-4295-82EA-2FD45206219D%7D';
  private noticiasOmsActivadas = false;
  private noticiasColombiaActivadas = true;
  private _descripcion;
  // private str = '<div><b>Título:</b> Minsalud entrega recomendaciones de bioseguridad para el Día sin IVA</div> <div><b>Imagen de la página:</b> <img alt="" src="/fotos_carrusel_2020/ministro-020720.jpg" style="BORDER: 0px solid; "></div>';
  // private test = $(this.str).find('img').attr('src');
  noticias_oms = [];
  noticias_colombia = [];

  getNoticias(){
    this.http.get<any>(this.URL_oms, 
                      { observe: "body"}).subscribe((data: any[]) => {this.noticias_oms = data});
    // this.http.get<any>(this.URL_colombia, 
    //                   { observe: "body"}).subscribe((data: any[]) => {this.noticias_colombia = data});

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
                
                if (noticia.title.toString().indexOf('-') != -1) {
                  this.noticias_colombia.push(
                    {
                      titulo: noticia.title.toString().replace(/-/g, ' '),
                      fecha: noticia.pubDate,
                      imagen: "https://www.minsalud.gov.co" + this._descripcion.find('img').attr('src'),
                      link: "https://www.minsalud.gov.co/Paginas/" + noticia.title + ".aspx",
                      parrafo: this._descripcion.find('em').text() || this._descripcion.find('span').text(),
                    }
                  )
                }
              })
            });
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