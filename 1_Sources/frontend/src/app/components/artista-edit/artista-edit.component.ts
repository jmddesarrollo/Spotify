import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UsuarioService } from '../../services/usuario.services';
import { ArtistaService } from '../../services/artista.service';
import { UploadService } from '../../services/upload.service';
import { Usuario } from '../../models/usuario';
import { Artista } from '../../models/artista';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-artista-edit',
  templateUrl: '../artista-add/artista-add.component.html',
  styleUrls: ['./artista-edit.component.css'],
  providers: [UsuarioService, ArtistaService, UploadService]
})

export class ArtistaEditComponent implements OnInit {
  public usuario: Usuario;
  public artista: Artista;
  public identity;
  public token;
  public titulo: string;
  public mensajeAccion: string;
  public errorAccion: string;
  public url: string;
  public is_edit;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService,
    private _artistaService: ArtistaService,
    private _uploadService: UploadService
  ) {
    this.titulo = 'Editar artistas';
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.url = GLOBAL.url;
    this.artista = new Artista(null, null, null, null);
    this.is_edit = true;
  }

  ngOnInit() {
    if (this.identity.rol != 'admin') {
      this._router.navigate(['/artistas']);
    } else {
      // Conseguir el artista por su id.
      this.getArtista();
    }
  }

  onSubmit() {
    this._artistaService.editArtista(this.token, this.artista).subscribe(
      response => {
        if (response.artista) {
          this.artista = response.artista;

          // Subir imagen del artista
          this._uploadService.makeFileRequest(this.url + 'upload-imagen-artista/' + this.artista.id, [], this.filesToUpload, this.token, 'imagen')
            .then(
            result => {
              this._router.navigate(['/artistas']);
            },
            error => {
              console.log(error);
            }
            );

          this.mensajeAccion = 'El artista se ha actualizado correctamente.';
        } else {
          this.errorAccion = 'Se ha producido un error en la edición del artista.';
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

  getArtista() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._artistaService.getArtista(this.token, id).subscribe(
        response => {
          if (response.artista) {
            this.artista = response.artista;            
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
