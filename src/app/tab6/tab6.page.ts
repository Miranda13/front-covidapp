import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-tab6',
  templateUrl: 'tab6.page.html',
  styleUrls: ['tab6.page.scss']
})
export class Tab6Page {

  reports: any []= [];

  constructor(private firestore: AngularFirestore,
    public auth: AngularFireAuth) { 
  }

  ngOnInit(){
    this.firestore.collection('reports').valueChanges()
    .subscribe((reports)=>{
      this.reports = <any[]>reports;
    });
  }

  login() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut();
  }

}