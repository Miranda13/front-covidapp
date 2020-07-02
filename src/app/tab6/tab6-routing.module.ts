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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab6PageRoutingModule {}
