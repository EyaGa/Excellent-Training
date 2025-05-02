import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from '../authentif/login/login.component';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader,TranslateService } from '@ngx-translate/core';
import { ConfirmationService, SharedModule } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TimeformatPipe } from '../shared/timeformat/timeformat.pipe';
import { SelectButtonModule } from 'primeng/selectbutton';
import { NgxStripeModule } from 'ngx-stripe';
import { StepperModule } from 'primeng/stepper';
import { GoogleMapsModule } from '@angular/google-maps';
import { FileUploadModule } from 'primeng/fileupload';
import { ProfilComponent } from './profil/profil.component';
import { StructureComponent } from './structure/structure.component';
import { DomaineComponent } from './domaine/domaine.component';
import { UsersComponent } from './users/users.component';
import { ParticipantsComponent } from './participants/participants.component';
import { FormateursComponent } from './formateurs/formateurs.component';
import { FormationsComponent } from './formations/formations.component';
import { EmployeursComponent } from './employeurs/employeurs.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },


  { path: 'dashboard', component: DashboardComponent},
  {
    path: 'login',
    component: LoginComponent
  },
  { path: 'profil', 
  component: ProfilComponent },

  { path: 'strcuture', 
  component: StructureComponent},

  { path: 'domaine', 
  component: DomaineComponent},

  { path: 'users', 
    component: UsersComponent},
    
  { path: 'participants', 
    component: ParticipantsComponent},
  
  { path: 'formateurs', 
    component: FormateursComponent},
  
  { path: 'formations', 
    component: FormationsComponent},

  { path: 'employeurs', 
    component: EmployeursComponent},
  
    { path: 'statistiques', component: StatistiquesComponent },

];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
   DashboardComponent,
   LayoutComponent,
   TimeformatPipe,
   ParticipantsComponent,
   FormateursComponent,
   FormationsComponent,
   EmployeursComponent,
   DomaineComponent,
   ProfilComponent,
   StructureComponent,
   ParticipantsComponent,
   UsersComponent,
   StatistiquesComponent

],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    TableModule,
    CalendarModule,
    ReactiveFormsModule,
    CardModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ToolbarModule,
    ToastModule ,
    ConfirmDialogModule,
    DialogModule,
    MultiSelectModule,   
    DropdownModule,     
    FormsModule, 
    StepperModule,
    SelectButtonModule,
    NgxStripeModule,
    GoogleMapsModule,
    FileUploadModule,
    SharedModule,
    NgApexchartsModule,
    NgxChartsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })

   

  ],
  providers: [ConfirmationService,TranslateService,  
  ],
  exports: [],

})
export class DashModule { }

