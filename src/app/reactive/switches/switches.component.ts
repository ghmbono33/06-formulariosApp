import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [],
})
export class SwitchesComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    genero: ['M', Validators.required],
    notificaciones: [true, Validators.required],
    condiciones: [false, Validators.requiredTrue], //Se requiere que sea verdadero
  });
  persona = {
    genero: 'F',
    notificaciones: false,
  };
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    //Podemos inicializarlo con persona y aunque no tenga la propiedad condiciones con reset
    //no tenemos problema mientras que con setValue se produciría un error.
    this.miFormulario.reset(this.persona);
    //Si quisieramos inicializarlo además con condiciones podríamos desestructurar persona y añadir
    //las condiciones
    this.miFormulario.reset({ ...this.persona, condiciones: true }); //Inicializa

    //----------- Para detectar cada vez que cambia un campo determinado del formulario
    this.miFormulario
      .get('condiciones')
      ?.valueChanges.subscribe((nuevoValor) => console.log(nuevoValor));
    //----------- Para detectar cada vez que cambia el Formulario
    this.miFormulario.valueChanges.subscribe((miForm) => console.log(miForm));
    //----------- Con esta técnica vamos a guardar persona con todos los
    //campos del formulario excepto las condiciones (ya que no está definido)
    //en persona
    this.miFormulario.valueChanges.subscribe(
      ({ condiciones, ...restoDeCampos }) => (this.persona = restoDeCampos)
    );
  }
  guardar() {
    const formValue = { ...this.miFormulario.value };
    delete formValue.condiciones;
  }
}
