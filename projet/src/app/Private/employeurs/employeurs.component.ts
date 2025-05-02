import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Employeur } from 'src/app/interfaces/employeur';
import { UserDto } from 'src/app/interfaces/user-dto';
import { ApiService } from 'src/app/services/api-sce/api.service';
import { AuthService } from 'src/app/services/auth-sce/auth.service';
import { EmployeurSceService } from 'src/app/services/employeur-sce/employeur-sce.service';

@Component({
  selector: 'app-professionals',
  templateUrl: './employeurs.component.html',
  styleUrl: './employeurs.component.css',
  providers: [MessageService, ConfirmationService]

})
export class EmployeursComponent {
  employeurs: Employeur[] = [];
  employeurDialog: boolean = false;
  employeur: Employeur = { nomEmployeur: '' };
  selectedEmployeur: Employeur | undefined;
  submitted: boolean = false;
  expanded: boolean = true;

  constructor(
    private employeurService: EmployeurSceService,
    private msgService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadEmployeurs();
  }

  loadEmployeurs() {
    this.employeurService.getAllEmployeurs().subscribe((data: Employeur[]) => {
      this.employeurs = data;
    });
  }

  openNew() {
    this.employeur = { nomEmployeur: '' };
    this.submitted = false;
    this.employeurDialog = true;
  }

  editEmployeur(employeur: Employeur) {
    this.employeur = { ...employeur };
    this.employeurDialog = true;
  }

  deleteEmployeur(employeur: Employeur) {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer cet employeur ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (employeur.idEmployeur) {
          this.employeurService.deleteEmployeur(employeur.idEmployeur).subscribe(() => {
            this.loadEmployeurs();
            this.msgService.add({ severity: 'success', summary: 'Succès', detail: 'Employeur supprimé', life: 3000 });
          });
        }
      }
    });
  }

  saveEmployeur() {
    this.submitted = true;
    if (this.employeur.idEmployeur) {
      this.employeurService.updateEmployeur(this.employeur).subscribe(() => {
        this.loadEmployeurs();
        this.msgService.add({ severity: 'success', summary: 'Succès', detail: 'Employeur mis à jour', life: 3000 });
      });
    } else {
      this.employeurService.addEmployeur(this.employeur).subscribe(() => {
        this.loadEmployeurs();
        this.msgService.add({ severity: 'success', summary: 'Succès', detail: 'Employeur ajouté', life: 3000 });
      });
    }
    this.employeurDialog = false;
    this.employeur = { nomEmployeur: '' };
  }

  hideDialog() {
    this.employeurDialog = false;
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
