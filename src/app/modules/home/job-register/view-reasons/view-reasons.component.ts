import { Component, OnInit } from '@angular/core';
import { JobRegisterServiceService } from '../../../../services/job-register-service.service';

@Component({
  selector: 'ngx-view-reasons',
  templateUrl: './view-reasons.component.html',
  styleUrls: ['./view-reasons.component.scss']
})
export class ViewReasonsComponent implements OnInit {

  constructor(public jobRegisterService : JobRegisterServiceService) { }
  statusJobRegister : any;
  reason : any;
  ngOnInit(): void {
    console.log(this.jobRegisterService.getReasons());
    console.log(this.jobRegisterService.getReasonss());
    this.statusJobRegister = this.jobRegisterService.getReasons().statusJobRegister; 
    this.reason = this.jobRegisterService.getReasonss().statusJobRegister.reason;
  }

}
