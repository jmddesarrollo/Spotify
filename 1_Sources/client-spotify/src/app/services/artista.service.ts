import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { GLOBAL } from './global';
import { Artista } from '../models/artista';

@Injectable()
export class ArtistaService {
  public url: string;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  getArtistas(token) {
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    const options = new RequestOptions({ headers: headers });
    return this._http.get(this.url + 'artistas', options).map(res => res.json());
  }

  getArtista(token, id) {
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    const options = new RequestOptions({ headers: headers });
    return this._http.get(this.url + 'artista/' + id, options).map(res => res.json());
  }

  addArtista(token, artista: Artista) {    
    const params = JSON.stringify(artista);
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });

    return this._http.post(this.url + 'artista', params, { headers: headers }).map(res => res.json());
  }

  editArtista(token, artista: Artista) {
    const params = JSON.stringify(artista);
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });

    return this._http.put(this.url + 'artista/' + artista.id, params, { headers: headers }).map(res => res.json());
  }

  delArtista(token, id) {
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    const options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url + 'artista/' + id, options).map(res => res.json());
  }
}
