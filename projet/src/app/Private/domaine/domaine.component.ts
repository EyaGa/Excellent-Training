import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Domaine } from 'src/app/interfaces/domaine';
import { UserDto } from 'src/app/interfaces/user-dto';
import { ApiService } from 'src/app/services/api-sce/api.service';
import { AuthService } from 'src/app/services/auth-sce/auth.service';
import { DomaineSceService } from 'src/app/services/domaine-sce/domaine-sce.service';

@Component({
  selector: 'app-professionals',
  templateUrl: './domaine.component.html',
  styleUrl: './domaine.component.css',
  providers: [MessageService, ConfirmationService]

})
export class DomaineComponent {
  domaines: Domaine[] = [];
  domaineDialog: boolean = false;
  selectedDomaine: Domaine | undefined;
  domaine: Domaine = { libelleDomaine: '' };
  submitted: boolean = false;
  expanded: boolean = true;

  constructor(
    private domaineService: DomaineSceService,
    private msgService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadDomaines();
  }

  loadDomaines() {
    this.domaineService.getAllDomaines().subscribe((data: Domaine[]) => {
      this.domaines = data;
    });
  }

  openNew() {
    this.domaine = { libelleDomaine: '' };
    this.submitted = false;
    this.domaineDialog = true;
  }

  editDomaine(domaine: Domaine) {
    this.domaine = { ...domaine };
    this.domaineDialog = true;
  }

  deleteDomaine(domaine: Domaine) {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer ce domaine ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (domaine.idDomaine) {
          this.domaineService.deleteDomaine(domaine.idDomaine).subscribe(() => {
            this.loadDomaines();
            this.msgService.add({ severity: 'success', summary: 'Succès', detail: 'Domaine supprimé', life: 3000 });
          });
        }
      }
    });
  }

  saveDomaine() {
    this.submitted = true;
    if (this.domaine.idDomaine) {
      this.domaineService.updateDomaine(this.domaine).subscribe(() => {
        this.loadDomaines();
        this.msgService.add({ severity: 'success', summary: 'Succès', detail: 'Domaine mis à jour', life: 3000 });
      });
    } else {
      this.domaineService.addDomaine(this.domaine).subscribe(() => {
        this.loadDomaines();
        this.msgService.add({ severity: 'success', summary: 'Succès', detail: 'Domaine ajouté', life: 3000 });
      });
    }
    this.domaineDialog = false;
    this.domaine = { libelleDomaine: '' };
  }

  hideDialog() {
    this.domaineDialog = false;
    this.submitted = false;
  }

  toggleSidebar() {
    this.expanded = !this.expanded;
    const container = document.querySelector('.container');
    if (container) {
      if (this.expanded) {
        container.classList.add('sidebar-expanded');
        container.classList.remove('sidebar-collapsed');
      } else {
        container.classList.add('sidebar-collapsed');
        container.classList.remove('sidebar-expanded');
      }
    }
  }

  get isActive(): boolean {
    return this.expanded;
  }
}
