import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearReportesPage } from './crear-reportes.page';

const routes: Routes = [
  {
    path: '',
    component: CrearReportesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearReportesPageRoutingModule {}
