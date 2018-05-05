import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UsuarioService } from '../../services/usuario.services';
import { AlbumService } from '../../services/album.service';
import { ArtistaService } from '../../services/artista.service';
import { CancionService } from '../../services/cancion.service';

import { Usuario } from '../../models/usuario';
import { Album } from '../../models/album';
import { Artista } from '../../models/artista';
import { Cancion } from '../../models/cancion';
import { GLOBAL } from '../../services/global';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  providers: [UsuarioService, AlbumService, ArtistaService, CancionService]
})

export class PlayerComponent implements OnInit {
  public usuario: Usuario;
  public album: Album;
  public artista: Artista;
  public cancion: Cancion;
  public identity;
  public token;
  public titulo: string;
  public errorAccion: string;
  public mensajeAccion: string;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService,
    private _albumService: AlbumService,
    private _artistaService: ArtistaService,
    private _cancionService: CancionService
  ) {
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.url = GLOBAL.url;
    this.cancion = new Cancion(0, null, null, null, null, null);
    this.album = new Album(0, null, null, 0, null, 0);
    this.artista = new Artista(0, null, null, null);
  }

  ngOnInit() {
    let cancion = JSON.parse(localStorage.getItem('sound_song'));

    if (cancion) {
      this.cancion = cancion;

      this.getAlbum();
    }
    
  }

  getAlbum() {
    let id = this.cancion.album_id;

    this._albumService.getAlbum(this.token, id).subscribe(
      response => {
        if (response.album) {
          this.album = response.album;

          // Sacar Artista
          this._artistaService.getArtista(this.token, this.album.artista_id).subscribe(
            response => {
              if (response.artista) {
                this.artista = response.artista;
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
  }
}
