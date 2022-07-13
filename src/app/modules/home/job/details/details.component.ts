import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../@core/services/data.service';

@Component({
  selector: 'ngx-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  
  check : boolean;
  constructor(private dataservice: DataService) { }
  jobdetails: any;
  ngOnInit(): void {
    this.jobdetails = this.dataservice.getJobDetailsName();
    console.log(this.jobdetails);
    if(!localStorage.getItem("token").includes("ROLE_ADMIN") ){
      this.check = true;
         }
  }
  

}
