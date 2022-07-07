import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../@core/services/auth.service';

@Component({
  selector: 'ngx-sendotp',
  templateUrl: './sendotp.component.html',
  styleUrls: ['./sendotp.component.scss']
})
export class SendotpComponent implements OnInit {
  formSendotp: FormGroup;
  isSubmitted = false;
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formSendotp = this.fb.group({
      email: ['', Validators.required]
    });
  }

  send() {
    this.isSubmitted = true;
    if (this.formSendotp.valid) {
      this.authService.sendotp(this.formSendotp.value).subscribe(
        response => {
          alert("Signup successful!");
          this.router.navigate(['/resetpw']);
        },
        error => {
          alert("Can not find account! from this email address!");
        });
    }
  }

}
