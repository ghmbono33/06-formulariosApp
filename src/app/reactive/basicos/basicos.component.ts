import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [],
})
export class BasicosComponent implements OnInit {
  //Se puede trabajar con FormGroup o con FormBuilder
  //El profesor prefiere con FormBuilder:

  // miFormulario: FormGroup = new FormGroup({
  //   nombre: new FormControl('Flekichinchi'),
  //   precio: new FormControl(33),
  //   existencias: new FormControl(26),
  // });

  // miFormulario: FormGroup = this.fb.group({
  //   nombre: ['Fleki', [Validators.required, Validators.minLength(3)]],
  //   precio: [33, [Validators.required, Validators.min(0)]],
  //   existencias: [26, [Validators.required, Validators.min(0)]],
  // });
  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    precio: [, [Validators.required, Validators.min(0)]],
    existencias: [, [Validators.required, Validators.min(0)]],
  });
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    //Otra forma de establecer valores al formulario:
    this.miFormulario.reset({
      nombre: 'Flekichin',
      precio: 33,
      // existencias: 26,
    });
    //Nota: también es mosible con el método setValues pero el problema es que
    //es obligatorio indicar valores para todos los campos del formulario
  }
  campoNoValido(campo: string) {
    //El nombre no será válido si tras ser cambiado (touched) devuelve algún error
    //, o sea, en este caso que la longitud mínima sea de 3 caracteres (nombre),
    //menor a 0 para precio y existencias

    return (
      this.miFormulario.controls[campo].errors && this.miFormulario.touched
      //Validación propia: Como no nos interesa que se muestre el mensaje cuando
      //el campo está vacío, añado la última condición del error required
      //  &&
      // !this.miFormulario.controls[campo].errors?.['required']
    );
  }
  guardar() {
    if (this.miFormulario.invalid) {
      //con markAllAsTouched simulamos que se han modificado todos los campos para que salten las validaciones
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }
}
