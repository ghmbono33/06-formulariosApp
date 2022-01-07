import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre: string;
  favoritos: Favorito[];
}
interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [],
})
export class DinamicosComponent implements OnInit {
  //Con viewChild apuntamos a la referencia que hemos definido en el HTML
  @ViewChild('miFormulario') miFormulario!: NgForm;

  persona: Persona = {
    nombre: '',
    favoritos: [
      {
        id: 1,
        nombre: 'Fleki',
      },
      {
        id: 2,
        nombre: 'Solet',
      },
    ],
  };

  favorito!: Favorito;
  mascota: string = '';
  constructor() {}

  ngOnInit(): void {}
  guardar() {
    console.log('hola');
  }
  nombreNoValido() {
    return (
      //Ambas formas son correctas:

      // this.miFormulario?.form.controls['nombre']?.value.trim().length === 0 &&
      // this.miFormulario?.form.controls['nombre']?.touched

      this.persona.nombre.trim().length === 0 &&
      this.miFormulario?.form.controls['nombre']?.touched
    );
  }
  eliminar(i: number) {
    this.persona.favoritos.splice(i, 1);
  }
  agregar() {
    // Con Math.max(...this.persona.favoritos.map(el => el.id)) conseguimos obtener el nº de mayor id
    this.favorito = {
      id: Math.max(...this.persona.favoritos.map((el) => el.id)) + 1,
      nombre: this.mascota,
    };
    this.persona.favoritos.push(this.favorito);

    //Ambas son válidas

    // this.persona.favoritos.push({
    //   id: Math.max(...this.persona.favoritos.map((el) => el.id)) + 1,
    //   nombre: this.miFormulario?.form.controls['agregar']?.value,
    // });
  }
}
