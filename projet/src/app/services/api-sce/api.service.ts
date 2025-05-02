import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UserDto } from 'src/app/interfaces/user-dto';
import { Logindto } from 'src/app/interfaces/logindto';
import { LoginResponse } from 'src/app/interfaces/login-response';
import { CookieService } from 'ngx-cookie-service';
import { Role } from 'src/app/interfaces/role';
import { AuthService } from '../auth-sce/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://192.168.1.17:8080/gate/login';
  loggedInUser: UserDto | undefined;


  constructor(private http: HttpClient,private cookieService:CookieService,
    private authService :AuthService
  ) { }


  login(user: Logindto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.baseUrl, user);
  }

}

  
 