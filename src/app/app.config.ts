import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNativeDateAdapter} from '@angular/material/core';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp} from '@angular/fire/app'
import { provideFirestore,getFirestore} from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { globalVar } from '../utils/global';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(),provideNativeDateAdapter(),
    provideFirebaseApp(()=> initializeApp(globalVar.firebaseConfig)),provideFirestore(()=>getFirestore()), provideAnimationsAsync()
  ]
};
