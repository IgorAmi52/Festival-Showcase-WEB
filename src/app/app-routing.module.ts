import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMenuComponent } from './menus/main-menu/main-menu.component';
import { FestivalsComponent } from './menus/festivals/festivals.component';
import { FestInfoComponent } from './menus/fest-info/fest-info.component';
const routes: Routes = [
  { path: '', component: MainMenuComponent },
  { path: 'organisation/:name/:id', component: FestivalsComponent },
  { path: 'festival/:name', component: FestInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
