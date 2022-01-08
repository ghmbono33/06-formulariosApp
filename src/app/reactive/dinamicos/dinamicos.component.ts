import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

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
  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array(
      [
        ['Fleki', Validators.required],
        ['Solet', Validators.required],
      ],
      [Validators.required, Validators.minLength(2)] //al menos 2 favoritos
    ),
  });

  //Para conectar con el input que nos permite agregar nuevos elementos, 2
  //formas de hacerlo: así:
  // nuevoFavorito: FormControl = this.fb.control(
  //   'valor inicial',
  //   Validators.required
  // );
  // o creando una instancia de FormControl con new FormControl()
  nuevoFavorito: FormControl = new FormControl(
    'valor inicial',
    Validators.required
  );

  get favoritosArray() {
    //getter que nos permite acceder al array de FormControl de miFormulario
    //Ambas opciones funcionan:
    // return this.miFormulario.controls['favoritos'] as FormArray;
    return this.miFormulario.get('favoritos') as FormArray;
  }
  constructor(private fb: FormBuilder) {} //Inyectamos el servicio

  ngOnInit(): void {}

  campoNoValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors && this.miFormulario.touched
    );
  }
  agregarFavorito() {
    if (this.nuevoFavorito.invalid) return;
    //Se puede hacer o creando una nueva instancia con new FormControl o bien
    //utilizando el atributo/propiedad fb
    //Forma 1:
    //this.favoritosArray.push(this.fb.control(this.nuevoFavorito.value, Validators.required))
    //Forma 2:
    this.favoritosArray.push(
      new FormControl(this.nuevoFavorito.value, Validators.required)
    );
    this.nuevoFavorito.reset(); //inicializamos
  }
  borrar(i: number) {
    const array = this.favoritosArray.removeAt(i);
  }
  guardar() {
    if (this.miFormulario.invalid) {
      //con markAllAsTouched simulamos que se han modificado todos los campos para que salten las validaciones
      this.miFormulario.markAsTouched();
      return;
    }
    console.log(this.miFormulario.value);
  }
}
