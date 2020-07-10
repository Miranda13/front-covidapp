import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SaveUserService } from '../../services/save-user.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginEmail: string;
  loginPassword: string;

  constructor(private firestore: AngularFirestore,
    public auth: AngularFireAuth,
    public alertController: AlertController,
    private navController: NavController,
    private router: Router,
    public logUser : SaveUserService) { 
  }

  
  ngOnInit(){
    
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
      this.firestore.collection('users').doc(user.user.uid)
      .set({email: user.user.email, 
        displayName:user.user.displayName })     
      this.ngOnInit();
      this.goToPrincipal();
    });
  }

  loginEmailPassword(){
    
    if(this.loginEmail !== undefined && this.loginEmail!== ''
    && this.loginPassword !== undefined && this.loginPassword !== ''){
      this.auth.signInWithEmailAndPassword(this.loginEmail,this.loginPassword).then(
        (user)=>{
          this.ngOnInit();
          this.goToPrincipal();
        }
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
    this.router.navigateByUrl('/tabs/tab6/principal');
  }  

  logout() {
    this.auth.signOut();
  }


}
