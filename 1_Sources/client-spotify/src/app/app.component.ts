import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from './services/global';

// Importar modelos
import { Usuario } from './models/usuario';
import { UsuarioService } from './services/usuario.services';
import { NgLocaleLocalization } from '@angular/common/src/i18n/localization';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsuarioService]	
})
export class AppComponent implements OnInit {
  public titulo = 'MusicaFy';
  public usuario: Usuario;
  public usuario_registro: Usuario;
  // Contendrá todo el objeto del usuario logeado. En localStorage guardamos el objeto identity, y al iniciar cualquier petición recogeremos esa información del localStorage.
  public identity;
  // Guardado en localStorage. Se utiliza este objeto para pasarselo al servicio.
  public token;
  public errorMensaje: string;
  public errorRegistro: string;
  public mensajeRegistro: string;
  public boolOcultaMenu: boolean;
  public url: string;

  constructor(
    private _usuarioService: UsuarioService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.usuario = new Usuario(null, '', '', '', '', '', '');
    this.usuario_registro = new Usuario(null, '', '', '', '', '', '');
    this.boolOcultaMenu = false;
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
  }

  mostrarMenu(valor) {
    this.boolOcultaMenu = valor;
  }

  onSubmit() {
    this.ocultarError();

    console.log('Conectar');

    // Conseguir los datos de usuario.
    this._usuarioService.signup(this.usuario).subscribe(
      response => {
        let identity = response.usuario;
        this.identity = identity;

        console.log(this.identity);

        if (!this.identity.id) {
          alert('El usuario no está identificado correctamente.');
        } else {
          // Crear elemento en el localStorage para tener al usuario en sesión
          localStorage.setItem('identity', JSON.stringify(identity));

          // Conseguir el token para enviarselo a cada petición
          this._usuarioService.signup(this.usuario, 'true').subscribe(
            response => {
              let token = response.token;
              this.token = token;

              if (this.token.lenght <= 0) {
                alert('El token no se ha generado correctamente.');
              } else {
                localStorage.setItem('token', token);
                this.usuario = new Usuario(null, '', '', '', '', '', '');
              }
            },
            error => {
              this.errorMensaje = <any>error;

              if (this.errorMensaje) {
                var body = JSON.parse(error._body);
                this.errorMensaje = body.mensaje;
                console.log(error);
              }
            }
          );
        }
      },
      error => {
        this.errorMensaje = <any>error;
        console.log(error);
        if (this.errorMensaje) {
          var body = JSON.parse(error._body);
          this.errorMensaje = body.mensaje;
        }
      }
    );
  }

  onSubmitRegistro() {    
    this.ocultarError();

    this._usuarioService.registro(this.usuario_registro).subscribe(
      response => {
        this.usuario_registro = response.usuario;

        if (this.usuario_registro.id) {
          this.mensajeRegistro = 'El alta de usuario se ha realizado correctamente. Proceda a loguearse.';
          this.usuario_registro.contrasenha = '123qwe';
        } else {
          this.errorRegistro = 'Error producida en el alta. Proceda a intentarlo.';
        }

      },
      error => {
        this.errorRegistro = <any>error;
        
        if (this.errorRegistro) {
          var body = JSON.parse(error._body);

          this.errorRegistro = body.mensaje;
        }
      }
    );
  }

  ocultarError() {
    this.errorMensaje = null;
    this.errorRegistro = null;
    this.mensajeRegistro = null;
  }

  logout() {        
    localStorage.removeItem('identity');
    localStorage.removeItem('token');

    this.identity = null;
    this.token = null;
    this._router.navigate(['/']);
  }
}
