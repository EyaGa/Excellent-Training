import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  
  sections = [
    { title: 'A propos', text: `Avec Excellent Training, profitez d'une gestion moderne et centralisée de vos formations professionnelles. Notre centre accompagne votre montée en compétences en facilitant votre accès aux parcours de développement.` },
    { title: 'Domaines', text: 'Découvrez nos différents domaines de formation, adaptés aux besoins de Green Building : informatique, finance, comptabilité, ressources humaines, marketing, juridique et bien d\'autres. Excellent Training vous accompagne dans chaque étape de votre progression.' }
  ];

  socialIcons = ['fa fa-twitter', 'fa fa-linkedin'];
}
