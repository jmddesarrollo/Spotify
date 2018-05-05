import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UsuarioService } from '../../services/usuario.services';
import { ArtistaService } from '../../services/artista.service';
import { AlbumService } from '../../services/album.service';
import { Artista } from '../../models/artista';
import { Album } from '../../models/album';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-album-add',
  templateUrl: './album-add.component.html',
  styleUrls: ['./album-add.component.css'],
  providers: [UsuarioService, ArtistaService, AlbumService]
})

export class AlbumAddComponent implements OnInit {
  public artista: Artista;
  public album: Album;
  public identity;
  public token;
  public tituloAlbum: string;
  public mensajeAccion: string;
  public errorAccion: string;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService,
    private _artistaService: ArtistaService,
    private _albumService: AlbumService
  ) {
    this.tituloAlbum = 'Añadir albums';
    this.mensajeAccion = '';
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.url = GLOBAL.url;
    this.album = new Album(null, null, null, null, null, null);
  }

  ngOnInit() {
    if (this.identity.rol != 'admin') {
      this._router.navigate(['/artistas']);
    }
  }

  onSubmit() {
    this.ocultarError();

    this._route.params.forEach((params: Params) => {
      let artista_id = params['artistaid'];
      this.album.artista_id = artista_id;

      this._albumService.addAlbum(this.token, this.album).subscribe(
        response => {
          if (response.album) {
            this.album = response.album;
            this.mensajeAccion = 'El album se ha creado correctamente.';
            this._router.navigate(['/editar-album', this.album.id]);
          } else {
            this.errorAccion = 'Se ha producido un error en el alta del album.';
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

