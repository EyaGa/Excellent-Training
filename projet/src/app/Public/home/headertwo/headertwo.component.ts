import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headertwo',
  templateUrl: './headertwo.component.html',
  styleUrl: './headertwo.component.css'
})
export class HeadertwoComponent {
  useFirstPath = true;

  navItems = [
    { label: 'Accueil', link: 'accueil' },
    { label: 'Domaines', link: 'domaines' },
    { label: 'A propos', link: 'apropos' }
  ];
  constructor(private router: Router) {}
  logoUrl: string = '../../../../assets/images/Asset 3.png';
  ngOnInit(): void {}

  navigateTo(link: string) {
    this.router.navigate([link]);
  }
}
