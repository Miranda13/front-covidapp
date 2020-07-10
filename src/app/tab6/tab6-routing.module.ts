import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Tab6Page } from './tab6.page';

const routes: Routes = [
  {
    path: '',
    component: Tab6Page,
    children: [
      {
        path: 'principal',
        loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: 'verReportes',      
        loadChildren: () => import('./ver-reportes/ver-reportes.module').then(m => m.VerReportesPageModule)  
      },
      {
        path: 'crearReportes',
        loadChildren: () => import('./crear-reportes/crear-reportes.module').then(m => m.CrearReportesPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab6/principal',
        pathMatch: 'full'
      }
    ]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab6PageRoutingModule {}
