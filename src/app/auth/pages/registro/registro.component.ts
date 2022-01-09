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

  get emailErrorMsg(): string {
    let msgError = '';
    const errorMail = this.miFormulario.get('email')?.errors;
    if (errorMail?.['required']) {
      msgError = 'El mail es obligatorio';
    } else if (errorMail?.['pattern']) {
      msgError = 'El mail es incorrecto';
    } else if (errorMail?.['emailTomado']) {
      msgError = 'El mail ya existe';
    }
    return msgError;
  }
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
  // Método propio que funciona bien para las validaciones
  //del e-mail. Aun así lo sustituyo por la forma de hacerlo
  //del profe

  // campoEmail(email: string): string | null {
  //   if (this.campoNoValido(email)) {
  //     if (this.miFormulario.get('email')?.hasError('emailTomado')) {
  //       return 'El mail ya existe.';
  //     } else if (this.miFormulario.get('email')?.hasError('required')) {
  //       //Se trata del required
  //       return 'El e-mail es requerido';
  //     }
  //     return 'e-mail incorrecto';
  //   }
  //   return '';
  // }

  submitFormulario() {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }
}
