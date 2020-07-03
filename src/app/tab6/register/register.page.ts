import { Component, OnInit } from '@angular/core';
import { AngularFireStorage} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  reports: any []= [];

  constructor(private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    public auth: AngularFireAuth,
    public alertController: AlertController) { }

  ngOnInit() {
    this.firestore.collection('reports').valueChanges()
    .subscribe((reports)=>{
      this.reports = <any[]>reports;
    });
  }

  signUp(){
    
  }
  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'img_archivo';
    const task = this.storage.upload(filePath, file);
  }

}
