import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  orgRefresh: Subject<any>;
  screenRefresh: Subject<any> = new Subject();
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
      slike: this.fb.array([]), // Empty array
      tip: ['', Validators.required],
      prevoz: [''],
      cena: ['', Validators.required],
      maxOsoba: ['', Validators.required],
    });
    this.orgRefresh = apiService.getOrgRefreshSubject();
  }

  ngOnInit(): void {
    this.orgInput.subscribe((org: Organisation) => {
      this.org = org;

      this.screenRefresh.next();
    });
    this.screenRefresh.subscribe(() => {
      this.resetFestForm(false);
      this.apiService.getFestivals(this.org.festivali).subscribe(
        (festivals) => {
          this.festivals = [];
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
    return this.festForm.get('slike').value;
  }
  addImageFestURL(newURL: String) {
    this.inputURL.nativeElement.value = '';
    const images = this.festForm.get('slike') as FormArray;
    images.push(new FormControl(newURL));
  }
  delImageFestURL() {
    const images = this.festForm.get('slike') as FormArray;
    const index = images.controls.findIndex(
      (control) => control.value === this.selImgURL
    );
    if (index !== -1) {
      images.removeAt(index);
    }
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

    var images = this.festForm.get('slike') as FormArray;
    while (images.length !== 0) {
      images.removeAt(0);
    }
    for (const image of editFest.slike) {
      images.push(new FormControl(image));
    }
  }
  addFestival() {
    if (this.festForm.valid) {
      const formValue = this.festForm.value;
      var formValueJson = JSON.stringify(formValue);
      this.apiService
        .addFestival(this.org.festivali, formValueJson)
        .subscribe(() => {
          this.screenRefresh.next();
          this.resetFestForm(false);
        });
    }
  }
  updateFest() {
    if (this.festForm.valid) {
      const formValue = this.festForm.value;
      var formValueJson = JSON.stringify(formValue);
      this.apiService
        .editFestival(
          this.org.festivali,
          this.getSelectedFestID(),
          formValueJson
        )
        .subscribe(() => {
          this.screenRefresh.next();
          this.resetFestForm(false);
        });
    }
    this.selectedFestName = '';
  }
  updateOrganisation() {
    if (this.orgForm.valid) {
      const formValue = this.orgForm.value;
      var formValueJson = JSON.stringify(formValue);
      this.apiService
        .editOrganisation(this.org.ID, formValueJson)
        .subscribe(() => {
          this.screenRefresh.next();
          this.resetFestForm(false);
          this.orgRefresh.next();
          this.closeModal('#editModal');
        });
    }
  }

  deleteEntity() {
    if (this.deleteLabel == 'Festival') {
      const festID = this.getSelectedFestID();

      this.apiService.deleteFestival(this.org.festivali, festID).subscribe(
        () => {
          this.closeModal('#deleteModal');
          this.screenRefresh.next();

          $('#editModal').modal('show');
          this.resetFestForm(false);
          this.selectedFestName = '';
        },
        (err) => {
          console.log('gaas');
        }
      );
    } else {
      this.apiService.deleteOrganisation(this.org.ID).subscribe(() => {
        this.orgRefresh.next();
        this.resetFestForm(false);
        this.selectedFestName = '';
        this.closeModal('#deleteModal');
        this.apiService.deleteFestivals(this.org.ID);
      });
    }
  }

  getSelectedFestID() {
    for (let i = 0; i < this.festivals.length; i++) {
      if (this.festivals[i].naziv == this.selectedFestName) {
        return this.festivals[i].ID;
      }
    }
  }

  resetFestForm(resetFestName) {
    if (resetFestName) {
      this.selectedFestName = '';
    }
    var images = this.festForm.get('slike') as FormArray;
    while (images.length !== 0) {
      images.removeAt(0);
    }
    this.festForm.reset();
  }
  closeModal(id: String) {
    $(id).modal('hide');
    this.resetFestForm(false);
  }
  openModal(id: String, label: String) {
    if (id == '#deleteModal') {
      this.closeModal('#editModal');
      this.deleteLabel = label;
    }
    $(id).modal('show');
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
