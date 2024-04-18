import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Festival } from 'src/app/models/festival.interface';
import { Organisation } from 'src/app/models/organisation.interface';
import { FirebaseApiService } from 'src/app/networking/firebase-api.service';

declare var $: any;
@Component({
  selector: 'app-edit-org',
  templateUrl: './edit-org.component.html',
  styleUrls: ['./edit-org.component.css'],
})
export class EditOrgComponent implements OnInit {
  @Input() orgInput: Subject<any>;
  org: Organisation = {
    ID: undefined,
    naziv: undefined,
    adresa: undefined,
    godinaOsnivanja: undefined,
    logo: undefined,
    kontaktTelefon: undefined,
    email: undefined,
    festivali: undefined,
  };
  festivals: Array<Festival> = [];
  orgForm: FormGroup;
  festForm: FormGroup;
  selectedFestName: String = '';
  selImgURL: String = '';
  deleteLabel: String = '';
  @ViewChild('inputURL') inputURL: any;
  constructor(private fb: FormBuilder, private apiService: FirebaseApiService) {
    this.orgForm = this.fb.group({
      naziv: ['', Validators.required],
      adresa: ['', Validators.required],
      godinaOsnivanja: ['', Validators.required],
      logo: [''], // You may add validators here if needed
      kontaktTelefon: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      festivali: [''], // You may add validators here if needed
    });
    this.festForm = this.fb.group({
      naziv: ['', Validators.required],
      opis: ['', Validators.required],
      slike: [[]], // Empty array
      tip: ['', Validators.required],
      prevoz: [''],
      cena: ['', Validators.required],
      maxOsoba: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.orgInput.subscribe((org: Organisation) => {
      this.org = org;
      this.festivals = [];
      this.apiService.getFestivals(org.festivali).subscribe(
        (festivals) => {
          for (let i in festivals) {
            const festival = { ...festivals[i], ID: i };
            this.festivals.push(festival);
          }
          this.orgForm.patchValue(this.org);
          this.openModal('#editModal', null);
        },
        (err) => {
          console.log(err);
        }
      );
    });
    // solution for the modal not closing when the back browser button is clicked
    this.backingFixed();
  }
  get images(): Array<String> {
    if (this.festForm.get('slike').value) {
      return this.festForm.get('slike').value;
    }
    return [];
  }
  addImageFestURL(newURL: String) {
    this.inputURL.nativeElement.value = '';
    let arr = this.images;
    arr.push(newURL);
    this.festForm.get('slike').setValue(arr);
  }
  delImageFestURL() {
    let arr = this.images;
    arr = arr.filter((item) => item != this.selImgURL);
    this.festForm.get('slike').setValue(arr);
    this.selImgURL = '';
  }
  festSelected() {
    let editFest: Festival;
    for (let i in this.festivals) {
      if (this.festivals[i].naziv == this.selectedFestName) {
        editFest = this.festivals[i];
        break;
      }
    }
    this.festForm.patchValue(editFest);
  }
  addFestival() {
    // just adding to array not really adding a festival

    this.festivals.push({
      ...this.festForm.value,
      ID: Math.random().toString(36).slice(2),
    });
    this.resetFestForm();
  }
  updateFest() {
    if (this.festForm.valid) {
      for (let i = 0; i <= this.festivals.length; i++) {
        if (this.festivals[i].naziv == this.selectedFestName) {
          this.festivals.splice(i, 1, {
            ...this.festForm.value,
            ID: this.festivals[i].ID,
          });
          break;
        }
      }
      this.resetFestForm();
    }
  }
  resetFestForm() {
    this.selectedFestName = '';
    this.festForm.get('slike').setValue([]);
    this.festForm.reset();
  }
  closeModal(id: String) {
    if (id == '#editModal') {
      this.resetFestForm();
    }
    $(id).modal('hide');
  }
  openModal(id: String, label: String) {
    if (id == '#deleteModal') {
      this.closeModal('#editModal');
      this.deleteLabel = label;
    }
    $(id).modal('show');
  }

  deleteEntity() {
    // to be implemented
    this.closeModal('#deleteModal');
    if (this.deleteLabel == 'Festival') {
      this.festivals = this.festivals.filter(
        (item) => item.naziv != this.selectedFestName
      );
      $('#editModal').modal('show');
    }
    console.log(this.festivals);
    this.resetFestForm();
  }
  onSubmit() {
    this.closeModal('#editModal');
  }
  backingFixed() {
    $(document).ready(function () {
      $('div.modal').on('show.bs.modal', function () {
        var modal = this;
        var hash = modal.id;
        window.location.hash = hash;
        window.onhashchange = function () {
          if (!location.hash) {
            $(modal).modal('hide');
          }
        };
      });
      $('div.modal').on('hidden.bs.modal', function () {
        var hash = this.id;
        history.replaceState('', document.title, window.location.pathname);
      });
      // when close button clicked simulate back
      $('div.modal button.close').on('click', function () {
        window.history.back();
      });
      // when esc pressed when modal open simulate back
      $('div.modal').keyup(function (e) {
        if (e.keyCode == 27) {
          window.history.back();
        }
      });
    });
  }
}
