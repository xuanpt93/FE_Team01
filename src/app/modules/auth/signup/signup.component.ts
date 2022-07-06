import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formSignup = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      newPassword: ['', Validators.required],
      birthDay: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      fullName: "ninh",
      name: "ninh"
    });
  }

  signup() {
    this.isSubmitted = true;
    if (this.formSignup.valid) {
      this.authService.signup(this.formSignup.value).subscribe();

      alert("Signup successful!");
      this.router.navigate(['/auth']);
    }
  }

}
