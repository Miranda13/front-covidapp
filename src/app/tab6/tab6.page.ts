import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab6',
  templateUrl: 'tab6.page.html',
  styleUrls: ['tab6.page.scss']
})
export class Tab6Page {

  reports: any []= [];

  constructor(private firestore: AngularFirestore) { 
  }

  ngOnInit(){
    this.firestore.collection('reports').valueChanges()
    .subscribe((reports)=>{
      this.reports = <any[]>reports;
    });
  }

}