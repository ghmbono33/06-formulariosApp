import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [],
})
export class BasicosComponent {
  //Con viewChild apuntamos a la referencia que hemos definido en el HTML
  @ViewChild('miFormulario') miFormulario!: NgForm;

  valoresPorDefecto = {
    producto: 'Fleki',
    precio: 33,
    existencias: 26,
  };

  guardar() {
    console.log(this.miFormulario);
    //Resetea el formulario y establece valores por defecto
    this.miFormulario.resetForm({
      producto: this.valoresPorDefecto.producto,
      precio: this.valoresPorDefecto.precio,
      existencias: this.valoresPorDefecto.existencias,
    });
  }
  nombreNoValido(): boolean {
    // <!-- El ? detrás del nombre del campo es necesario porque el formulario se crea
    // en el renderizado y todavía no tiene el campo (producto)-->
    return (
      this.miFormulario?.form.controls['producto']?.invalid &&
      this.miFormulario?.form.controls['producto']?.touched
    );
  }
  precioNoValido(): boolean {
    //Devolverá true si el precio < 0
    return this.miFormulario?.form.controls['precio']?.value < 0;
  }
}
