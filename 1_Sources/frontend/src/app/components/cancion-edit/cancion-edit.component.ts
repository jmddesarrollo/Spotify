import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UploadService } from '../../services/upload.service';
import { UsuarioService } from '../../services/usuario.services';
import { CancionService } from '../../services/cancion.service';
import { Cancion } from '../../models/cancion';

import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-cancion-edit',
  templateUrl: '../cancion-add/cancion-add.component.html',
  styleUrls: ['./cancion-edit.component.css'],
  providers: [UsuarioService, CancionService, UploadService]
})
export class CancionEditComponent implements OnInit {
  public cancion: Cancion;
  public identity;
  public token;
  public tituloCancion: string;
  public mensajeAccion: string;
  public errorAccion: string;
  public url: string;
  public is_edit;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService,
    private _cancionService: CancionService,
    private _uploadService: UploadService
  ) {
    this.tituloCancion = 'Editar canción';
    this.mensajeAccion = '';
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.url = GLOBAL.url;
    this.cancion = new Cancion(null, null, null, null, null, null);
    this.is_edit = true;
  }

  ngOnInit() {
    console.log('Editar canción');
    if (this.identity.rol != 'admin') {
      this._router.navigate(['/artistas']);
    } else {
      this.getCancion();
    }
  }

  getCancion() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._cancionService.getCancion(this.token, id).subscribe(
        response => {
          if (response.cancion) {
            this.cancion = response.cancion;
          } else {
            this._router.navigate(['/']);
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

  onSubmit() {
    this.ocultarError();

    this._route.params.forEach((params: Params) => {
      let album_id = params['albumid'];
      this.cancion.album_id = album_id;

      this._cancionService.editCancion(this.token, this.cancion).subscribe(
        response => {
          if (response.cancion) {
            this.cancion = response.cancion;
            this.mensajeAccion = 'La canción ha sido modificada correctamente.';
            // Subir el fichero de audio.
            if (this.filesToUpload) {
              // Subir imagen del album
              this._uploadService.makeFileRequest(this.url + 'upload-archivo-cancion/' + this.cancion.id, [], this.filesToUpload, this.token, 'archivo')
                .then(
                result => {
                  this._router.navigate(['/album', this.cancion.album_id]);
                },
                error => {
                  console.log(error);
                }
                );
            } 
          } else {
            this.errorAccion = 'Se ha producido un error en la edición de la canción.';
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

  // Recoger archivos seleccionados en input File
  public filesToUpload: Array<File>;

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  ocultarError() {
    this.errorAccion = null;
    this.mensajeAccion = null;
  }
}
