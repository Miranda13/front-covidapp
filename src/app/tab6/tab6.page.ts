import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab6',
  templateUrl: 'tab6.page.html',
  styleUrls: ['tab6.page.scss']
})
export class Tab6Page {

  users: any []= [];
  currentUser: string = '';
  loginEmail: string;
  loginPassword: string;

  constructor(private firestore: AngularFirestore,
    public auth: AngularFireAuth,
    public alertController: AlertController) { 
  }

  ngOnInit(){
    this.firestore.collection('users').valueChanges()
    .subscribe((users)=>{
      this.users = <any[]>users;
    });
  }

  
  login() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((user)=>{
      this.firestore.collection('users').doc(user.user.uid).set({email: user.user.email, displayname:user.user.displayName, method: user.user.providerId, })
      this.ngOnInit();
    });
  }

  loginEmailPassword(){
    if(this.loginEmail !== undefined && this.loginEmail!== ''
    && this.loginPassword !== undefined && this.loginPassword !== ''){
      this.auth.signInWithEmailAndPassword(this.loginEmail,this.loginPassword).then(
        (user)=>{
          console.log(user);
        }
        /* (user)=>{
        this.firestore.collection('users').doc(user.user.uid).set({email: user.user.email, displayname:user.user.displayName, method: user.user.providerId })
        this.ngOnInit();
        } */
      ).catch((error)=>{
        console.error(error);
      });
    } else{

    }
  }

  logout() {
    this.auth.signOut();
  }

}