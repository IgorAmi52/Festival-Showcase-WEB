import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { FestivalsComponent } from './festivals/festivals.component';
import { FestInfoComponent } from './fest-info/fest-info.component';

@NgModule({
  declarations: [MainMenuComponent, FestivalsComponent, FestInfoComponent],
  imports: [CommonModule],
  exports: [MainMenuComponent, FestivalsComponent, FestInfoComponent],
})
export class MenusModule {}
