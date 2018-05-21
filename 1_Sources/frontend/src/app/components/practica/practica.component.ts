import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UsuarioService } from '../../services/usuario.services';
import { AlbumService } from '../../services/album.service';
import { GLOBAL } from '../../services/global';
import { Album } from '../../models/album';

@Component({
  selector: 'app-practica',
  templateUrl: './practica.component.html',
  styleUrls: ['./practica.component.css'],
  providers: [ UsuarioService, AlbumService]
})
export class PracticaComponent implements OnInit {
  public identity;
  public token;
  public url: string;	
  public albums: Album[];
  public condicion;
  public confirmado;
  public fecha;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService,
    private _albumService: AlbumService
  	) {
	    this.identity = this._usuarioService.getIdentity();
	    this.token = this._usuarioService.getToken();
	    this.url = GLOBAL.url;
	    this.confirmado = null;
  	}

  ngOnInit() {
  	this.getAlbums();
  }

  getAlbums() {
      this._albumService.getAlbums(this.token).subscribe(
        response => {
          if (response.albums) {
            this.albums = response.albums;            
          } else {
            this._router.navigate(['/']);
          }
        },
        error => {
          console.log(error);
        }
      );  	
  }

  onDeleteAlbum(id) {
  	console.log('Eliminar: ' + id);
  }  

  onDeleteConfirm(id) {
    this.confirmado = id;
  }

  onCancelAlbum() {
    this.confirmado = null;
  }  

  mouseEnter(idalbum) {
    this.condicion = idalbum;
  }

  mouseLeave(idalbum) {
    this.condicion = 0;
  }

  public datos_del_hijo;
  recibirDatos(event) {
    console.log(event);
    this.datos_del_hijo = event;
  }

  metodosArray(otroAlbum) {
    const album = new Album (0, null, null, 0, null, 0);

    // Añadir Album
    this.albums.push(album);

    var indice = this.albums.indexOf(otroAlbum);
    if (indice != -1) {
      // Eliminar objeto encontrado del array
      this.albums.splice(indice, 1);
    }

    // var arrayA = this.publications;
    // var arrayB = response.publications;
    // this.publications = arrayA.concat(arrayB);

    // Usando Jquery
    // Llevar la posición del scroll de la página al final de la página. Páginar con transición de medio segundo.
    // $('html, body').animate({scrollTop: $('body').prop('scrollHeight')}, 500);
  }
}
