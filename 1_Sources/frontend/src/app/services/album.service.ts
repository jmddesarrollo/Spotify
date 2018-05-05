import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { GLOBAL } from './global';
import { Album } from '../models/album';

@Injectable()
export class AlbumService {
  public url: string;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  getAlbums(token, artistaid = null) {
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    const options = new RequestOptions({ headers: headers });

    if (artistaid == null) {
      return this._http.get(this.url + 'albums', options).map(res => res.json());
    } else {
      return this._http.get(this.url + 'albums/' + artistaid, options).map(res => res.json());
    }
    
  }

  getAlbum(token, id) {
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    const options = new RequestOptions({ headers: headers });
    return this._http.get(this.url + 'album/' + id, options).map(res => res.json());
  }

  addAlbum(token, album: Album) {
    const params = JSON.stringify(album);
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });

    return this._http.post(this.url + 'album', params, { headers: headers }).map(res => res.json());
  }

  editAlbum(token, album: Album) {
    const params = JSON.stringify(album);
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });

    return this._http.put(this.url + 'album/' + album.id, params, { headers: headers }).map(res => res.json());
  }

  delAlbum(token, id) {
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    const options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url + 'album/' + id, options).map(res => res.json());
  }
}
