import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Input() loginEmmiter: Subject<any>;
  userForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      korisnickoIme: ['', Validators.required],
      lozinka: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loginEmmiter.subscribe((_) => {
      $('#loginModal').modal('show');
    });
    this.backingFixed();
  }

  onSubmit() {
    this.closeModal();
  }

  closeModal() {
    $('#loginModal').modal('hide');
  }
  openModal(id: String) {}

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
