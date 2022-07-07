import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../@core/services/auth.service';

@Component({
  selector: 'ngx-resetpw',
  templateUrl: './resetpw.component.html',
  styleUrls: ['./resetpw.component.scss']
})
export class ResetpwComponent implements OnInit {
  formReset: FormGroup;
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formReset = this.fb.group({
      newpass: ['', Validators.required],
      otp: ['', Validators.required]
    });
  }

  reset() {
    if (this.formReset.valid) {
      this.authService.resetpw(this.formReset.value).subscribe(

        response => {
          alert("reset password successful!");
          this.router.navigate(['/auth']);
        },
        error => {
          alert("Invalid OTP! Please, re-type!");
        });
    }
  }

}
