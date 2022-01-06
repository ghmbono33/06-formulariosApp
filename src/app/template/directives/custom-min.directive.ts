import { Directive, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[customMin][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: CustomMinDirective, multi: true },
  ],
})
export class CustomMinDirective implements Validator {
  @Input() minimo!: number;
  constructor() {
    console.log('directiva', this.minimo);
  }
  validate(control: FormControl) {
    //Si el valor es inferior al mínimo devuelve un objeto con el error (podemos poner
    //cualquier nombre a la propiedad del objeto),
    //de lo contrario null (no hay error)
    return control.value < this.minimo ? { flekiChin: true } : null;
  }
}
