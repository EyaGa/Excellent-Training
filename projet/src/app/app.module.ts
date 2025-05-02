import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentif/login/login.component';
import { RegisterComponent } from './authentif/register/register.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService, SharedModule } from 'primeng/api';
import { ScrollService } from './services/scroll-sce/scroll.service';
import { HomeModule } from './Public/home/home.module';
import { AccueilComponent } from './Public/page-home/accueil.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './services/interceptor-sce/interceptor.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    HttpClientModule,
    ToastModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    SharedModule,
    NgApexchartsModule,
    
  ],
  providers: [MessageService,ScrollService,  
  { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
