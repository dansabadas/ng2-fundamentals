import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { Toastr, TOASTR_TOKEN} from '../common/toastr.service';
import { AuthService } from './auth.service';

@Component({
  templateUrl: 'app/user/profile.component.html',
  styles: [`
    em {float:right; color:#E05C65; padding-left: 10px;}
    .error input {background-color:#E3C3C5;}
    .error ::-webkit-input-placeholder { color: #999; }
    .error ::-moz-placeholder { color: #999; }
    .error :-moz-placeholder { color:#999; }
    .error :ms-input-placeholder { color: #999; }
  `]
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  private firstName: FormControl;
  private lastName: FormControl;

  constructor(private router: Router, private authService: AuthService, 
              @Inject(TOASTR_TOKEN) private toastr: Toastr) { // this type of injection is only for typescript services

  }

  public ngOnInit() {
    this.firstName = new FormControl(this.authService.currentUser.firstName,
      [Validators.required, Validators.pattern('[a-zA-Z].*')]);
    this.lastName = new FormControl(this.authService.currentUser.lastName, Validators.required);

    this.profileForm = new FormGroup({
      firstName: this.firstName,  // it must match what we have on HTML: formControlName="firstName"
      lastName: this.lastName
    });
  }

  public saveProfile(formValues) {
    if(this.profileForm.valid) {
      this.authService.updateCurrentUser(formValues.firstName, formValues.lastName).subscribe(() => {
        this.toastr.success('Profile Saved');
      });
    }
  }

  private logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/user/login']);
    });
  }

  private validateFirstName() {
    return this.firstName.valid || this.firstName.untouched;
  }
  
  private validateLastName() {
    return this.lastName.valid || this.lastName.untouched;
  }

  private cancel() {
    this.router.navigate(['events']);
  } 
}
