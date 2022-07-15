import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { FormControl, FormGroup, Validators ,FormBuilder} from "@angular/forms";
import { DataService } from '../../../../@core/services/data.service';
import { JobRegisterServiceService } from '../../../../services/job-register-service.service';
import { Statusdto } from '../../../../@core/dto/statusdto';
import { ReasonDto } from '../../../../@core/dto/reasonDto';


@Component({
  
  selector: 'ngx-job-register-details',
  templateUrl: './job-register-details.component.html',
  styleUrls: ['./job-register-details.component.scss']
})
export class JobRegisterDetailsComponent implements OnInit {

  displayedColumns: string[] = [ 'position','Fields', 'details',];
  dataSource: any;
  check : boolean;
  statusdto: Statusdto = { jobRegisterId:1 ,statusJobRegisterId:1};
  reasonDto: ReasonDto;
  
  id : any;
  jobPosition;
  workingForm;
  academicLevel;
  rank;

  userContact;
  role='';
  constructor( public router : Router, private jobRegisterController: JobRegisterServiceService, public dialog: MatDialog, public dataService: DataService ) { }
  ngOnInit(): void {
   this.dataSource= this.dataService.getJobReg();
   console.log(this.dataSource)
    data: this.jobPosition;
   
  }

  statusJobRegister (){
    this.jobRegisterController.changeStatus(this.statusdto).subscribe(
      (data) =>{
      this.dataSource.statusJobRegister = data.statusdto;
      alert('cap nhap thanh cong')
    })
  }
  reasonJobRegister (){
    this.jobRegisterController.changeStatus(this.reasonDto).subscribe((data) =>{
      this.dataSource.statusJobRegister = data.reasonDto;
      alert('cap nhap thanh cong')
    })
  }

  status2(){
    this.statusdto.jobRegisterId = this.dataSource?.id;
    this.statusdto.statusJobRegisterId = 2;
    this.statusJobRegister();
  }


  /** Whether the number of selected elements matches the total number of rows. */
 downloadCV(){
  
 }
 refuse(){
  this.statusdto.jobRegisterId = this.dataSource?.id;
  this.statusdto.statusJobRegisterId = 3;
  this.statusJobRegister();
 }
}
