import { Component, OnInit } from '@angular/core';

import { GLOBAL } from '../../services/global';

import { UsuarioService } from '../../services/usuario.services';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-usuarioedit',
  templateUrl: './usuarioedit.component.html',
  styleUrls: ['./usuarioedit.component.css'],
  providers: [UsuarioService]
})
export class UsuarioeditComponent implements OnInit {
  public usuario: Usuario;
  public identity;
  public token;
  public titulo: string;
  public mensajeEdicion: string;
  public errorEdicion: string;
  public url: string;

  constructor(private _usuarioService: UsuarioService) {
    this.titulo = 'Editar datos del usuario';
    this.url = GLOBAL.url;

    // LocalStorage
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();

    this.usuario = this.identity;
  }

  ngOnInit() {
  
  }

  onSubmit() {
    this.ocultarError();

    // Aqui no se modifica la contraseña
    this.usuario.contrasenha = null;

    this._usuarioService.editUsuario(this.usuario).subscribe(
      response => {        
        if (!response.usuario) {
          this.errorEdicion = 'El usuario no se ha actualizado.';
        } else {
          this.usuario = response.usuario;
          localStorage.setItem('identity', JSON.stringify(this.usuario));

          document.getElementById('identity_name').innerHTML = this.usuario.nombre;

          // Subida de fichero en caso que haya sido añadido por usuario
          if (this.filesToUpload) {
            this.makeFileRequest(this.url + 'upload-imagen-usuario/' + this.usuario.id, [], this.filesToUpload).then(
              (result: any) => {
                this.usuario.imagen = result.imagen;
                localStorage.setItem('identity', JSON.stringify(this.usuario));

                let imagen_path = this.url + 'get-imagen-usuario/' + this.usuario.imagen;
                document.getElementById('img-logged').setAttribute('src', imagen_path);
              }
            );
          }

          this.mensajeEdicion = 'El usuario se ha actualizado correctamente.';
        }
      },
      error => {
        this.errorEdicion = <any>error;

        if (this.errorEdicion) {
          var body = JSON.parse(error._body);
          this.errorEdicion = body.mensaje;
        }
      }
    );
  }

  ocultarError() {    
    this.errorEdicion = null;
    this.mensajeEdicion = null;
  }

  // Subir archivos al servidor
  public filesToUpload: Array<File>;

  // Recoger los archivos seleccionados en el input
  fileChangeEvent(fileInput: any) {    
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  // Petición Ajax para subir ficheros convencionales.
  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    var token = this.token;

    // Lanzar el código de la subida
    return new Promise(function (resolve, reject) {
      // Simular comportamiento de un formulario
      var formData: any = new FormData();
      // Petición de ajax tipica
      var xhr = new XMLHttpRequest();
      // Recorrer los ficheros que llegan por la entrada y añadirlos al formulario
      for (var i = 0; i < files.length; i++) {
        formData.append('imagen', files[i], files[i].name);
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }          
        }
      }

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }
  // Fin Subida archivos al servidor
}
