import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NetworkingModule } from './networking/networking.module';
import { AppRoutingModule } from './app-routing.module';
import { MenusModule } from './menus/menus.module';
import { NavigationModule } from './navigation/navigation.module';
import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';
import { ExceptionsModule } from './exceptions/exceptions.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NetworkingModule,
    NavigationModule,
    MenusModule,
    AuthModule,
    ExceptionsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
