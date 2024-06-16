import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    importProvidersFrom(
      AngularFireModule.initializeApp({
        projectId: 'pplunajaco',
        appId: '1:796256571370:web:a1bb4fabbb108e948bac93',
        storageBucket: 'pplunajaco.appspot.com',
        apiKey: 'AIzaSyBI_2WhnIwX_Tt9uUYD5pkKM7Upy0mJHTs',
        authDomain: 'pplunajaco.firebaseapp.com',
        messagingSenderId: '796256571370',
      })
    ),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'pplunajaco',
        appId: '1:796256571370:web:a1bb4fabbb108e948bac93',
        storageBucket: 'pplunajaco.appspot.com',
        apiKey: 'AIzaSyBI_2WhnIwX_Tt9uUYD5pkKM7Upy0mJHTs',
        authDomain: 'pplunajaco.firebaseapp.com',
        messagingSenderId: '796256571370',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
});

// projectId: 'pplunajaco',
// appId: '1:796256571370:web:a1bb4fabbb108e948bac93',
// storageBucket: 'pplunajaco.appspot.com',
// apiKey: 'AIzaSyBI_2WhnIwX_Tt9uUYD5pkKM7Upy0mJHTs',
// authDomain: 'pplunajaco.firebaseapp.com',
// messagingSenderId: '796256571370',