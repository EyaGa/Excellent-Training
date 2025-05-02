import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Domaine } from 'src/app/interfaces/domaine';
import { Formateur } from 'src/app/interfaces/formateur';
import { Formation } from 'src/app/interfaces/formation';
import { Participant } from 'src/app/interfaces/participant';
import { UserDto } from 'src/app/interfaces/user-dto';
import { ApiService } from 'src/app/services/api-sce/api.service';
import { AuthService } from 'src/app/services/auth-sce/auth.service';
import { DomaineSceService } from 'src/app/services/domaine-sce/domaine-sce.service';
import { FormateurSceService } from 'src/app/services/formateur-sce/formateur-sce.service';
import { FormationSceService } from 'src/app/services/formation-sce/formation-sce.service';
import { ParticipantSceService } from 'src/app/services/participant-sce/participant-sce.service';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrl: './formations.component.css',
  providers: [MessageService, ConfirmationService]

})
export class FormationsComponent {
  formations: Formation[] = [];
  domaines: Domaine[] = [];
  participants?: Participant[] = [];
  formationDialog: boolean = false;
  formation: Formation = {} as Formation;
  submitted: boolean = false;
  expanded: boolean = true;

  constructor(
    private formationService: FormationSceService,
    private domaineService: DomaineSceService,
    private formateurService: FormateurSceService,
    private participantService: ParticipantSceService,
    private msgService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadAll();
  }

  private loadAll() {
    this.formationService.getAllFormations().subscribe(f => this.formations = f);
    this.domaineService.getAllDomaines().subscribe(d => this.domaines = d);
    this.participantService.getAllParticipants().subscribe(p => {
      this.participants = p ; // Assurez-vous que participants est un tableau vide par défaut si p est undefined
    });
    
      }

  openNew() {
    this.formation = {
      titre: '',
      annee: '',
      duree: '',
      budget: 0,
      domaine: this.domaines[0]
    };
    this.submitted = false;
    this.formationDialog = true;
  }

  editFormation(f: Formation) {
    this.formation = { ...f };
    this.formationDialog = true;
  }

  deleteFormation(f: Formation) {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer cette formation ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (f.idFormation!)
          this.formationService.deleteFormation(f.idFormation!).subscribe(() => {
            this.loadAll();
            this.msgService.add({ severity: 'success', summary: 'Suppression', detail: 'Formation supprimée' });
          });
      }
    });
  }

  saveFormation() {
    this.submitted = true;
    if (this.formation.idFormation) {
      this.formationService.updateFormation(this.formation).subscribe(() => {
        this.loadAll();
        this.msgService.add({ severity: 'success', summary: 'Mise à jour', detail: 'Formation modifiée' });
      });
    } else {
      this.formationService.addFormation(this.formation).subscribe(() => {
        this.loadAll();
        this.msgService.add({ severity: 'success', summary: 'Ajout', detail: 'Formation ajoutée' });
      });
    }
    this.formationDialog = false;
  }

  hideDialog() {
    this.formationDialog = false;
    this.submitted = false;
  }

  toggleSidebar() {
    this.expanded = !this.expanded;
    const c = document.querySelector('.container');
    if (c) c.classList.toggle('sidebar-collapsed', !this.expanded);
  }

  get isActive(): boolean {
    return this.expanded;
  }
}
