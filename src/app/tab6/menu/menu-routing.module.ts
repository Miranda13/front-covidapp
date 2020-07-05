import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'principal',
        loadChildren: () => import('../principal/principal.module').then(m => m.PrincipalPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: 'verReportes',      
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
