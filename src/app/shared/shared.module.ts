import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// RouterModule es necesario para hacer routerLink, lo he importando a mano
import { RouterModule } from '@angular/router';
import { SidemenuComponent } from './sidemenu/sidemenu.component';

@NgModule({
  declarations: [SidemenuComponent],
  imports: [CommonModule, RouterModule],
  exports: [SidemenuComponent],
})
export class SharedModule {}
