import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { resolve } from 'path';
import { Platform } from '@ionic/angular';
import { HostListener } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  encapsulation: ViewEncapsulation.None
})


export class Tab2Page {
  public devWidth = this.platform.width();

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.devWidth = event.target.innerWidth;
  }

  rows: any[];

  constructor(
    public http: HttpClient,
    public platform: Platform,
    public firestore: AngularFirestore
  ) {
    /* 
    this.columns = [
      { name: 'Departamento' },
      { name: 'Confirmados' },
      { name: 'Recuperados' },
      { name: 'Est.Moderado' },
      { name: 'Est.Grave' },
      { name: 'Fallecidos' }
    ]; */
  }
  
  //public columns;
  public options = ["Confirmados", "Recuperados", "Est.Grave", "Est.Moderado", "Fallecidos"];
  public opcion = "Confirmados";

  reorderable = true; 

  columns = [
    { prop: 'name' }, 
    { name: 'Departamento' }, 
    { name: 'Confirmados' },
    { name: 'Recuperados' },
    { name: 'Est.Moderado' },
    { name: 'Est.Grave' },
    { name: 'Fallecidos' }];


  onChangeOpcion(_opcion){
    this.opcion = _opcion;
  }

  ngOnInit(){
    this.firestore.collection('deptos').valueChanges()
    .subscribe((reports)=>{
      this.rows = [...<any[]>reports];
    });
  }
}
