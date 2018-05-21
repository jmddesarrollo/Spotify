import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Necesario para las rutas
import { routing, appRoutingProviders } from './app.routing';

// Necesario para trabajo con fechas. Pipes.
import { MomentModule } from 'ngx-moment';
// https://github.com/urish/ngx-moment

// Componentes
import { AppComponent } from './app.component';
import { UsuarioeditComponent } from './components/usuarioedit/usuarioedit.component';
import { ArtistaListComponent } from './components/artista-list/artista-list.component';
import { HomeComponent } from './components/home/home.component';
import { ArtistaAddComponent } from './components/artista-add/artista-add.component';
import { ArtistaEditComponent } from './components/artista-edit/artista-edit.component';
import { ArtistaDetailComponent } from './components/artista-detail/artista-detail.component';
import { AlbumAddComponent } from './components/album-add/album-add.component';
import { AlbumEditComponent } from './components/album-edit/album-edit.component';
import { AlbumDetailComponent } from './components/album-detail/album-detail.component';
import { CancionAddComponent } from './components/cancion-add/cancion-add.component';
import { CancionEditComponent } from './components/cancion-edit/cancion-edit.component';
import { PlayerComponent } from './components/player/player.component';
import { PracticaComponent } from './components/practica/practica.component';
import { PracticahijoComponent } from './components/practicahijo/practicahijo.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuarioeditComponent,
    ArtistaListComponent,
    HomeComponent,
    ArtistaAddComponent,
    ArtistaEditComponent,
    ArtistaDetailComponent,
    AlbumAddComponent,
    AlbumEditComponent,
    AlbumDetailComponent,
    CancionAddComponent,
    CancionEditComponent,
    PlayerComponent,
    PracticaComponent,
    PracticahijoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MomentModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
