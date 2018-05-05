import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Imports Usuarios
import { UsuarioeditComponent } from './components/usuarioedit/usuarioedit.component';
import { HomeComponent } from './components/home/home.component';

// Imports Artista
import { ArtistaListComponent } from './components/artista-list/artista-list.component';
import { ArtistaAddComponent } from './components/artista-add/artista-add.component';
import { ArtistaEditComponent } from './components/artista-edit/artista-edit.component';
import { ArtistaDetailComponent } from './components/artista-detail/artista-detail.component';

// Imports Album
import { AlbumAddComponent } from './components/album-add/album-add.component';
import { AlbumEditComponent } from './components/album-edit/album-edit.component';
import { AlbumDetailComponent } from './components/album-detail/album-detail.component';

// Imports Cancion
import { CancionAddComponent } from './components/cancion-add/cancion-add.component';
import { CancionEditComponent } from './components/cancion-edit/cancion-edit.component';

const appRoutes: Routes = [
  // { path: '', redirectTo: '/artistas', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'mis-datos', component: UsuarioeditComponent },
  { path: 'artistas', component: ArtistaListComponent },  
  { path: 'crear-artista', component: ArtistaAddComponent },
  { path: 'editar-artista/:id', component: ArtistaEditComponent },
  { path: 'artista/:id', component: ArtistaDetailComponent },
  { path: 'crear-album/:artistaid', component: AlbumAddComponent },
  { path: 'editar-album/:id', component: AlbumEditComponent },
  { path: 'album/:id', component: AlbumDetailComponent },
  { path: 'crear-cancion/:albumid', component: CancionAddComponent },
  { path: 'editar-cancion/:id', component: CancionEditComponent },
  { path: '**', component: HomeComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
