import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';
@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token') != null) {
      const token = localStorage.getItem('token');
      console.log(token)
      // if the token is  stored in localstorage add it to http header
      const headers = new HttpHeaders().set("access-token", token);
      //clone http to the custom AuthRequest and send it to the server 
      const AuthRequest = request.clone({ headers: headers });
      return next.handle(AuthRequest)
    } else {
      return next.handle(request);
    }
  }
}