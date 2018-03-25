import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioeditComponent } from './components/usuarioedit/usuarioedit.component';
import { ArtistaListComponent } from './components/artista-list/artista-list.component';
import { ArtistaAddComponent } from './components/artista-add/artista-add.component';
import { ArtistaEditComponent } from './components/artista-edit/artista-edit.component';
import { ArtistaDetailComponent } from './components/artista-detail/artista-detail.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
  // { path: '', redirectTo: '/artistas', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'mis-datos', component: UsuarioeditComponent },
  { path: 'artistas', component: ArtistaListComponent },  
  { path: 'crear-artista', component: ArtistaAddComponent },
  { path: 'editar-artista/:id', component: ArtistaEditComponent },
  { path: 'artista/:id', component: ArtistaDetailComponent },
  { path: '**', component: HomeComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
