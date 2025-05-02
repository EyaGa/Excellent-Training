import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { NgApexchartsModule } from 'ng-apexcharts';
import { StatSceService } from 'src/app/services/stat-sce/stat-sce.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Observable, map } from 'rxjs';
import { Role } from 'src/app/interfaces/role';
import { AuthService } from 'src/app/services/auth-sce/auth.service';
import { UserSceService } from 'src/app/services/user-sce/user-sce.service';


@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrl: './statistiques.component.css'
})
export class StatistiquesComponent implements OnInit {
  
  formateursParType: any[] = [];
  participantsParStructure: any[] = [];
  participantsParProfil: any[] = [];
  formationsParDomaine: any[] = [];
  formationsParAnnee: any[] = [];
  formationsParAnneeArea: any[] = [];
  participantsProfilChartData: any;

  view: [number, number] = [450, 300];
  showLegend = true;
  showLabels = true;
  router: any;

  constructor(private statsService: StatSceService,private authService: AuthService,
    private userService: UserSceService) {}

  ngOnInit(): void {

    this.loggedInUser = this.authService.getLoggedInUser();
    console.log('Utilisateur connecté:', this.loggedInUser);
  
    if (this.loggedInUser) {
      const login = this.loggedInUser.login;
      this.userService.getUserRole(login).subscribe(role => {
        this.userRoleName = role.nomRole;
        console.log('Nom du rôle:', this.userRoleName);
      });
    } else {
      console.error('Utilisateur non connecté');
    }

    // Formateurs par type (Pie Chart)
    this.statsService.getFormateursParType().subscribe(data => {
      this.formateursParType = this.formatChartData(data);
    });
  
    // Participants par structure (Bar Chart)
    this.statsService.getParticipantsParStructure().subscribe(data => {
      this.participantsParStructure = this.formatChartData(data);
    });
  
    // Participants par profil (Polar Chart)
    this.statsService.getParticipantsParProfil().subscribe(data => {
      const entries = this.formatChartData(data);
      console.log("Participants par Profil", entries);
      this.participantsProfilChartData = entries; // Directement utilisable dans pie-chart
    });
  
    // Formations par domaine (Advanced Pie Chart)
    this.statsService.getFormationsParDomaine().subscribe(data => {
      this.formationsParDomaine = this.formatChartData(data);
    });
  
    // Formations par année (Line Chart)
    this.statsService.getFormationsParAnnee().subscribe(data => {
      this.formationsParAnnee = this.formatChartData(data);
      this.formationsParAnneeArea = [{
        name: 'Formations',
        series: this.formatChartData(data) // Format des données pour le Line Chart
      }];
    });
  }
  
  
  formatChartData(data: any): any[] {
    return Object.keys(data).map(key => ({
      name: key,
      value: data[key]
    }));
  }

  loggedInUser: any;
    expanded: boolean = true; 
    userRole: Role | undefined; 
  
    
  
    navItems = [
      { label: '', link: '' },
  
    ];
    cookieService: any;
    userRoleName: string | undefined;
  
    isLoggedIn(): boolean {
      return!!this.loggedInUser; 
    }
    hasRole(roleName: string): Observable<boolean> {
      const login = this.loggedInUser.login;
  
      return this.userService.getUserRole(login).pipe(  // Appel correct de getUserRole
        map(role => role.nomRole === roleName)
      );
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
      if (!this.userRole) {
        return [];
      }
    
      const role = this.userRole.nomRole.toLowerCase();
    
      switch (role) {
        case 'administrateur':
          return ['dashboard', 'formateurs', 'formations', 'participants', 'statistiques', 'domaine', 'structure', 'profil', 'users'];
        case 'utilisateur':
          return ['formateurs', 'formations', 'participants'];
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