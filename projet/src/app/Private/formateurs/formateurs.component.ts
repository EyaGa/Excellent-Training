import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Employeur } from 'src/app/interfaces/employeur';
import { Formateur } from 'src/app/interfaces/formateur';
import { UserDto } from 'src/app/interfaces/user-dto';
import { ApiService } from 'src/app/services/api-sce/api.service';
import { AuthService } from 'src/app/services/auth-sce/auth.service';
import { EmployeurSceService } from 'src/app/services/employeur-sce/employeur-sce.service';
import { FormateurSceService } from 'src/app/services/formateur-sce/formateur-sce.service';

@Component({
  selector: 'app-professionals',
  templateUrl: './formateurs.component.html',
  styleUrl: './formateurs.component.css',
  providers: [MessageService, ConfirmationService]

})
export class FormateursComponent {
  formateurs: Formateur[] = [];
  formateurDialog: boolean = false;
  formateur: Formateur = { nomFormateur: '', prenomFormateur: '', emailFormateur: '', telFormateur: 0, typeFormateur: '', employeur: { nomEmployeur: '' } };
  submitted: boolean = false;
  expanded: boolean = true;
  employeurs: Employeur[] = [];

  constructor(
    private formateurService: FormateurSceService,
    private msgService: MessageService,
    private confirmationService: ConfirmationService,
    private employeurService: EmployeurSceService
  ) {}

  ngOnInit() {
    this.loadFormateurs();
    this.employeurService.getAllEmployeurs().subscribe((data: Employeur[]) => {
      this.employeurs = data;
    });
  }

  loadFormateurs() {
    this.formateurService.getAllFormateurs().subscribe((data: Formateur[]) => {
      this.formateurs = data;
    });
  }

  openNew() {
    this.formateur = { nomFormateur: '', prenomFormateur: '', emailFormateur: '', telFormateur: 0, typeFormateur: '', employeur: { nomEmployeur: '' } };
    this.submitted = false;
    this.formateurDialog = true;
  }

  editFormateur(formateur: Formateur) {
    this.formateur = { ...formateur };
    this.formateurDialog = true;
  }

  deleteFormateur(formateur: Formateur) {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer ce formateur ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (formateur.idFormateur) {
          this.formateurService.deleteFormateur(formateur.idFormateur).subscribe(() => {
            this.loadFormateurs();
            this.msgService.add({ severity: 'success', summary: 'Succès', detail: 'Formateur supprimé', life: 3000 });
          });
        }
      }
    });
  }

  saveFormateur() {
    this.submitted = true;
    if (this.formateur.idFormateur) {
      this.formateurService.updateFormateur(this.formateur).subscribe(() => {
        this.loadFormateurs();
        this.msgService.add({ severity: 'success', summary: 'Succès', detail: 'Formateur mis à jour', life: 3000 });
      });
    } else {
      this.formateurService.addFormateur(this.formateur).subscribe(() => {
        this.loadFormateurs();
        this.msgService.add({ severity: 'success', summary: 'Succès', detail: 'Formateur ajouté', life: 3000 });
      });
    }
    this.formateurDialog = false;
  }

  hideDialog() {
    this.formateurDialog = false;
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
