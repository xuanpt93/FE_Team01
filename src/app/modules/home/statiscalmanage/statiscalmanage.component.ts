import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { ClientRequest } from 'http';
import { DataService } from '../../../@core/services/data.service';
import { JobControllerService } from '../../../@core/services/jobcontroller.service';
@Component({
  selector: 'ngx-statiscalmanage',
  templateUrl: './statiscalmanage.component.html',
  styleUrls: ['./statiscalmanage.component.scss']
})
export class StatiscalmanageComponent implements OnInit {
  @ViewChild('lineCanvas') lineCanvas: ElementRef;
  lineChart: any;
  puslishedJob = '';
  jobReg = '';
  jobRegWaitingFor = '';
  jobRegSuccess = '';
  jobReqFailed = '';
  jobRegInterviewing = '';
  jobviews = '';
  smalldate = '07/12/2022';
  bigDate = '07/13/2022';
  jobduesoon = '';
  t1 = 0; t2 = 0; t3 = 0; t4 = 0; t5 = 0; t6 = 0; t7 = 0; t8 = 0; t9 = 0; t10 = 0; t11 = 0;
  month: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];
  constructor(private jobController: JobControllerService, private dataService: DataService) {

  }

  ngOnInit() {
    this.loadData();
    this.getJobpublished();
    this.getNumJobRegs();
    this.getNumJobRegsWithStatus1();
    this.getNumJobRegsWithStatus2();
    this.getNumJobRegsWithStatus3();
    this.getNumJobRegsWithStatus4();
    this.countJobDueSoon();
    this.getConuntJobNeeds(this.month);

  }

  selectedSmallDate(event: any) {
    this.smalldate = event.target.value;
  }

  selectedBigDate(event: any) {
    this.smalldate = event.target.value;
    this.getJobpublished();
    this.getNumJobRegs();
    this.getNumJobRegsWithStatus1();
    this.getNumJobRegsWithStatus2();
    this.getNumJobRegsWithStatus3();
    this.getNumJobRegsWithStatus4();
  }

  getJobpublished() {
    this.jobController.getcountJobs().subscribe(
      Response => {
        this.puslishedJob = Response;
      }, error => {
        console.log(error);
      }
    );
  }

  getConuntJobNeeds(month: any[]): any {
    this.jobController.getcountJobNeeds(month[10]).subscribe(
      Response => {
        this.t11 = Response;
        console.log(Response);
        return this.t11 = Response;
      }, error => {
        console.log(error);
      }
    );


  }

  getNumJobRegs() {
    this.jobController.getcountJobRegs().subscribe(
      Response => {
        console.log(Response);
        this.jobReg = Response;
      }, error => {
        console.log(error);
      }
    );
  }


  getNumJobRegsWithStatus1() {
    this.jobController.getcountJobRegsWithstatusId(1, this.smalldate, this.bigDate).subscribe(
      Response => {
        this.jobRegWaitingFor = Response;
      }, error => {
        console.log(error);
      }
    );
  }
  getNumJobRegsWithStatus2() {
    this.jobController.getcountJobRegsWithstatusId(2, this.smalldate, this.bigDate).subscribe(
      Response => {
        this.jobRegSuccess = Response;
      }, error => {
        console.log(error);
      }
    );
  }
  getNumJobRegsWithStatus3() {
    this.jobController.getcountJobRegsWithstatusId(3, this.smalldate, this.bigDate).subscribe(
      Response => {
        this.jobRegInterviewing = Response;
      }, error => {
        console.log(error);
      }
    );
  }

  getNumJobRegsWithStatus4() {
    this.jobController.getcountJobRegsWithstatusId(4, this.smalldate, this.bigDate).subscribe(
      Response => {
        this.jobReqFailed = Response;
      }, error => {
        console.log(error);
      }
    );
  }

  countJobDueSoon() {
    this.jobController.getcountJobDueSoon().subscribe(
      Response => {
        this.jobduesoon = Response;
      }, error => {
        console.log(error);
      }
    );
  }
  countViewJob() {
    this.jobController.getcountViewjob().subscribe(
      Response => {
        this.jobviews = Response;
      }, error => {
        console.log(error);
      }
    );
  }


  loadData() {

  }


  title = 'angular8chartjs';
  canvas: any;
  ctx: any;

  ngAfterViewInit() {
    this.pieChartMethod();
    this.lineChartMethod();

  }


  pieChartMethod() {
    var theHelp = Chart.helpers;
    this.canvas = document.getElementById('myPieChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        datasets: [{
          label: '# of Votes',
          data: [parseInt(this.jobReqFailed), parseInt(this.jobRegSuccess)],
          backgroundColor: [
            'rgb(237, 125, 49)',
            'rgb(68, 115, 197)'
          ],
          borderWidth: 1
        }],
        labels: ["Số ứng viên tuyển thất bại", "Số ứng viên tuyển thành công"]
      },
      options: {
        responsive: false,
      }
    }
    );
  }
  lineChartMethod() {

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11'],
        datasets: [
          {
            label: 'Số ứng viên cần tuyển',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(237, 125, 49,1)',
            borderColor: 'rgb(237, 125, 49)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgb(237, 125, 49)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [this.t1, this.t2, this.t3, this.t4, this.t5, this.t6, this.t7, this.t8, this.t9, this.t10, this.t11],
            spanGaps: false,
          },
          {
            label: 'Số ứng viên tuyển thành công',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgb(68, 115, 197)',
            borderColor: 'rgb(68, 115, 197)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [66, 59, 89, 81, 56, 55, 33, 10, 50, 50, 12, 15],
            spanGaps: false,
          }

        ]
      }
    });
  }



}
