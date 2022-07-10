import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminControllerService } from '../../../../@core/services/adminController.service';
import { DataService } from '../../../../@core/services/data.service';
import { DialogData } from '../userlists.component';

@Component({
  selector: 'ngx-editjobeditor',
  templateUrl: './editjobeditor.component.html',
  styleUrls: ['./editjobeditor.component.scss']
})
export class EditjobeditorComponent implements OnInit {
  formUpdate: FormGroup;
  public messages = '';
  username = ''
  constructor(private admicontrolService: AdminControllerService, private fb: FormBuilder, private router: Router, private dataService: DataService,
    public dialogRef: MatDialogRef<EditjobeditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  ngOnInit(): void {
    this.initForm();
    this.username = this.dataService.getUserNamxe();
  }

  initForm() {
    this.formUpdate = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]],
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required]],
      birthDay: ['', Validators.required],
      phoneNumber: ['', Validators.pattern('^[0-9]{10}')],
      name: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }
  get f() {
    return this.formUpdate.controls;
  }

  addJEConfirm(event: Event) {
    event.preventDefault();
    if (this.formUpdate.valid) {
      this.admicontrolService.updateJEInfor(this.formUpdate.value, this.username).subscribe(
        Response => {
          if (Response.httpStatus === "OK") {
            alert('Cập nhật thành công!');
            this.dialogRef.close();
            this.router.navigate(['/home/userlists']);
          }
        }, error => {
          if (error.error.message === "Username đã tồn tại") {
            this.messages = "Username đã tồn tại";
          } else if (error.error.message === "Email đã tồn tại") {
            this.messages = "Email đã tồn tại";
          } else if (error.error.message === "Phone đã tồn tại") {
            this.messages = "Phone đã tồn tại";
          }
        });
    }
  }

  cancelAction(event: Event) {
    event.preventDefault();
  }

}
