import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../services/usuario.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UsuarioService]
})

export class HomeComponent implements OnInit {
  public identity;
  public token;
  public titulo: string;

  constructor(
    private _usuarioService: UsuarioService
  ) {
    this.titulo = 'Añadir artistas';
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
  }

  ngOnInit() {

  }

}
