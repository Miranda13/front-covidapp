import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'perfil',
        //loadChildren: '../perfil/perfil.module'
        loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: 'verReportes',
        //loadChildren: '../ver-reportes/ver-reportes.module#verReportesModule'
        loadChildren: () => import('../ver-reportes/ver-reportes.module').then(m => m.VerReportesPageModule)  
      },
      {
        path: 'crearReportes',
        loadChildren: () => import('../crear-reportes/crear-reportes.module').then(m => m.CrearReportesPageModule)
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
