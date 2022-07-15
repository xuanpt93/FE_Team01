import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  constructor() { }
  check = true;
  name = ''
  display: any;
  role = '';
  ngOnInit(): void {
    if (localStorage.getItem('auth-token') === undefined || localStorage.getItem('auth-token') === null) {
      this.check = false;
    } else {
      this.name = localStorage.getItem("token").split(",")[0].split(':')[1].replace('"', '').replace('"', '');
      this.role = localStorage.getItem("token").split(",")[1].split(':')[1].replace('"', '').replace('"', '');

    }
  }

  logout() {
    localStorage.clear();
    this.ngOnInit();
    window.location.reload();

  }

}
