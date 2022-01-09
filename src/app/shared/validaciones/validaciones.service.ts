import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidacionesService {
  nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor() {}

  //metodo para el campo username, no puede ser igual a fleki
  noPuedeSerFleki(control: FormControl): ValidationErrors | null {
    const valor: string = control.value?.trim().toLowerCase();
    if (valor === 'fleki') {
      //devolvemos un objeto con el error
      return {
        esFleki: true,
      };
    }
    return null; //null para no enviar errores
  }
  camposIguales(campo1: string, campo2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;
      console.log(pass1, pass2);
      if (pass1 !== pass2) {
        formGroup.get(campo2)?.setErrors({ noIguales: true }); //error para el campo 2
        return { noIguales: true }; //error para el formulario
      }
      formGroup.get(campo2)?.setErrors(null); //a nivel de campo, no hay error
      return null; //a nivel de formulario, no hay error
    };
  }
}
