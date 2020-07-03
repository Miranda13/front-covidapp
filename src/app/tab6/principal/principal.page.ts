import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  reports: any []= [];
  
  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
    this.firestore.collection('reports').valueChanges()
    .subscribe((reports)=>{
      this.reports = <any[]>reports;
    });
  }

}
