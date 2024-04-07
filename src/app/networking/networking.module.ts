import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseApiService } from './firebase-api.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [FirebaseApiService],
})
export class NetworkingModule {}
