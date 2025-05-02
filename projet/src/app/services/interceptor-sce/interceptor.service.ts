import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../api-sce/api.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('jwt-token');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Token set in request headers:', token);
    } else {
      console.log('Token not found in cookie');
    }

    return next.handle(request);
  }
}