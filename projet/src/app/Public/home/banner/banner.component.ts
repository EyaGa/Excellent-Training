import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'; 
import { AfterViewInit } from '@angular/core';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  slides = [
    {
      title: "Développez votre potentiel par la formation",
      text: "Green Building, à travers Excellent Training, accompagne ses équipes avec des formations sur mesure, adaptées aux besoins professionnels du marché.",
      linkText: "S'inscrire",
      link: "register"
    },
    {
      title: "Gérez efficacement vos formations",
      text: "Notre application permet de centraliser, suivre et évaluer toutes les activités de formation pour une meilleure performance au sein de Green Building.",
      linkText: "S'inscrire",
      link: "register"
    },
    {
      title: "Votre évolution professionnelle, notre priorité",
      text: "Grâce à Excellent Training, développez vos compétences, accédez à de nouvelles responsabilités et contribuez pleinement au succès de votre entreprise.",
      linkText: "S'inscrire",
      link: "register"
    }
  ];
  
  constructor() { }


}
