import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UsuarioService } from '../../services/usuario.services';
import { ArtistaService } from '../../services/artista.service';
import { Artista } from '../../models/artista';
import { GLOBAL } from '../../services/global';
@Component({
  selector: 'app-artista-add',
  templateUrl: './artista-add.component.html',
  styleUrls: ['./artista-add.component.css'],
  providers: [UsuarioService, ArtistaService]
})
export class ArtistaAddComponent implements OnInit {
  public artista: Artista;
  public identity;
  public token;
  public titulo: string;
  public mensajeAccion: string;
  public errorAccion: string;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService,
    private _artistaService: ArtistaService
  ) {
    this.titulo = 'Añadir artistas';
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.url = GLOBAL.url;
    this.artista = new Artista(null, null, null, null);
  }

  ngOnInit() {
    if (this.identity.rol != 'admin') {
      this._router.navigate(['/artistas']);
    }
  }

  onSubmit() {
    this._artistaService.addArtista(this.token, this.artista).subscribe(
      response => {
        if (response.artista) {
          this.artista = response.artista;
          this.mensajeAccion = 'El artista se ha creado correctamente.';
          this._router.navigate(['/editar-artista', this.artista.id]);
        } else {
          this.errorAccion = 'Se ha producido un error en el alta del artista.';
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
