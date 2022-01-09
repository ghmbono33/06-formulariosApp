import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { EmailValidacionService } from 'src/app/shared/validaciones/email-validacion.service';
import { ValidacionesService } from '../../../shared/validaciones/validaciones.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [],
})
export class RegistroComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group(
    {
      //por cada campo definimos un array con: valor del campo, validaciones
      //síncronas, validaciones asíncronas
      nombre: [
        'perico', //valor del campo
        [
          Validators.required,
          Validators.pattern(this.vs.nombreApellidoPattern),
        ],
      ],
      email: [
        'perico@perico.es',
        [Validators.required, Validators.pattern(this.vs.emailPattern)],
        [this.emailVal],
      ],
      username: ['periquito', [Validators.required, this.vs.noPuedeSerFleki]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    },
    {
      //a nivel de formulario
      validators: this.vs.camposIguales('password', 'password2'),
    }
  );
  constructor(
    private fb: FormBuilder,
    private vs: ValidacionesService, //servicio propio
    private emailVal: EmailValidacionService //servicio propio para validar emails
  ) {}

  ngOnInit(): void {
    //valores predeterminados
    this.miFormulario.reset({
      nombre: 'Manolo Bono',
      email: 'mexplaintome@gmail.com',
    });
  }

  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  submitFormulario() {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }
}
