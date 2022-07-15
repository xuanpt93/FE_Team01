import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminControllerService } from '../../../../@core/services/adminController.service';
import { ServicesService } from '../../../../jobservice/services.service';


@Component({
  selector: 'ngx-addjob',
  templateUrl: './addjob.component.html',
  styleUrls: ['./addjob.component.scss']
})
export class AddjobComponent implements OnInit {
  formAdd: FormGroup;
  public messages = '';
  constructor(
    private admicontrolService: AdminControllerService,
     private fb: FormBuilder,
      private router: Router,
      private jobservice: ServicesService
    ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formAdd = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(150)]],
      jobPosition: ['',Validators.required],
      numberExperience: ['',Validators.required],
      workingForm: ['', [Validators.required]],
      addressWork: ['', Validators.required],
      academicLevel: ['', Validators.required],
      qtyPerson: ['', [Validators.required,Validators.pattern('^[0-9]{1,3}$')]],
      rank: ['', Validators.required],
      dueDate: ['', Validators.required],
      skills: ['', Validators.required],
      description: ['', Validators.required],
      benefits: ['', Validators.required],
      jobRequirement: ['', Validators.required],
      salaryMax: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(20),Validators.pattern('^[0-9]{5,20}$')]],
      salaryMin: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(20),Validators.pattern('^[0-9]{5,20}$')]],
      contact: ['', Validators.required],
      statusJob: ['', Validators.required]
    });
  }
  get f() {
    return this.formAdd.controls;
  }

  addJobConfirm(event: Event) {
    event.preventDefault();
    if (this.formAdd.valid) {
      this.jobservice.createNewJob(this.formAdd.value).subscribe(
        Response => {
          if (Response.httpStatus === "OK") {
            alert('Tạo mới thành công!');
            
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
