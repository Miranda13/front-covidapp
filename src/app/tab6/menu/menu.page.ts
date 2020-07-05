import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  
  pages =[
    {
      title: 'Mi perfil',
      url: '/tabs/tab6/menu/perfil'
    },
    {
      title: 'Ver reportes',
      url: '/tabs/tab6/menu/verReportes'
    },
    {
      title: 'Crear reporte',
      url: '/tabs/tab6/menu/crearReportes'
    }
  ];

  selectedPath = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent)=>{
      if (event && event.url){
        this.selectedPath = event.url;
      }
    })
   }

  ngOnInit() {
  }

}
