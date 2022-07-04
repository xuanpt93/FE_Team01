import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../@core/services/auth.service';
import { TokenService } from '../../@core/services/token.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'ngx-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  formLogin: FormGroup;
  isSubmitted = false;
  roles: string[] = [];
  isLoggedIn = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initForm();
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
      // this.roles = this.tokenService.getUser().roles;
    }

  }

  initForm() {
    this.formLogin = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.formLogin.controls;
  }


  onSubmit() {
    this.isSubmitted = true;
    if (this.formLogin.valid) {
      this.authService.login(this.formLogin.value).subscribe(
        data => {
          this.isLoggedIn = true;
          const decodeTokenStr = JSON.stringify(jwt_decode(data.jwt));
          localStorage.setItem('token', decodeTokenStr);

          this.tokenService.saveToken(data.jwt);
          this.tokenService.saveUser(data.user);
          // this.roles = this.tokenService.getUser().roles;
          this.router.navigate(['/home/']);
        }
      );
    }
  }

}
