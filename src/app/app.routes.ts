import { Routes } from '@angular/router';
import { MainRoot } from './main/main-root/main-root';

export const routes: Routes = [
  { path: 'visor', component: MainRoot },
  { path: '', redirectTo: 'visor', pathMatch: 'full' },
  { path: '**', redirectTo: 'visor' },
];
