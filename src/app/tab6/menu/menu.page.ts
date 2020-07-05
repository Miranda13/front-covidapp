import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

    
  pages =[
    {
      title: 'Principal',
      url: '/tabs/tab6/menu/principal',
      name: 'home-outline'
    },
    {
      title: 'Mi perfil',
      url: '/tabs/tab6/menu/perfil',
      name: 'person-circle-outline'
    },
    {
      title: 'Ver reportes',
      url: '/tabs/tab6/menu/verReportes',
      name: 'document-text-outline'
    },
    {
      title: 'Crear reporte',
      url: '/tabs/tab6/menu/crearReportes',
      name: 'pencil-outline'
    }
  ];

  selectedPath = '';

  constructor(private router: Router,
    private firestore: AngularFirestore,
    public auth: AngularFireAuth,) {
    this.router.events.subscribe((event: RouterEvent)=>{
      if (event && event.url){
        this.selectedPath = event.url;
      }
    })
   }

  ngOnInit() {
   
  }

  goToPrincipal(){
    this.router.navigateByUrl('/tabs/tab6');
  }  


  logout() {
    this.auth.signOut();
    this.goToPrincipal();
  }
}
