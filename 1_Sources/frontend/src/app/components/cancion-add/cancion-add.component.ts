import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UsuarioService } from '../../services/usuario.services';
import { CancionService } from '../../services/cancion.service';
import { Cancion } from '../../models/cancion';

import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-cancion-add',
  templateUrl: './cancion-add.component.html',
  styleUrls: ['./cancion-add.component.css'],
  providers: [UsuarioService, CancionService]
})

export class CancionAddComponent implements OnInit {
  public cancion: Cancion;
  public identity;
  public token;
  public tituloCancion: string;
  public mensajeAccion: string;
  public errorAccion: string;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService,
    private _cancionService: CancionService
  ) {
    this.tituloCancion = 'Crear nueva canción';
    this.mensajeAccion = '';
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.url = GLOBAL.url;
    this.cancion = new Cancion(null, null, null, null, null, null);
  }

  ngOnInit() {
    if (this.identity.rol != 'admin') {
      this._router.navigate(['/artistas']);
    }
  }
  
  onSubmit() {        
    this.ocultarError();

    this._route.params.forEach((params: Params) => {
      let album_id = params['albumid'];
      this.cancion.album_id = album_id;

      this._cancionService.addCancion(this.token, this.cancion).subscribe(
        response => {
          if (response.cancion) {
            this.cancion = response.cancion;
            this.mensajeAccion = 'La canción se ha creado correctamente.';

            this._router.navigate(['/editar-cancion', this.cancion.id]);
          } else {
            this.errorAccion = 'Se ha producido un error en el alta de la canción.';
          }
        },
        error => {
          this.errorAccion = <any>error;

          if (this.errorAccion) {
            var body = JSON.parse(error._body);
            this.errorAccion = body.mensaje;
          }
        }
      );
    });
  }

  ocultarError() {
    this.errorAccion = null;
    this.mensajeAccion = null;
  }
}
