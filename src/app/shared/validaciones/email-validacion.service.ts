import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';

import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailValidacionService implements AsyncValidator {
  constructor(private http: HttpClient) {}
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    console.log(email);
    //Se trata de introducir un email que no exista en la B.Datos (data.json)
    //Si lo encuentra devolverá algo y eso será el objeto de error.
    //Si no lo encuentra devolverá nulo y eso significará que es correcto ya
    //que no hay error porque se trata de un nuevo e-mail

    //El map nos permite transformar el valor que el observable está emitiendo
    //en cualquier otra cosa que queramos
    //El operador/pipe delay nos permite hacer una espera, en este ejemplo
    //de 1 segundo (simulando que le cuesta tiempo al backend)
    return this.http
      .get<any[]>(`http://localhost:3000/usuarios?q=${email}`)
      .pipe(
        delay(1000),
        map((res) => (res.length === 0 ? null : { emailTomado: true }))
      );
  }
}
