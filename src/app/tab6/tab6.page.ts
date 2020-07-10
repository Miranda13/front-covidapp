import { Component} from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { SaveUserService } from '../services/save-user.service';

@Component({
  selector: 'app-tab6',
  templateUrl: 'tab6.page.html',
  styleUrls: ['tab6.page.scss']
})
export class Tab6Page{

  pages =[
    {
      title: 'Principal',
      url: '/tabs/tab6/principal',
      name: 'home-outline'
    },
    {
      title: 'Mi perfil',
      url: '/tabs/tab6/perfil',
      name: 'person-circle-outline'
    },
    {
      title: 'Ver reportes',
      url: '/tabs/tab6/verReportes',
      name: 'document-text-outline'
    },
    {
      title: 'Crear reporte',
      url: '/tabs/tab6/crearReportes',
      name: 'pencil-outline'
    }
  ];

  selectedPath = '';

  constructor(private router: Router,
    private firestore: AngularFirestore,
    public auth: AngularFireAuth,
    public logUser : SaveUserService) {
    this.router.events.subscribe((event: RouterEvent)=>{
      if (event && event.url){
        this.selectedPath = event.url;
      }
    })
   }

  goToPrincipal(){
    this.router.navigateByUrl('/tabs/login');
  }  


  logout() {
    this.logUser.currentUser = null;
    this.auth.signOut();
    this.goToPrincipal();
  }
}