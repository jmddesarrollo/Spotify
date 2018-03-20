import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioeditComponent } from './components/usuarioedit/usuarioedit.component';

const appRoutes: Routes = [
  { path: '', component: UsuarioeditComponent },
  { path: 'mis-datos', component: UsuarioeditComponent },
  { path: '**', component: UsuarioeditComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
