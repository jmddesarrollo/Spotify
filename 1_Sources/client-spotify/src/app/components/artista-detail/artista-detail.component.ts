import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UsuarioService } from '../../services/usuario.services';
import { ArtistaService } from '../../services/artista.service';
import { UploadService } from '../../services/upload.service';
import { Usuario } from '../../models/usuario';
import { Artista } from '../../models/artista';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-artista-detail',
  templateUrl: './artista-detail.component.html',
  styleUrls: ['./artista-detail.component.css'],
  providers: [UsuarioService, ArtistaService, UploadService]
})
export class ArtistaDetailComponent implements OnInit {
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
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    this.url = GLOBAL.url;
    this.artista = new Artista(null, null, null, null);
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

      console.log(id);

      this._artistaService.getArtista(this.token, id).subscribe(
        response => {
          if (response.artista) {
            this.artista = response.artista;
            // Mostrar albums del artista
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
}
