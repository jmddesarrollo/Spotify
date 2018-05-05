import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UsuarioService } from '../../services/usuario.services';
import { ArtistaService } from '../../services/artista.service';
import { AlbumService } from '../../services/album.service';
import { UploadService } from '../../services/upload.service';
import { Usuario } from '../../models/usuario';
import { Artista } from '../../models/artista';
import { Album } from '../../models/album';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-artista-detail',
  templateUrl: './artista-detail.component.html',
  styleUrls: ['./artista-detail.component.css'],
  providers: [UsuarioService, ArtistaService, AlbumService, UploadService]
})
export class ArtistaDetailComponent implements OnInit {
  public usuario: Usuario;
  public artista: Artista;
  public albums: Album[];
  public identity;
  public token;
  public titulo: string;
  public mensajeAccion: string;
  public errorAccion: string;
  public url: string;
  public is_edit;
  public confirmado;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService,
    private _artistaService: ArtistaService,
    private _albumService: AlbumService,
    private _uploadService: UploadService
  ) {
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.url = GLOBAL.url;
    this.artista = new Artista(0, null, null, null);
    this.confirmado = null;
  }

  ngOnInit() {
    if (this.identity.rol != 'admin') {
      this._router.navigate(['/artistas']);
    } else {
      // Conseguir el artista por su id.
      this.getArtista();
    }
  }

  getArtista() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._artistaService.getArtista(this.token, id).subscribe(
        response => {
          if (response.artista) {
            this.artista = response.artista;
            // Mostrar albums del artista
            this._albumService.getAlbums(this.token, this.artista.id).subscribe(
              response => {
                if (response.albums) {
                  this.albums = response.albums;
                } else {
                  this.errorAccion = 'Este artista no tiene albums';
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

  onDeleteConfirm(id) {
    this.confirmado = id;
  }

  onCancelAlbum() {
    this.confirmado = null;
  }

  onDeleteAlbum(id) {
    this._albumService.delAlbum(this.token, id).subscribe(
      response => {
        if (response.albumId) {
          this.getArtista();
        } else {
          alert('Error en la eliminación');
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
}
