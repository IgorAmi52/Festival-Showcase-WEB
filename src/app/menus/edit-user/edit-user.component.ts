import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user.interface';

declare var $: any;
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  @Input() userInput: Subject<any>;
  @ViewChild('myForm') myForm: NgForm;
  user: User;
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      korisnickoIme: ['', Validators.required],
      lozinka: ['', Validators.required],
      ime: ['', Validators.required],
      prezime: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      datumRodjenja: ['', Validators.required],
      adresa: [''],
      telefon: ['', Validators.pattern(/^\d+$/)],
      zanimanje: [''],
    });
  }

  ngOnInit(): void {
    this.userInput.subscribe((user) => {
      this.user = user;
      this.userForm.patchValue(user);

      $('#editModal').modal('show');
    });
    // solution for the modal not closing when the back browser button is clicked
    this.backingFixed();
  }

  closeModal(id: String) {
    $(id).modal('hide');
  }
  openModal(id: String) {
    if (id == '#deleteModal') {
      this.closeModal('#editModal');
    }
    $(id).modal('show');
  }

  deleteUser() {
    // to be implemented
    this.closeModal('#deleteModal');
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
