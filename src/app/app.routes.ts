import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'main', component: MainComponent, canActivate: [authGuard] },
];
