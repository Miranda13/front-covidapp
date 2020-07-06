import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-ver-reportes',
  templateUrl: './ver-reportes.page.html',
  styleUrls: ['./ver-reportes.page.scss'],
})
export class VerReportesPage implements OnInit {

  reports: any []= [];
  filtro: string;
  filtroCat: string;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
    this.firestore.collection('reports').valueChanges()
    .subscribe((reports)=>{
      this.reports = <any[]>reports;
    });
  }

}
