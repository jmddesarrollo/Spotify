import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-practicahijo',
  templateUrl: './practicahijo.component.html',
  styleUrls: ['./practicahijo.component.css']
})
export class PracticahijoComponent implements OnInit {
	public titulo = 'Datos que llegan al componente hijo de la práctica.';

	@Input() propiedad_a_hijo: Object;

	@Output() propiedad_a_padre = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  enviar() {
  	this.propiedad_a_padre.emit({nombre: 'Javier Molero', email: 'jmd@desarrollo@gamil.com'});
  }
}
