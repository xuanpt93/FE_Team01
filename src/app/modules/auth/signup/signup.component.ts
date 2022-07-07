import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ok } from 'assert';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../@core/services/auth.service';


@Component({
  selector: 'ngx-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  formSignup: FormGroup;
  isSubmitted = false;
  isSaving = false;
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initForm();

  }

  initForm() {
    this.formSignup = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]],
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required]],
      birthDay: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]')]],
      fullName: "xuan",
      name: "pahm"
      // userName: "xuan",
      // password: "123456",
      // email: "hoang",
      // newPassword: "123456",
      // birthDay: "2020-07-12",
      // phoneNumber: "12354543",
      // fullName: "xuan",
      // name: "pahm"
    });
  }

  get f() {
    return this.formSignup.controls;
  }

  signup() {

    this.isSubmitted = true;
    if (this.formSignup.valid) {
      this.authService.signup(this.formSignup.value).subscribe(
        response => {
          alert("Signup successful!");
          this.router.navigate(['/auth']);
        },
        error => {
          // You can access status:
          console.log(error.status);
        });
    }
  }

}
