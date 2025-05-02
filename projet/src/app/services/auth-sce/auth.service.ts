import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userRole = new BehaviorSubject<string | null>(null);
  private loggedInUser: any = null;

  constructor(private router: Router) {
    this.checkToken();
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

 // Dans AuthService
setLoggedInUser(user: any) {
  this.loggedInUser = user;
  this.loggedIn.next(true);
}

  getLoggedInUser(): any {
    return this.loggedInUser;
  }
  /** Observable pour récupérer le rôle de l’utilisateur */
  get userRole$(): Observable<string | null> {
    return this.userRole.asObservable();
  }

  /** À appeler après un login réussi, avec le token JWT en string */
  setToken(token: string) {
    // Stockage du token dans un cookie ou localStorage
    document.cookie = `jwt-token=${token};path=/`;
    this.extractRoleFromToken(token);
    this.loggedIn.next(true);
  }

  /** Logout : on supprime le token et on redirige */
  logout() {
    document.cookie = 'jwt-token=; max-age=0; path=/';
    this.loggedIn.next(false);
    this.userRole.next(null);
    this.router.navigate(['/login']);
  }

  /** Lit le cookie, décode le token, met à jour loggedIn et userRole */
  private checkToken() {
    const token = this.getJwtToken();
    if (token) {
      this.extractRoleFromToken(token);
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
      this.userRole.next(null);
    }
  }

  /** Lit le cookie nommé 'jwt-token' */
  private getJwtToken(): string | null {
    const match = document.cookie.match(new RegExp('(^| )jwt-token=([^;]+)'));
    return match ? match[2] : null;
  }

  /** Décode la partie payload du JWT pour en extraire le rôle unique */
 // Dans AuthService
private extractRoleFromToken(token: string) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const roles: string[] = payload.roles || payload.authorities || [];
    this.userRole.next(roles.length > 0 ? roles[0].toLowerCase() : null);
  } catch (e) {
    console.error('Impossible de décoder le token JWT', e);
    this.userRole.next(null);
  }
}

  /*
  isLoggedIn: any;
  constructor(private router: Router) {
    this.checkToken(); 
 }
  private loggedIn = new BehaviorSubject<boolean>(false);
  public loggedInUser: any; 
  private userRoles: string[] = [];
  get isLoggedIn$() {
    return this.loggedIn.asObservable();
  }

  login() {
    this.loggedIn.next(true);
 
  }
  getLoggedInUser(): any {
    return this.loggedInUser;
   }

   setUserRoles(roles: string[]) {
    this.userRoles = roles;
  }

  getUserRoles(): string[] {
    return this.userRoles;
  }

  getFirstAuthorizedPage(): string {
    const role = this.userRoles.find(role => role === 'admin' || role === 'client' || role === 'professionnel');
    switch (role) {
      case ('client' && 'admin') :
        return 'dashboard' ;
      case 'professionnel':
        return 'mesrdvs/professionnel';
      case 'professionnel' && 'client':
        return 'mesrdvs/client' ;
      case 'professionnel' || 'client':
        return 'mesrdvs/client' ;
      case (('client' || 'professionnel') && 'admin')  || (('client' && 'professionnel') && 'admin'):
        return 'dashboard' ;
      default:
        return 'login'; 
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['login']);

  }

   getJwtToken(): string | null {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
       const [name, value] = cookie.split('=');
       if (name.trim() === 'jwt-token') {
         return value;
       }
    }
    return null;
   }
   
  checkToken() {
    const token = this.getJwtToken();
    if (token) {
       console.log('JWT token:', token);
       this.loggedIn.next(true); 
    } else {
       this.loggedIn.next(false); 
    }
   }*/
   
}