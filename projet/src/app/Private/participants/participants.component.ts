import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Formation } from 'src/app/interfaces/formation';
import { Participant } from 'src/app/interfaces/participant';
import { Profil } from 'src/app/interfaces/profil';
import { Structure } from 'src/app/interfaces/structure';
import { UserDto } from 'src/app/interfaces/user-dto';
import { ApiService } from 'src/app/services/api-sce/api.service';
import { AuthService } from 'src/app/services/auth-sce/auth.service';
import { FormationSceService } from 'src/app/services/formation-sce/formation-sce.service';
import { ParticipantSceService } from 'src/app/services/participant-sce/participant-sce.service';
import { ProfilSceService } from 'src/app/services/profil-sce/profil-sce.service';
import { StructureSceService } from 'src/app/services/structure-sce/structure-sce.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrl: './participants.component.css',
  providers: [MessageService, ConfirmationService]

})
export class ParticipantsComponent {
  participants: Participant[] = [];
  structures:   Structure[]   = [];
  profils:      Profil[]      = [];
  formations:   Formation[]   = [];

  participantDialog: boolean = false;
  participant: Participant = {} as Participant;
  submitted: boolean = false;
  expanded:  boolean = true;

  constructor(
    private participantService: ParticipantSceService,
    private structureService:   StructureSceService,
    private profilService:      ProfilSceService,
    private formationService:   FormationSceService,
    private msgService:         MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadAll();
  }
  
  private loadAll() {
    this.participantService.getAllParticipants().subscribe(p => {
      this.participants = p;
      this.participants.forEach(participant => {
        if (participant.idParticipant) {
          this.formationService.getFormationsByParticipant(participant.idParticipant)
            .subscribe(f => participant.formations = f);
        }
      });
    });
  
    this.structureService.getAllStructures().subscribe(s => this.structures = s);
    this.profilService.getAllProfils().subscribe(p => this.profils = p);
    this.formationService.getAllFormations().subscribe(f => this.formations = f);
  }
  
getTitresFormations(participant: Participant): string {
  if (!participant.formations || participant.formations.length === 0) {
    return 'Aucune';
  }
  return participant.formations.map(f => f.titre).join(', ');
}

  openNew() {
    this.participant = {
      nomParticipant: '',
      prenomParticipant: '',
      emailParticipant: '',
      telParticipant: 0,
      structure: {} as Structure,
      profil: {} as Profil,
      formations: []
    };
    this.submitted = false;
    this.participantDialog = true;
  }
  

  editParticipant(pt: Participant) {
    this.participant = {
      ...pt,
      structure: { ...pt.structure },
      profil: { ...pt.profil },
      formations: pt.formations ? [...pt.formations] : []
    };
    this.participantDialog = true;
  }
  
  
  deleteParticipant(pt: Participant) {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer ce participant ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (pt.idParticipant!)
          this.participantService.deleteParticipant(pt.idParticipant!).subscribe(() => {
            this.loadAll();
            this.msgService.add({ severity: 'success', summary: 'Suppression', detail: 'Participant supprimé' });
          });
      }
    });
  }

  saveParticipant() {
    this.submitted = true;
    if (this.participant.idParticipant) {
      this.participantService.updateParticipant(this.participant).subscribe(() => {
        this.loadAll();
        this.msgService.add({ severity: 'success', summary: 'Mise à jour', detail: 'Participant modifié' });
      });
    } else {
      this.participantService.addParticipant(this.participant).subscribe(() => {
        this.loadAll();
        this.msgService.add({ severity: 'success', summary: 'Ajout', detail: 'Participant ajouté' });
      });
    }
    this.participantDialog = false;
  }

  viewFormations(pt: Participant) {
    if (pt.idParticipant) {
      this.formationService.getFormationsByParticipant(pt.idParticipant).subscribe(f => {
        this.msgService.add({
          severity: 'info',
          summary: 'Formations de ' + pt.prenomParticipant,
          detail: f.map(form => form.titre).join(', ') || 'Aucune formation'
        });
      });
    }
  }
  

  hideDialog() {
    this.participantDialog = false;
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
