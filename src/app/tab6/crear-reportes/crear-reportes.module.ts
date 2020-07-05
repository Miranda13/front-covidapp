import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearReportesPageRoutingModule } from './crear-reportes-routing.module';

import { CrearReportesPage } from './crear-reportes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearReportesPageRoutingModule
  ],
  declarations: [CrearReportesPage]
})
export class CrearReportesPageModule {}
