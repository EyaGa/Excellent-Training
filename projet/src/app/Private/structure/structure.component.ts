import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Structure } from 'src/app/interfaces/structure';
import { UserDto } from 'src/app/interfaces/user-dto';
import { ApiService } from 'src/app/services/api-sce/api.service';
import { AuthService } from 'src/app/services/auth-sce/auth.service';
import { StructureSceService } from 'src/app/services/structure-sce/structure-sce.service';

@Component({
  selector: 'app-professionals',
  templateUrl: './structure.component.html',
  styleUrl: './structure.component.css',
  providers: [MessageService, ConfirmationService]

})
export class StructureComponent {
  structures: Structure[] = [];
  structureDialog: boolean = false;
  isEditMode: boolean = false;
  selectedStructure: Structure = {} as Structure;

  expanded: boolean = true;

  constructor(
    private structureService: StructureSceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadStructures();
  }

  loadStructures() {
    this.structureService.getAllStructures().subscribe((data: Structure[]) => {
      this.structures = data;
    });
  }

  openNew() {
    this.isEditMode = false;
    this.selectedStructure = {} as Structure;
    this.structureDialog = true;
  }

  editStructure(structure: Structure) {
    this.selectedStructure = { ...structure };
    this.structureDialog = true;
  }

  saveStructure() {
    if (this.isEditMode && this.selectedStructure.idStructure) {
      this.structureService.updateStructure(this.selectedStructure).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Structure modifiée' });
        this.structureDialog = false;
        this.loadStructures();
      });
    } else {
      this.structureService.addStructure(this.selectedStructure).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Structure ajoutée' });
        this.structureDialog = false;
        this.loadStructures();
      });
    }
  }

  deleteStructure(structure: Structure) {
    this.confirmationService.confirm({
      message: `Voulez-vous vraiment supprimer cette structure "${structure.libelleStructure}" ?`,
      accept: () => {
        if (structure.idStructure) {
          this.structureService.deleteStructure(structure.idStructure).subscribe(() => {
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Structure supprimée' });
            this.loadStructures();
          });
        }
      }
    });
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
