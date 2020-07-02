import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {

  constructor(private http: HttpClient) {}

  private URL_oms = 'https://covid-web-scrapping.herokuapp.com/noticias-oms';
  private URL_colombia = 'https://covid-web-scrapping.herokuapp.com/noticias-colombia';
  private noticiasOmsActivadas = false;
  private noticiasColombiaActivadas = true;
  noticias_oms = [];
  noticias_colombia = [];


  getNoticias(){
    this.http.get(this.URL_oms).subscribe((data: any[]) => {this.noticias_oms = data});
    this.http.get(this.URL_colombia).subscribe((data: any[]) => {this.noticias_colombia = data});
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