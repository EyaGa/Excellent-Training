import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Profil } from 'src/app/interfaces/profil';
import { UserDto } from 'src/app/interfaces/user-dto';
import { ApiService } from 'src/app/services/api-sce/api.service';
import { AuthService } from 'src/app/services/auth-sce/auth.service';
import { ProfilSceService } from 'src/app/services/profil-sce/profil-sce.service';

@Component({
  selector: 'app-professionals',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css',
  providers: [MessageService, ConfirmationService]

})
export class ProfilComponent {
  profils: Profil[] = [];
  profilDialog: boolean = false;
  selectedProfil: Profil | undefined;
  profil: Profil = { libelleProfil: '' };
  submitted: boolean = false;
  expanded: boolean = true;

  constructor(
    private profilService: ProfilSceService,
    private msgService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadProfils();
  }

  loadProfils() {
    this.profilService.getAllProfils().subscribe((data: Profil[]) => {
      this.profils = data;
    });
  }

  openNew() {
    this.profil = { libelleProfil: '' };
    this.submitted = false;
    this.profilDialog = true;
  }

  editProfil(profil: Profil) {
    this.profil = { ...profil };
    this.profilDialog = true;
  }

  deleteProfil(profil: Profil) {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer ce profil ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (profil.idProfil) {
          this.profilService.deleteProfil(profil.idProfil).subscribe(() => {
            this.loadProfils();
            this.msgService.add({ severity: 'success', summary: 'Succès', detail: 'Profil supprimé', life: 3000 });
          });
        }
      }
    });
  }

  saveProfil() {
    this.submitted = true;
    if (this.profil.idProfil) {
      this.profilService.updateProfil(this.profil).subscribe(() => {
        this.loadProfils();
        this.msgService.add({ severity: 'success', summary: 'Succès', detail: 'Profil mis à jour', life: 3000 });
      });
    } else {
      this.profilService.addProfil(this.profil).subscribe(() => {
        this.loadProfils();
        this.msgService.add({ severity: 'success', summary: 'Succès', detail: 'Profil ajouté', life: 3000 });
      });
    }
    this.profilDialog = false;
    this.profil = { libelleProfil: '' };
  }

  hideDialog() {
    this.profilDialog = false;
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
