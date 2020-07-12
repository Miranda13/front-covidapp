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

  private rows: any[];

  constructor(
    private http: HttpClient,
    private platform: Platform,
    private firestore: AngularFirestore
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
  
  private columns;
  private options = ["Confirmados", "Recuperados", "Est.Grave", "Est.Moderado", "Fallecidos"];
  private opcion = "Confirmados";

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
