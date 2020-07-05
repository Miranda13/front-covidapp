import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab6Page } from './tab6.page';

const routes: Routes = [
  {
    path: '',
    component: Tab6Page
  },
   {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./principal/principal.module').then( m => m.PrincipalPageModule)
  },
  /*{
    path: 'ver-reportes',
    loadChildren: () => import('./ver-reportes/ver-reportes.module').then( m => m.VerReportesPageModule)
  },
  {
    path: 'crear-reportes',
    loadChildren: () => import('./crear-reportes/crear-reportes.module').then( m => m.CrearReportesPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  } */

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab6PageRoutingModule {}
