import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FirebaseApiService {
  userRefresh: Subject<any> = new Subject();
  orgRefresh: Subject<any> = new Subject();
  constructor(private https: HttpClient) {}

  getOrganisations(): Observable<any> {
    return this.https.get(
      'https://webdesign-project-a5e0d-default-rtdb.europe-west1.firebasedatabase.app/organizatoriFestivala.json'
    );
  }
  getOrganisation(orgID): Observable<any> {
    return this.https.get(
      'https://webdesign-project-a5e0d-default-rtdb.europe-west1.firebasedatabase.app/organizatoriFestivala/' +
        orgID +
        '.json'
    );
  }
  deleteOrganisation(orgID): Observable<any> {
    return this.https.delete(
      'https://webdesign-project-a5e0d-default-rtdb.europe-west1.firebasedatabase.app/organizatoriFestivala/' +
        orgID +
        '.json'
    );
  }
  editOrganisation(orgID, orgJson): Observable<any> {
    return this.https.put(
      'https://webdesign-project-a5e0d-default-rtdb.europe-west1.firebasedatabase.app/organizatoriFestivala/' +
        orgID +
        '.json',
      orgJson
    );
  }
  getFestivals(orgID): Observable<any> {
    return this.https.get(
      'https://webdesign-project-a5e0d-default-rtdb.europe-west1.firebasedatabase.app/festivali/' +
        orgID +
        '.json'
    );
  }
  getFestival(orgID, festID): Observable<any> {
    return this.https.get(
      'https://webdesign-project-a5e0d-default-rtdb.europe-west1.firebasedatabase.app/festivali/' +
        orgID +
        '/' +
        festID +
        '.json'
    );
  }
  editFestival(orgID, festID, festJson): Observable<any> {
    return this.https.put(
      'https://webdesign-project-a5e0d-default-rtdb.europe-west1.firebasedatabase.app/festivali/' +
        orgID +
        '/' +
        festID +
        '.json',
      festJson
    );
  }
  deleteFestival(orgID, festID): Observable<any> {
    return this.https.delete(
      'https://webdesign-project-a5e0d-default-rtdb.europe-west1.firebasedatabase.app/festivali/' +
        orgID +
        '/' +
        festID +
        '.json'
    );
  }
  deleteFestivals(orgID) {
    this.https.delete(
      'https://webdesign-project-a5e0d-default-rtdb.europe-west1.firebasedatabase.app/festivali/' +
        orgID +
        '.json'
    );
  }
  addFestival(orgID, festJson): Observable<any> {
    return this.https.post(
      'https://webdesign-project-a5e0d-default-rtdb.europe-west1.firebasedatabase.app/festivali/' +
        orgID +
        '.json',
      festJson
    );
  }
  getUsers(): Observable<any> {
    return this.https.get(
      'https://webdesign-project-a5e0d-default-rtdb.europe-west1.firebasedatabase.app/korisnici.json'
    );
  }

  addUser(userJson): Observable<any> {
    return this.https.post(
      'https://webdesign-project-a5e0d-default-rtdb.europe-west1.firebasedatabase.app/korisnici.json',
      userJson
    );
  }
  editUser(userID, userJson): Observable<any> {
    return this.https.put(
      'https://webdesign-project-a5e0d-default-rtdb.europe-west1.firebasedatabase.app/korisnici/' +
        userID +
        '.json',
      userJson
    );
  }
  deleteUser(userID): Observable<any> {
    return this.https.delete(
      'https://webdesign-project-a5e0d-default-rtdb.europe-west1.firebasedatabase.app/korisnici/' +
        userID +
        '.json'
    );
  }
  getUserRefreshSubject() {
    return this.userRefresh;
  }
  getOrgRefreshSubject() {
    return this.orgRefresh;
  }
}
