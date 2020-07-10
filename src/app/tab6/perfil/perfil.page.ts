import { Component, OnInit } from '@angular/core';
import { AngularFireStorage} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { auth } from 'firebase/app';
import { userInfo } from 'os';
import { Router } from '@angular/router';
import { SaveUserService } from '../../services/save-user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  change: boolean;
  phone: any;
  age: string;
  name: string;
  email: string;
  city: string;
  state: string;
  address: string;
  password: string;
  newPassword: string;
  newPassword2: string;
  currentPassword: string;

  constructor(private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    public auth: AngularFireAuth,
    public alertController: AlertController,
    private router: Router,
    public logUser : SaveUserService) { }

  ngOnInit() {
  }

  changeTrue(){
    this.change = true;
  }
  changeFalse(){
    this.change = false;
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

  updateProfile(){
    if(this.age !== undefined && this.age!== ''
    && this.phone !== undefined && this.phone!== ''
    && this.email !== undefined && this.email!== ''
    && this.city !== undefined && this.city!== ''
    && this.password !== undefined && this.password!== ''
    && this.state !== undefined && this.state!== ''
    && this.name !== undefined && this.name!== ''
    && this.address !== undefined && this.address!== ''){
      this.auth.currentUser.then((user)=>{
        //user.updateEmail(this.email);
        this.auth.signInWithEmailAndPassword(user.email,this.password).then((userInfo)=>{
          userInfo.user.updateProfile({
            displayName: this.name
          });
          userInfo.user.updateEmail(this.email).then((validation)=>{
            this.firestore.collection('users').doc(user.uid).update({
              phone: this.phone,
              displayName: this.name,
              age: this.age,
              city: this.city,
              state: this.state,
              address: this.address,
              email: this.email
            });
            let err = 'Actualización de datos';
            let mensa = 'Los datos fueron actualizados';
            this.presentAlert(err,mensa);
          }).catch((error)=>{
            this.presentAlert(error.code,error.message);
          });
          
        }).catch((error)=>{
          let err = 'Contraseña no coincide';
          let mensa = 'Por favor repita la contraseña';
          this.presentAlert(err,mensa);
        })        
      })
      .catch(
        (error)=>{ 
          this.presentAlert(error.code,error.message);
          //console.log(error);
        }) 
    }else{
      let err = 'Campos vacíos';
      let mensa = 'Por favor diligencie todos los campos';
      this.presentAlert(err,mensa);
    }   
  }

  goToPrincipal(){
    this.router.navigateByUrl('/tabs/tab6/menu/principal');
  }  

  updatePass(){
    if(this.newPassword !== undefined && this.newPassword!== ''
    && this.newPassword2 !== undefined && this.newPassword2!== ''
    && this.currentPassword !== undefined && this.currentPassword!== ''){
      if(this.newPassword == this.newPassword2){
      this.auth.currentUser.then((user)=>{
        //user.updateEmail(this.email);
        this.auth.signInWithEmailAndPassword(user.email,this.currentPassword)
        .then((userInfo)=>{
          userInfo.user.updatePassword(this.newPassword).then((validation)=>{
            let err = 'Actualización de contraseña';
            let mensa = 'La contraseña fue actualizada';
            this.presentAlert(err,mensa)
            this.goToPrincipal();
          }).catch((error)=>{
            this.presentAlert(error.code,error.message);
          });
                 
        }).catch((error)=>{
          let err = 'Contraseña actual incorrecta';
          let mensa = 'Por favor repita la contraseña';
          this.presentAlert(err,mensa);
        })        
      })
      .catch(
        (error)=>{ 
          this.presentAlert(error.code,error.message);
          //console.log(error);
        }) 
    }else{
      let err = 'Contraseña nueva no coincide';
      let mensa = 'Los campos no coinciden por favor digitelos nuevamente';
      this.presentAlert(err,mensa);    
    }}else{
      let err = 'Campos vacíos';
      let mensa = 'Por favor diligencie todos los campos';
      this.presentAlert(err,mensa);
    }
  }
}
