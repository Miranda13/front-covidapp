import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerReportesPageRoutingModule } from './ver-reportes-routing.module';

import { VerReportesPage } from './ver-reportes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerReportesPageRoutingModule
  ],
  declarations: [VerReportesPage]
})
export class VerReportesPageModule {}
