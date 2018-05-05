import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UsuarioService } from '../../services/usuario.services';
import { ArtistaService } from '../../services/artista.service';
import { Usuario } from '../../models/usuario';
import { Artista } from '../../models/artista';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-artista-list',
  templateUrl: './artista-list.component.html',
  styleUrls: ['./artista-list.component.css'],
  providers: [UsuarioService, ArtistaService]
})
export class ArtistaListComponent implements OnInit {
  public usuario: Usuario;
  public artistas: Artista[];
  public identity;
  public token;
  public titulo: string;  
  public errorAccion: string;
  public url: string;
  public confirmado: number;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService,
    private _artistaService: ArtistaService,
  ) {
    this.titulo = 'Artistas';
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.url = GLOBAL.url;
    this.confirmado = null;
  }

  ngOnInit() {
    console.log('Listado de artistas cargado.');

    // Conseguir listado de artistas.
    this.getArtistas();
  }

  getArtistas() {
    this._route.params.forEach((params: Params) => {
      this._artistaService.getArtistas(this.token).subscribe(
        response => {
          if (response.artistas) {
            this.artistas = response.artistas;
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

  onCancelArtista() {
    this.confirmado = null;
  }

  onDeleteArtista(id) {
    this._artistaService.delArtista(this.token, id).subscribe(
      response => {
        if (response.artistaId) {
          this.getArtistas();
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
