import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab6',
  templateUrl: 'tab6.page.html',
  styleUrls: ['tab6.page.scss']
})
export class Tab6Page {

  reports: Observable<any[]>;

  constructor(private firestore: AngularFirestore) { 
    this.reports = firestore.collection('reports').valueChanges();
  }


}