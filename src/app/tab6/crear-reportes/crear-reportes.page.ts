import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-crear-reportes',
  templateUrl: './crear-reportes.page.html',
  styleUrls: ['./crear-reportes.page.scss'],
})
export class CrearReportesPage implements OnInit {

  user: '';
  phone: string;
  age: string;
  name: string;
  

  constructor(private firestore: AngularFirestore,
    public auth: AngularFireAuth
    ) { }

  ngOnInit() {
    
  }

  createReport(){
    this.auth.currentUser;
    

    /* this.firestore.collection('reports').doc(user.user.uid)
          .set({email: user.user.email, 
            displayname: this.name, 
            method: user.user.providerId,
            address: this.address */
  }

}
