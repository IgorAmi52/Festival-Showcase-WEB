import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMenuComponent } from './menus/main-menu/main-menu.component';
import { FestivalsComponent } from './menus/festivals/festivals.component';
import { FestInfoComponent } from './menus/fest-info/fest-info.component';
import { AdminUsersComponent } from './menus/admin-users/admin-users.component';
import { AdminOrgComponent } from './menus/admin-org/admin-org.component';
const routes: Routes = [
  { path: '', component: MainMenuComponent },
  { path: 'organisation/:id', component: FestivalsComponent },
  { path: 'festival/:orgID/:id', component: FestInfoComponent },
  { path: 'admin/users', component: AdminUsersComponent },
  { path: 'admin/organisations', component: AdminOrgComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
