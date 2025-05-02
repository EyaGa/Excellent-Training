import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Role } from 'src/app/interfaces/role';
import { User } from 'src/app/interfaces/user';
import { UserDto } from 'src/app/interfaces/user-dto';
import { ApiService } from 'src/app/services/api-sce/api.service';
import { AuthService } from 'src/app/services/auth-sce/auth.service';
import { RoleSceService } from 'src/app/services/role-sce/role-sce.service';
import { UserSceService } from 'src/app/services/user-sce/user-sce.service';

@Component({
  selector: 'app-professionals',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  providers: [MessageService, ConfirmationService]

})
export class UsersComponent {
 /* users: User[] = [];  // Utilisation de User
  dialog: boolean = false;
  current: User = {
    login: '',
    mdp: '',
    enabled: false,
    role: { idRole: 0, nomRole: 'default' }  // Rôle par défaut, vous pouvez ajuster selon votre logique
  };  // Modèle User
  submitted: boolean = false;
  expanded: boolean = true;

  constructor(
    private userService: UserSceService,
    private msg: MessageService,
    private confirm: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((u: User[]) => this.users = u);  // Typage explicite avec User[]
  }

  openNew(): void {
    this.current = { login: '', mdp: '', enabled: false, role: { idRole: 0, nomRole: 'default' } };  // Initialisation complète de current
    this.submitted = false;
    this.dialog = true;
  }

  edit(user: User): void {
    this.current = { ...user };  // Copier les données de l'utilisateur pour l'édition
    this.dialog = true;
  }

  delete(user: User): void {
    this.confirm.confirm({
      message: 'Supprimer cet utilisateur ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (user.idUser) {  // Vérification de l'id de l'utilisateur avant suppression
          this.userService.deleteUser(user.idUser).subscribe(() => {
            this.loadUsers();  // Recharger les utilisateurs après suppression
            this.msg.add({ severity: 'success', summary: 'Supprimé', detail: 'Utilisateur supprimé' });
          });
        }
      }
    });
  }

  save(): void {
    this.submitted = true;
    if (this.current.idUser) {  // Mise à jour d'un utilisateur existant
      this.userService.updateUser(this.current.idUser, this.current).subscribe(() => {
        this.loadUsers();
        this.msg.add({ severity: 'success', summary: 'Modifié', detail: 'Utilisateur mis à jour' });
        this.dialog = false;
      });
    } else {  // Ajout d'un nouvel utilisateur
      this.userService.addUtilisateur(this.current).subscribe(() => {
        this.loadUsers();
        this.msg.add({ severity: 'success', summary: 'Ajouté', detail: 'Utilisateur ajouté' });
        this.dialog = false;
      });
    }
  }

  hideDialog(): void {
    this.dialog = false;
    this.submitted = false;
  }

  toggleSidebar(): void {
    this.expanded = !this.expanded;
    const c = document.querySelector('.container');
    if (c) c.classList.toggle('sidebar-collapsed', !this.expanded);
  }*/
}
