import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { GLOBAL } from './global';
import { Cancion } from '../models/cancion';

@Injectable()
export class CancionService {
  public url: string;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  getCanciones(token, albumid = null) {
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    const options = new RequestOptions({ headers: headers });

    if (albumid == null) {
      return this._http.get(this.url + 'canciones', options).map(res => res.json());
    } else {
      return this._http.get(this.url + 'canciones/' + albumid, options).map(res => res.json());
    }
  }
 
  getCancion(token, id) {
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    const options = new RequestOptions({ headers: headers });
    return this._http.get(this.url + 'cancion/' + id, options).map(res => res.json());
  }

  addCancion(token, cancion: Cancion) {
    const params = JSON.stringify(cancion);
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });

    return this._http.post(this.url + 'cancion', params, { headers: headers }).map(res => res.json());
  }

  editCancion(token, cancion: Cancion) {
    const params = JSON.stringify(cancion);
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });

    return this._http.put(this.url + 'cancion/' + cancion.id, params, { headers: headers }).map(res => res.json());
  }

  delCancion(token, id) {
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    const options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url + 'cancion/' + id, options).map(res => res.json());
  }
}
