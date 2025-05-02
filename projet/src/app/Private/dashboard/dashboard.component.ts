import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Observable, of, forkJoin, tap, catchError, throwError } from 'rxjs';
import { Role } from 'src/app/interfaces/role';
import { User } from 'src/app/interfaces/user';
import { UserDto } from 'src/app/interfaces/user-dto';
import { ApiService } from 'src/app/services/api-sce/api.service';
import { AuthService } from 'src/app/services/auth-sce/auth.service';
import { RoleSceService } from 'src/app/services/role-sce/role-sce.service';
import { UserSceService } from 'src/app/services/user-sce/user-sce.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [MessageService, ConfirmationService]

})
export class DashboardComponent {

  userData: UserDto[] = [];
  users: UserDto[] = [];
  userDialog: boolean = false;
  selectedUser: UserDto | undefined;
  expanded: boolean = true;
  userRolesMap: { [idUser: number]: Role } = {};
roles: Role[] = [];


  constructor(
    private msgService: MessageService,
    private userService: UserSceService,
    private confirmationService: ConfirmationService,
    private roleService:RoleSceService,

  ) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe((data: UserDto[]) => {
      this.users = data;
    });

    this.userService.getAllUsers().subscribe((data: UserDto[]) => {
      this.users = data;
  
      // Initialiser les rôles si besoin
      this.users.forEach(u => {
        this.userService.getUserRole(u.login).subscribe(role => {
          this.userRolesMap[u.idUser!] = role;
        });
      });
    });
  
    this.roleService.getAllRoles().subscribe(data => this.roles = data);
  }

  handleError(error: any): Observable<never> {
    console.error('Error retrieving users:', error);
    return throwError('An error occurred while fetching users.');
  }

  deleteUser(selectedUser: UserDto | undefined): void {
    if (!selectedUser) {
      console.error('Utilisateur non sélectionné');
      return;
    }

    this.confirmationService.confirm({
      message: `Êtes-vous sûr de vouloir supprimer ${selectedUser.login}?`,
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(selectedUser.idUser!).subscribe(
          () => {
            this.users = this.users.filter(u => u.idUser !== selectedUser.idUser);
            this.msgService.add({ severity: 'success', summary: 'Succès', detail: 'Utilisateur supprimé avec succès' });
          },
          error => {
            console.error('Failed to delete user:', error);
            this.msgService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la suppression de l\'utilisateur' });
          }
        );
      }
    });
  }
  updateUserRole(user: UserDto, newRole: Role): void {
    const updatedUser: User = {
      idUser: user.idUser,
      login: user.login,
      mdp: user.mdp,
      role: newRole
    };
  
    this.userService.updateUser(user.idUser!, updatedUser).subscribe({
      next: () => {
        this.userRolesMap[user.idUser!] = newRole;
        this.msgService.add({ severity: 'success', summary: 'Succès', detail: 'Rôle mis à jour' });
      },
      error: err => {
        console.error('Erreur mise à jour rôle :', err);
        this.msgService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la mise à jour du rôle' });
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

  onRejectDelete() {
    }

    editDialogVisible: boolean = false;
selectedRole: Role = {} as Role;

openEditDialog(user: UserDto): void {
  this.selectedUser = { ...user };
  this.selectedRole = this.userRolesMap[user.idUser!];
  this.editDialogVisible = true;
}

hideEditDialog(): void {
  this.editDialogVisible = false;
  this.selectedUser = {} as UserDto;
  this.selectedRole = {} as Role;
}

saveUserRole(): void {
  if (!this.selectedUser || !this.selectedUser.idUser) {
    this.msgService.add({ severity: 'error', summary: 'Erreur', detail: 'Utilisateur non sélectionné' });
    return;
  }

  const updatedUser: User = {
    idUser: this.selectedUser.idUser,
    login: this.selectedUser.login,
    mdp: this.selectedUser.mdp,
    role: this.selectedRole
  };

  this.userService.updateUser(this.selectedUser.idUser, updatedUser).subscribe({
    next: () => {
      this.msgService.add({ severity: 'success', summary: 'Succès', detail: 'Rôle mis à jour' });
      this.userRolesMap[this.selectedUser!.idUser!] = this.selectedRole;
      this.hideEditDialog();
    },
    error: () => {
      this.msgService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la mise à jour du rôle' });
    }
  });
}


}
