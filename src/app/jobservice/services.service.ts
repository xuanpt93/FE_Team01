import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application-job/json',
        'Access-Control-Allow-Origin': '*',
    }),
  };
private readonly baseUrl = `${environment.apiUrl}public/`;
  constructor(private http: HttpClient, private router: Router) { }

  public getListJobWithSeach(form: any, param): Observable<any> {

      return this.http.post(`${this.baseUrl}job?search=` + param, form);
  }

  public deActiveJob(param: string): Observable<any> {
      return this.http.put(`${this.baseUrl}job-deleting?name=` + param, "");
  }

  public createNewJob(form: any): Observable<any> {

      return this.http.post(`${this.baseUrl}job-insertion`, form);
  }
  public updateJRInfor(form: any, param): Observable<any> {

      return this.http.put(`${this.baseUrl}job-updating?username=` + param, form);
  }
  
  public getListJob(form: any): Observable<any> {

    return this.http.post(`${this.baseUrl}job/search`, form);
}
public getListJobb(form: any): Observable<any> {

  return this.http.post(`${this.baseUrl}job`, form);
}
public getListJWithBothS(form: any, search, sort): Observable<any> {

  return this.http.post(`${this.baseUrl}job?search` + search + `&sortBy=` + sort, form);
}
public getListJwithSort(form: any, param): Observable<any> {

  return this.http.post(`${this.baseUrl}/job/search` + param, form);
}
}
