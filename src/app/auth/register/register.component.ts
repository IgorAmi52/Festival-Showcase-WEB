import { group } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { FirebaseApiService } from 'src/app/networking/firebase-api.service';

declare var $: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Input() registerEmmiter: Subject<any>;
  userForm: FormGroup;
  userRefresh: Subject<any>;
  constructor(private fb: FormBuilder, private apiService: FirebaseApiService) {
    this.userRefresh = apiService.getUserRefreshSubject();

    this.userForm = this.fb.group({
      korisnickoIme: ['', Validators.required],
      lozinka: ['', Validators.required],
      ime: ['', Validators.required],
      prezime: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Add email validation
      datumRodjenja: [null], // No validation for date
      adresa: ['', Validators.required],
      telefon: ['', Validators.pattern(/^\d+$/)], // Pattern for phone numbers (digits only)
      zanimanje: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.registerEmmiter.subscribe((_) => {
      $('#registerModal').modal('show');
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      const formValueJson = JSON.stringify(formValue);
      this.apiService.addUser(formValueJson).subscribe(
        () => {
          this.userRefresh.next();
          this.closeModal();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  closeModal() {
    this.userForm.reset();
    $('#registerModal').modal('hide');
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
