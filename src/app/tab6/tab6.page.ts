import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

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
    public alertController: AlertController,
    private navController: NavController,
    private router: Router) { 
  }

  
  ngOnInit(){
    this.firestore.collection('users').valueChanges()
    .subscribe((users)=>{
      this.users = <any[]>users;
    });
  }
  
  async presentAlert(error,mensaje) {
    const alert = await this.alertController.create({
      //cssClass: 'my-custom-class',
      header: 'Alerta',
      subHeader: error,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  
  login() {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((user)=>{
      this.firestore.collection('users').doc(user.user.uid).set({email: user.user.email, displayname:user.user.displayName, method: user.user.providerId, })
      this.ngOnInit();
      this.goToPrincipal();
    });
  }

  loginEmailPassword(){
    
    if(this.loginEmail !== undefined && this.loginEmail!== ''
    && this.loginPassword !== undefined && this.loginPassword !== ''){
      this.auth.signInWithEmailAndPassword(this.loginEmail,this.loginPassword).then(
        (user)=>{
          console.log(user);
          console.log(user.user.uid);
          this.goToPrincipal();
        }
        /* (user)=>{
        this.firestore.collection('users').doc(user.user.uid).set({email: user.user.email, displayname:user.user.displayName, method: user.user.providerId })
        this.ngOnInit();
        } */
      ).catch((error)=>{
        this.presentAlert(error.code,error.message);
        console.error(error);
      });
    } else{
      let err = 'Campos vacíos';
      let mensa = 'Por favor digite correo y contraseña';
      this.presentAlert(err,mensa);
    }
  }
  goToPrincipal(){
    this.router.navigateByUrl('/tabs/tab6/menu/principal');
  }  


  logout() {
    this.auth.signOut();
  }

}