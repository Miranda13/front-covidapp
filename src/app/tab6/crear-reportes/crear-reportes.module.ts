import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CrearReportesPageRoutingModule } from './crear-reportes-routing.module';
import { CrearReportesPage } from './crear-reportes.page';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearReportesPageRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule
  ],
  declarations: [CrearReportesPage]
})
export class CrearReportesPageModule {}
