import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UsuarioService } from '../../services/usuario.services';
import { AlbumService } from '../../services/album.service';
import { UploadService } from '../../services/upload.service';
import { Usuario } from '../../models/usuario';
import { Artista } from '../../models/artista';
import { Album } from '../../models/album';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-album-edit',
  templateUrl: '../album-add/album-add.component.html',
  styleUrls: ['./album-edit.component.css'],
  providers: [UsuarioService, AlbumService, UploadService]
})

export class AlbumEditComponent implements OnInit {
  public usuario: Usuario;
  public album: Album;
  public identity;
  public token;
  public tituloAlbum: string;
  public mensajeAccion: string;
  public errorAccion: string;
  public url: string;
  public is_edit;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService,
    private _albumService: AlbumService,
    private _uploadService: UploadService
  ) {
    this.tituloAlbum = 'Editar album';
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.url = GLOBAL.url;
    this.album = new Album(null, null, null, null, null, null);
    this.is_edit = true;
  }

  ngOnInit() {
    if (this.identity.rol != 'admin') {
      this._router.navigate(['/artistas']);
    } else {
      // Conseguir el artista por su id.
      this.getAlbum();
    }
  }

  onSubmit() {
    this._albumService.editAlbum(this.token, this.album).subscribe(
      response => {
        if (response.album) {
          this.album = response.album;

          if (this.filesToUpload) {
            // Subir imagen del album
            this._uploadService.makeFileRequest(this.url + 'upload-imagen-album/' + this.album.id, [], this.filesToUpload, this.token, 'imagen')
              .then(
              result => {
                this._router.navigate(['/artista', this.album.artista_id]);
              },
              error => {
                console.log(error);
              }
              );
          } 

          this.mensajeAccion = 'El album se ha actualizado correctamente.';

        } else {
          this.errorAccion = 'Se ha producido un error en la edición del album.';
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
  }

  getAlbum() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._albumService.getAlbum(this.token, id).subscribe(
        response => {
          if (response.album) {
            this.album = response.album;
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

  // Recoger archivos seleccionados en input File
  public filesToUpload: Array<File>;

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}

