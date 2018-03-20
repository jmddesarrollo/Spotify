import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Necesario para las rutas
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { UsuarioeditComponent } from './components/usuarioedit/usuarioedit.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuarioeditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
