import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { GLOBAL } from './global';
import { Artista } from '../models/artista';

@Injectable()
export class UploadService {
  public url: string;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  // Petición Ajax para subir ficheros convencionales.
  makeFileRequest(url: string, params: Array<string>, files: Array<File>, token: string, name: string) {
    // Lanzar el código de la subida
    return new Promise(function (resolve, reject) {
      // Simular comportamiento de un formulario
      var formData: any = new FormData();
      // Petición de ajax tipica
      var xhr = new XMLHttpRequest();
      // Recorrer los ficheros que llegan por la entrada y añadirlos al formulario
      for (var i = 0; i < files.length; i++) {
        formData.append(name, files[i], files[i].name);
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
