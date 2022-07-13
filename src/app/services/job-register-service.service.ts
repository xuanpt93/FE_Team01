import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
// private httpOptions = {
//   headers: new HttpHeaders({
//       'Content-Type': 'application-job_register/json',
//       'Access-Control-Allow-Origin': '*',
//   }),
// };
export class JobRegisterServiceService {
  private httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application-job_register/json',
          'Access-Control-Allow-Origin': '*',
      }),
    };
  private readonly baseUrl = `${environment.apiUrl}public/`;
    constructor(private http: HttpClient, private router: Router) { }

    public getListJR(form: any): Observable<any> {

        return this.http.post(`${this.baseUrl}job_register`, form);
    }

    public getListJRwithSort(form: any, param): Observable<any> {

        return this.http.post(`${this.baseUrl}job_register?sortBy=` + param, form);
    }

    public getListJRWithSeach(form: any, param): Observable<any> {

        return this.http.post(`${this.baseUrl}job_register?search=` + param, form);
    }

    public getListJRWithBothS(form: any, search, sort): Observable<any> {

        return this.http.post(`${this.baseUrl}job_register?search=` + search + `&sortBy=` + sort, form);
    }

    public deActiveJR(param: string): Observable<any> {
        return this.http.put(`${this.baseUrl}job_register-deleting?name=` + param, "");
    }

    public createNewJR(form: any): Observable<any> {

        return this.http.post(`${this.baseUrl}job_register-insertion`, form);
    }
    public updateJRInfor(form: any, param): Observable<any> {

        return this.http.put(`${this.baseUrl}job_register-updating?username=` + param, form);
    }


}
