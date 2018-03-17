import { Component, OnInit } from '@angular/core';

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
  // Contendrá todo el objeto del usuario logeado. En localStorage guardamos el objeto identity, y al iniciar cualquier petición recogeremos esa información del localStorage.
  public identity;
  // Guardado en localStorage. Se utiliza este objeto para pasarselo al servicio.
  public token;
  public errorMensaje: string;

  constructor(
    private _usuarioService: UsuarioService
  ) {
    this.usuario = new Usuario(null, '', '', '', '', '', '');
  }

  ngOnInit() {
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
  }

  onSubmit() {
    // Conseguir los datos de usuario.
    this._usuarioService.signup(this.usuario).subscribe(
      response => {
        let identity = response.usuario;
        this.identity = identity;

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
              }
            },
            error => {
              this.errorMensaje = <any>error;

              if (this.errorMensaje) {
                var body = JSON.parse(error._body);
                this.errorMensaje = body.mensaje;
              }
            }
          );
        }
      },
      error => {
        this.errorMensaje = <any>error;

        if (this.errorMensaje) {
          var body = JSON.parse(error._body);
          this.errorMensaje = body.mensaje;
        }
      }
    );
  }

  ocultarError() {
    this.errorMensaje = null;
  }

  logout() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');

    this.identity = null;
    this.token = null;
  }
}
