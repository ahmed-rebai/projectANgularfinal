import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire/compat';
import { firebaseConfig} from './environment';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFireAnalyticsModule, APP_NAME, APP_VERSION, ScreenTrackingService, UserTrackingService} from '@angular/fire/compat/analytics';


@NgModule({
    imports: [
        // firebase
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        AngularFireAnalyticsModule,
    ],
    exports: [
        AngularFireAuthModule,
        AngularFireAnalyticsModule,
    ],
  providers: [
    ScreenTrackingService,
    UserTrackingService,
    {provide: APP_NAME, useValue: ''},
    {provide: APP_VERSION, useValue: '0.1.0'}
  ],

})
export class FirebaseModule {
}

 