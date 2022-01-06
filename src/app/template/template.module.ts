import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Importante: Para los Forms Template utilizamos el módulo FormsModule
import { FormsModule } from '@angular/forms';

import { TemplateRoutingModule } from './template-routing.module';
import { BasicosComponent } from './basicos/basicos.component';
import { DinamicosComponent } from './dinamicos/dinamicos.component';
import { SwitchesComponent } from './switches/switches.component';
import { CustomMinDirective } from './directives/custom-min.directive';

@NgModule({
  declarations: [BasicosComponent, DinamicosComponent, SwitchesComponent, CustomMinDirective],
  imports: [CommonModule, FormsModule, TemplateRoutingModule],
})
export class TemplateModule {}
