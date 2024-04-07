import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { FestivalsComponent } from './festivals/festivals.component';

@NgModule({
  declarations: [MainMenuComponent, FestivalsComponent],
  imports: [CommonModule],
  exports: [MainMenuComponent, FestivalsComponent],
})
export class MenusModule {}
