import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMenuComponent } from './menus/main-menu/main-menu.component';
import { FestivalsComponent } from './menus/festivals/festivals.component';
const routes: Routes = [
  { path: '', component: MainMenuComponent },
  { path: ':name/:id', component: FestivalsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
