import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Tab6PageRoutingModule } from './tab6-routing.module';
import { Tab6Page } from './tab6.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
// import { AngularFireModule } from '@angular/fire';
// import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { environment } from '../../environments/environment';
// import { AngularFireAuthModule } from '@angular/fire/auth';
import { from } from 'rxjs';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab6PageRoutingModule,
    ExploreContainerComponentModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAnalyticsModule,
    // AngularFirestoreModule,
    // AngularFireAuthModule
  ],
  declarations: [Tab6Page]
})
export class Tab6PageModule {}
