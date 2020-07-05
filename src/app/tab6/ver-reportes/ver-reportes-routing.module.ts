import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerReportesPage } from './ver-reportes.page';

const routes: Routes = [
  {
    path: '',
    component: VerReportesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerReportesPageRoutingModule {}
