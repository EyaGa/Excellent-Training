import { Component, AfterViewInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Role } from 'src/app/interfaces/role';
import { UserDto } from 'src/app/interfaces/user-dto';
import { ApiService } from 'src/app/services/api-sce/api.service';
import { AuthService } from 'src/app/services/auth-sce/auth.service';
import { UserSceService } from 'src/app/services/user-sce/user-sce.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  loggedInUser: any;
  expanded: boolean = true; 
  userRole: Role | undefined; 

  

  navItems = [
    { label: '', link: '' },

  ];
  router: any;

  constructor(private authService: AuthService,
    private userService: UserSceService
  ) { }
  isLoggedIn(): boolean {
    return!!this.loggedInUser; 
  }
  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser();
    this.userService.getUserRole(this.loggedInUser.login).subscribe(
      (role: Role) => {
        this.userRole = role;  // Attribuer correctement le rôle retourné
      },
      (error) => {
        console.error('Erreur lors de la récupération des rôles de l\'utilisateur:', error);
      }
    );
  }
  

hasRole(roleName: string): boolean {
  return this.userRole?.nomRole === roleName;  // Vérifie directement le rôle de l'utilisateur
}

  toggleSidebar() {
    this.expanded = !this.expanded;
    const container = document.querySelector('.container');
    if (container) {
      if (this.expanded) {
        container.classList.add('sidebar-expanded');
        container.classList.remove('sidebar-collapsed');
      } else {
        container.classList.add('sidebar-collapsed');
        container.classList.remove('sidebar-expanded');
      }
    }
  }

  get isActive(): boolean {
    return this.expanded;
  }

  get authorizedMenuItems(): string[] {
    if (!this.loggedInUser || !this.loggedInUser.role) {
      return []; 
    }

    const role = this.loggedInUser.role.nomRole; 

    switch (role) {
      case 'administrateur':
        return ['dashboard', 'formateurs','formations','participants','statistiques','domaine','structure','profil','users'];
      case 'utilisateur':
        return ['formateurs','formations','participants']; 
      case 'responsable':
        return ['statistiques']; 
      default:
        return [];
    }
  }

  logout() {
    // Exemple basique
    this.authService.logout(); // ou ton service d'authentification
    this.router.navigate(['/login']);
  }
  
}


