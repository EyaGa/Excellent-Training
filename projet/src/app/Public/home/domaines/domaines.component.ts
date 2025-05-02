import { Component } from '@angular/core';
import { Domaine } from 'src/app/interfaces/domaine';
import { Router, ActivatedRoute } from '@angular/router'
import { DomaineSceService } from 'src/app/services/domaine-sce/domaine-sce.service';
@Component({
  selector: 'app-domaines',
  templateUrl: './domaines.component.html',
  styleUrl: './domaines.component.css'
})
export class DomainesComponent {

 
  domaines: Domaine[] = [];


  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private domaineSceService: DomaineSceService
  ) { }

  ngOnInit(): void {
    this.domaineSceService.getAllDomaines().subscribe((domaines: Domaine[]) => {
      this.domaines = domaines;
      console.log(this.domaines);

    });

  }

  // Définition de la fonction chunkArray pour diviser un tableau en groupes
  chunkArray(array: any[], size: number): any[][] {
    const chunkedArr = [];
    let index = 0;

    while (index < array.length) {
      chunkedArr.push(array.slice(index, size + index));
      index += size;
    }

    return chunkedArr;
  }
}
