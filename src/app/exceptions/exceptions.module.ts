import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternetErrorComponent } from './internet-error/internet-error.component';

@NgModule({
  declarations: [InternetErrorComponent],
  imports: [CommonModule],
  exports: [InternetErrorComponent],
})
export class ExceptionsModule {}
