import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FirebaseApiService {
  constructor(private https: HttpClient) {}

  getOrganisations(): Observable<any> {
    return this.https.get(
      'https://webdesign-project-a5e0d-default-rtdb.europe-west1.firebasedatabase.app/data/organizatoriFestivala.json'
    );
  }
  getOrganisation(orgID): Observable<any> {
    return this.https.get(
      'https://webdesign-project-a5e0d-default-rtdb.europe-west1.firebasedatabase.app/data/organizatoriFestivala/' +
        orgID +
        '.json'
    );
  }
  getFestivals(orgID): Observable<any> {
    return this.https.get(
      'https://webdesign-project-a5e0d-default-rtdb.europe-west1.firebasedatabase.app/data/' +
        orgID +
        '.json'
    );
  }
  getFestival(orgID, festID): Observable<any> {
    return this.https.get(
      'https://webdesign-project-a5e0d-default-rtdb.europe-west1.firebasedatabase.app/data/' +
        orgID +
        '/' +
        festID +
        '.json'
    );
  }
  getUsers(): Observable<any> {
    return this.https.get(
      'https://webdesign-project-a5e0d-default-rtdb.europe-west1.firebasedatabase.app/data/korisnici.json'
    );
  }
}
