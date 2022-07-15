import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../../jobservice/services.service';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../../@core/services/data.service';
import { PageEvent } from '@angular/material/paginator';
import { DetailsComponent } from './details/details.component';
import { Route, Router } from '@angular/router';
import { AddjobComponent } from './addjob/addjob.component';

@Component({
  selector: 'ngx-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  displayedColumns: string[] = ['name', 'jobPositionId', 'startRecruitmentDate', 'dueDate', 'salaryMax', 'salaryMin', 'statusJobId', 'views','details'];
  dataSource: [];
  currentPage = 0;
  pageSize = 1;
  isLoading = false;
  totalRow = 0;
  pageSizeOptions: number[] = [1, 5, 10, 25, 100];
  obj = { "pageNumber": this.currentPage, "pageSize": this.pageSize };
  searchStr: string;
  sortStr: string;
  constructor(private jobController: ServicesService, public dialog: MatDialog, public dataService: DataService, public router: Router) { }
  loadData() {
    this.jobController.getListJob(this.obj).subscribe(
      Response => {
        this.dataSource = Response;
        this.dataSource.map(objs => {
        })
      }, error => {
        console.log(error);
      }
    );
  }
  ngOnInit(): void {
    this.loadData();
  }
  
  pageChanged(event: PageEvent) {
    this.obj.pageSize = event.pageSize;
    this.obj.pageNumber = event.pageIndex;
    this.loadData();
  }

  showdetails(element: any) {
    this.dataService.setJobDetailsName(element);
  this.router.navigate(["/home/details"]);
  }

  search() {
    this.searchStr = (<HTMLInputElement>document.getElementById("searchStr")).value;
    if (this.sortStr === null || this.sortStr === undefined || this.sortStr === '') {
      this.jobController.getListJobWithSeach(this.obj, this.searchStr).subscribe(
        Response => {
          this.dataSource = Response;
          this.dataSource.map(objs => {
            return { objs, birthDay: "ok" }
          })
        }, error => {
          console.log(error);
        }
      );
    } else {
      this.jobController.getListJWithBothS(this.obj, this.searchStr, this.sortStr).subscribe(
        Response => {
          this.dataSource = Response;
          this.dataSource.map(objs => {
            return { objs, birthDay: "ok" }
          })
        }, error => {
          console.log(error);
        }
      );

    }
  }



  selected(event: any) {
    this.sortStr = event.target.value;

    this.jobController.getListJwithSort(this.obj, this.sortStr).subscribe(
      Response => {
        this.dataSource = Response;
        this.dataSource.map(objs => {
          return { objs, birthDay: "ok" }
        })
      }, error => {
        console.log(error);
      }
    );

  }
  addJob() {
    this.router.navigate(["/home/addjobcomponent"]);
  }

}
