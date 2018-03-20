import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { GLOBAL } from './global';
import { Usuario } from '../models/usuario';

@Injectable()
export class UsuarioService {
  public url: string;
  public identity;
  public token;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'));

    if (identity != 'undefined' && identity != null) {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
  }

  getToken() {
    let token = localStorage.getItem('token');

    if (token != 'undefined' && token != null) {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  signup(usuario_to_login, gethash = null) {
    if (gethash) {
      usuario_to_login.gethash = gethash;
    }

    const params = JSON.stringify(usuario_to_login);
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this._http.post(this.url + 'login', params, { headers: headers }).map(res => res.json());
  }

  registro(usuario_registro) {
    const params = JSON.stringify(usuario_registro);
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this._http.post(this.url + 'usuario', params, { headers: headers }).map(res => res.json());
  }

  editUsuario(usuario) {
    const params = JSON.stringify(usuario);
    const headers = new Headers({ 'Content-Type': 'application/json' , 'Authorization': this.getToken() });

    return this._http.put(this.url + 'usuario/' + usuario.id, params, { headers: headers }).map(res => res.json());
  }



  //getEstructuraEmpresas() {
  //  return this._http.get(this.url + 'estructuraempresas').map(res => res.json());
  //}

  //getEstructuraEmpresa(id: string) {
  //  return this._http.get(this.url + 'estructuraempresa/' + id).map(res => res.json());
  //}

  //updateEstructuraEmpresa(id: string, estructuraempresa: EstructuraEmpresa) {
  //  const json = JSON.stringify(estructuraempresa);
  //  const params = json;
  //  const headers = new Headers({ 'Content-Type': 'application/json' });

  //  return this._http.put(this.url + 'estructuraempresa/' + id, params, { headers: headers }).map(res => res.json());
  //}

  //updateFather(id: string, estructuraempresa: EstructuraEmpresa) {
  //  const json = JSON.stringify(estructuraempresa);
  //  const params = json;
  //  const headers = new Headers({ 'Content-Type': 'application/json' });

  //  return this._http.put(this.url + 'estructuraempresafather/' + id, params, { headers: headers }).map(res => res.json());
  //}

  ///**
  // * Añadir un elemento a la estructura de la empresa.
  // */
  //addEstructuraEmpresa(estructuraempresa: EstructuraEmpresa) {
  //  const json = JSON.stringify(estructuraempresa);
  //  const params = json;
  //  const headers = new Headers({ 'Content-Type': 'application/json' });

  //  return this._http.post(this.url + 'estructuraempresa', params, { headers: headers }).map(res => res.json());
  //}

  //getRelaciones(id: string) {
  //  return this._http.get(this.url + 'relaciones/' + id).map(res => res.json());
  //}

  //delRelacion(id: string) {
  //  const headers = new Headers({ 'Content-Type': 'application/json' });

  //  return this._http.put(this.url + 'relacion/' + id, '', { headers: headers }).map(res => res.json());
  //}

  //getEmpleados() {
  //  return this._http.get(this.url + 'empleados').map(res => res.json());
  //}

  //getRoles() {
  //  return this._http.get(this.url + 'roles').map(res => res.json());
  //}

  ///**
  // * Añadir un elemento a la estructura de la empresa.
  // */
  //addRecursos(id: string, recursos: any) {
  //  const json = JSON.stringify(recursos);
  //  const params = json;
  //  const headers = new Headers({ 'Content-Type': 'application/json' });

  //  return this._http.post(this.url + 'addrelacion/' + id, params, { headers: headers }).map(res => res.json());
  //}
}
