import { Component } from '@angular/core';
import { ScrollService } from './services/scroll-sce/scroll.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private scrollService: ScrollService,private primengConfig: PrimeNGConfig) {
    this.primengConfig.setTranslation({
      accept: 'Oui',
      reject: 'Non'
    });
   }

  ngOnInit() {
    this.scrollService.subscribeToNavigationEvents();
  }
  title = 'projet';
}
