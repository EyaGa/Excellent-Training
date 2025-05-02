import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentif/login/login.component';
import { RegisterComponent } from './authentif/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AccueilComponent } from './Public/page-home/accueil.component';
import { AproposComponent } from './Public/home/apropos/apropos.component';
import { DashboardComponent } from './Private/dashboard/dashboard.component';
import { DomainesComponent } from './Public/home/domaines/domaines.component';
import { FormationsComponent } from './Private/formations/formations.component';
import { EmployeursComponent } from './Private/employeurs/employeurs.component';
import { FormateursComponent } from './Private/formateurs/formateurs.component';
import { ParticipantsComponent } from './Private/participants/participants.component';
import { StructureComponent } from './Private/structure/structure.component';
import { ProfilComponent } from './Private/profil/profil.component';
import { DomaineComponent } from './Private/domaine/domaine.component';
import { StatistiquesComponent } from './Private/statistiques/statistiques.component';


const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent  },
  { path: 'domaines', component: DomainesComponent},
  { path: 'apropos', component: AproposComponent },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},

  { path: 'formations', component: FormationsComponent, canActivate: [AuthGuard] },

  { path: 'formateurs', component: FormateursComponent, canActivate: [AuthGuard] }, 

  { path: 'participants', component: ParticipantsComponent, canActivate: [AuthGuard] },

  { path: 'structure', component: StructureComponent, canActivate: [AuthGuard] },

  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },

  { path: 'domaine', component: DomaineComponent, canActivate: [AuthGuard] },
  
  { path: 'employeurs', component: EmployeursComponent, canActivate: [AuthGuard] },

  { path: 'statistiques', component: StatistiquesComponent, canActivate: [AuthGuard] },

  { path: '', loadChildren: () => import('./Private/dash.module').then(m => m.DashModule) },

  { path: '**/**', redirectTo: 'login' },

  { path: '**', redirectTo: 'accueil' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
