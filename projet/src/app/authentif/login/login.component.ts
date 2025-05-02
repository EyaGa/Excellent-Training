import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoginResponse } from 'src/app/interfaces/login-response';
import { Logindto } from 'src/app/interfaces/logindto';
import { User } from 'src/app/interfaces/user';
import { ApiService } from 'src/app/services/api-sce/api.service';
import { AuthService } from 'src/app/services/auth-sce/auth.service';
import { UserSceService } from 'src/app/services/user-sce/user-sce.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ConfirmationService]

})
export class LoginComponent {
  loginForm = this.fb.group({
    login: ['', [Validators.required, Validators.email]],
    mdp: ['', Validators.required]
  });

  isLoggedIn: boolean = false;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private userService: UserSceService,
    private router: Router,
    private msgService: MessageService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  get login() {
    return this.loginForm.get('login');
  }

  get mdp() {
    return this.loginForm.get('mdp');
  }

  onLogin() {
    const user: Logindto = {
      login: this.loginForm.value.login!,
      mdp: this.loginForm.value.mdp!,
    };
  // Dans LoginComponent, après avoir reçu le token et le rôle
this.apiService.login(user).subscribe(response => {
  if (response.accessToken) {
    console.log('Token:', response.accessToken);

    // Stocker le token et le rôle dans le cookie
    this.cookieService.set('jwt-token', response.accessToken);
    this.cookieService.set('user-role', response.userRole.nomRole);

    // Définir le token dans AuthService
    this.authService.setToken(response.accessToken);

    // Récupérer les infos utilisateur et les stocker
    this.userService.getUserByLogin(user.login).subscribe(userDetails => {
      this.authService.setLoggedInUser(userDetails); // Stockage des infos utilisateur dans AuthService
      this.isLoggedIn = true;

      this.msgService.add({
        severity: 'success',
        summary: 'Connexion réussie',
        detail: 'Bienvenue !',
      });

      const role = response.userRole.nomRole.toLowerCase();

      // Rediriger en fonction du rôle
      if (role === 'administrateur') {
        this.router.navigate(['/dashboard']);
      } else if (role === 'responsable') {
        this.router.navigate(['/statistiques']);
      } else if (role === 'utilisateur') {
        this.router.navigate(['/formations']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  } else {
    this.msgService.add({
      severity: 'error',
      summary: 'Connexion échouée',
      detail: `Veuillez vérifier votre login et mot de passe. ${response.message}`,
    });
  }
}, error => {
  this.msgService.add({
    severity: 'error',
    summary: 'Connexion échouée',
    detail: `Une erreur est survenue lors de la connexion. Veuillez vérifier votre login et votre mot de passe et réessayez.`,
  });
  console.log(error);
});
  }
}
