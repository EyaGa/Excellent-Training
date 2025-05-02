import { Component,OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit  {
  navItems = [
    { label: 'Accueil', link: 'accueil' },
    { label: 'Domaines', link: 'domaines' },
    { label: 'A propos', link: 'apropos' }
  ];
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateTo(link: string) {
    this.router.navigate([link]);
  }
}
