import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Observable } from 'rxjs';
import { FileController } from '../../../@core/services/FilerController.service';
import { SessionService } from '../../../@core/services/session.service';
import { User } from './profile.model';
import { ProfileService } from './profile.service';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  [x: string]: any;
  formProfile: FormGroup;
  user: User;
  username: string;

  constructor(
    private sessionService: SessionService,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private primengConfig: PrimeNGConfig,
    private uploadService: FileController, private router: Router) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    // this.getByUserName();
    this.initForm();
    this.getfilename();;
  }

  getfilename() {
    this.uploadService.getfileName(localStorage.getItem('token').split(":")[1].split(',')[0].replace('"', '').replace('"', '')).subscribe(
      Response => {
        this.filename = Response.name;
        console.log(this.filename);
      }
    );
  }
  initForm() {
    this.formProfile = this.fb.group({
      fullName: ["", Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      birthDay: ['', Validators.required],
      homeTown: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  // getByUserName() {
  //   this.username = this.sessionService.getItem('auth-user')
  //   this.profileService.getProfile(this.username).subscribe(
  //     (res) => {
  //       this.updateForm(res)
  //     }
  //   )
  // }

  // updateForm(user: User): void {
  //   this.formProfile.patchValue({
  //     fullName: user.fullName,
  //     email: user.email,
  //     phoneNumber: user.phoneNumber,
  //     birthDay: user.birthDay,
  //     homeTown: user.homeTown,
  //     gender: user.gender
  //   });
  // }

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];

  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;

  filename: any;


  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.uploadService.upload(file, localStorage.getItem('token').split(":")[1].split(',')[0].replace('"', '').replace('"', '')).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(
              (100 * event.loaded) / event.total
            );
            window.location.reload();
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            this.imageInfos = this.uploadService.getFiles('7e29889b87b94257a7a07368a9d25aca.png');
            window.location.reload();
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        }
      );
    }
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

}
