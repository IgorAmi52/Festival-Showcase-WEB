import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { FestivalsComponent } from './festivals/festivals.component';
import { FestInfoComponent } from './fest-info/fest-info.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminOrgComponent } from './admin-org/admin-org.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditOrgComponent } from './edit-org/edit-org.component';

@NgModule({
  declarations: [
    MainMenuComponent,
    FestivalsComponent,
    FestInfoComponent,
    AdminUsersComponent,
    AdminOrgComponent,
    EditUserComponent,
    EditOrgComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [
    MainMenuComponent,
    FestivalsComponent,
    FestInfoComponent,
    AdminUsersComponent,
    AdminOrgComponent,
  ],
})
export class MenusModule {}
