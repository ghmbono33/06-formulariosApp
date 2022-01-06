import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'template',
    //LazyLoading: con loadChildren el módulo no se cargará hasta que no se vaya a la ruta
    loadChildren: () =>
      import('./template/template.module').then((m) => m.TemplateModule),
  },
  {
    path: 'reactive',
    //LazyLoading: con loadChildren el módulo no se cargará hasta que no se vaya a la ruta
    loadChildren: () =>
      import('./reactive/reactive.module').then((m) => m.ReactiveModule),
  },
  { path: '**', redirectTo: 'template' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
