import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AproposComponent } from './apropos/apropos.component';
import { DomainesComponent } from './domaines/domaines.component';
import { BannerComponent } from './banner/banner.component';
import { RouterModule,Routes } from '@angular/router';
import { AccueilComponent } from '../page-home/accueil.component';
import { HeadertwoComponent } from './headertwo/headertwo.component';
import { FormsModule } from '@angular/forms';
import { ScrollService } from 'src/app/services/scroll-sce/scroll.service';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        AproposComponent,
        DomainesComponent,
        BannerComponent,
        AccueilComponent,
        HeadertwoComponent
    ],
    exports: [RouterModule],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        NgxStripeModule,

    ]
})
export class HomeModule { }
