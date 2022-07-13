import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from '../../../../@core/services/data.service';
import { JobRegisterServiceService } from '../../../../services/job-register-service.service';

@Component({
  
  selector: 'ngx-job-register-details',
  templateUrl: './job-register-details.component.html',
  styleUrls: ['./job-register-details.component.scss']
})
export class JobRegisterDetailsComponent implements OnInit {

  displayedColumns: string[] = [ 'position','Fields', 'details',];
  dataSource: any;
  check : boolean;
  constructor( public router : Router, private jobRegisterController: JobRegisterServiceService, public dialog: MatDialog, public dataService: DataService ) { }
  ngOnInit(): void {
   this.dataSource= this.dataService.getJobReg();
   console.log(this.dataSource)

   if(!localStorage.getItem("token").includes("ROLE_ADMIN") ){
this.check = true;
   }
  }
  click(){
    
  }
  



  /** Whether the number of selected elements matches the total number of rows. */
 
}
