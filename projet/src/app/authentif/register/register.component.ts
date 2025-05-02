import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/interfaces/user';
import { ApiService } from 'src/app/services/api-sce/api.service';
import { passwordMatchValidator } from 'src/app/shared/password-match.directive';
import { CurrencyPipe } from '@angular/common';
import { UserSceService } from 'src/app/services/user-sce/user-sce.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [CurrencyPipe], 

})
export class RegisterComponent {
  
  isResponsable: boolean = false;
  isUtilisateur: boolean = true;
  showPassword: boolean = false;

  registerForm = this.fb.group({
    login: ['', [Validators.required, Validators.email]],
    mdp: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, {
    validators: passwordMatchValidator
  });

  role: string = 'utilisateur';

  constructor(
    private fb: FormBuilder,
    private userService: UserSceService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {}

  // Toggle entre Responsable et Utilisateur
  toggleResponsable() {
    this.isResponsable = true;
    this.isUtilisateur = false;
    this.role = 'responsable';
  }

  toggleUtilisateur() {
    this.isResponsable = false;
    this.isUtilisateur = true;
    this.role = 'utilisateur';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  // Getters pour les champs du form (adaptés)
  get email() {
    return this.registerForm.controls['login'];
  }

  get password() {
    return this.registerForm.controls['mdp'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const newUser: User = {
      login: this.registerForm.value.login!,
      mdp: this.registerForm.value.mdp!,
      role: {
        idRole: this.role === 'responsable' ? 2 : 1,
        nomRole: this.role === 'responsable' ? 'Responsable' : 'Utilisateur' // Ajout du nomRole
      }

    };

    if (this.isResponsable) {
      this.userService.addResponsable(newUser).subscribe(() => {
        this.messageService.add({severity: 'success', summary: 'Succès', detail: 'Inscription réussie. Un e-mail de confirmation vous a été envoyé.'});
        this.router.navigate(['/login']);
      });
    } else {
      this.userService.addUtilisateur(newUser).subscribe(() => {
        this.messageService.add({severity: 'success', summary: 'Succès', detail: 'Inscription réussie. Un e-mail de confirmation vous a été envoyé.'});
        this.router.navigate(['/login']);
      });
    }
  }

/*
onImageUpload(event: any) {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("image", file);

  this.apiService.uploadImage(formData).subscribe(
      (response: any) => {
          const imageUrl = this.apiService.getImageUrl(response.imageUrl);
          this.registerForm.patchValue({ imageUrl });
          console.log("Image uploaded successfully:", imageUrl);
      },
      (error) => {
          console.error("Error uploading image:", error);
      }
  );
}

private updateFormControlValue() {
    const montantControl = this.registerForm.get('montant') as FormControl;
    montantControl.setValue(this.montantValue);
}
  
    convertMontant() {
      const montantControl = this.registerForm.get('montant');
      if (montantControl && montantControl.value!== null) {
        const montant = montantControl.value;
        // Convertir le résultat de transform en nombre
        this.convertedMontant = Number(this.currencyPipe.transform(montant, 'EUR', '1.2-2'));
      }
    }

  toggleProfessional() {
    this.role = this.role === 'client'? 'professionnel' : 'client';

    this.isProfessional = !this.isProfessional;
    this.isClient = false;
    if (!this.isProfessional) {
      this.registerForm.get('categorieprofessionnelle')?.clearValidators();
      this.registerForm.get('specialite')?.clearValidators();
      this.registerForm.get('montant')?.clearValidators();
    } else {
      this.registerForm.get('categorieprofessionnelle')?.setValidators(Validators.required);
      this.registerForm.get('specialite')?.setValidators(Validators.required);
      this.registerForm.get('montant')?.setValidators(Validators.required);
    }
    this.registerForm.get('categorieprofessionnelle')?.updateValueAndValidity();
    this.registerForm.get('specialite')?.updateValueAndValidity();
    this.registerForm.get('montant')?.updateValueAndValidity();
  }
  toggleClient() {
    this.role = this.role === 'client'? 'professionnel' : 'client';
    this.isClient = true;
    this.isProfessional = false;
  }

  convertToEuros(montant: number): number {
    return montant * 0.29604788; 
  }
  
  validateMontant(): boolean {
  const montantControl = this.registerForm.get('montant');
  if (!montantControl) {
    // Gestion du cas où le contrôle n'existe pas
    console.error('Le contrôle de montant n\'existe pas dans le formulaire.');
    return false;
  }
  const montant = montantControl.value!;
  return montant > 0;
}

  submitDetails() {
    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;
    const endpoint = this.isProfessional ? 'addProfessional' : 'addClient';
    if(this.isProfessional){
    if (!this.validateMontant() ) {
      alert('Le montant doit être supérieur à zéro.');
      return;
    }}
    this.apiService[endpoint](postData as User).subscribe(
      (response: any) => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Inscription réussie', detail: 'Un e-mail de confirmation vous a été envoyé.' });
        this.router.navigate(['login']);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status === 409) {
          this.messageService.add({ severity: 'error', summary: 'Inscription échouée', detail: 'Cet email est déjà utilisé. Veuillez essayer avec une autre adresse email.' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Inscription échouée', detail: `Votre inscription n'a pas pu être complétée en raison d'une erreur survenue. Veuillez réessayer ultérieurement.` });
        }
      }
    );
  }

  specialites: string[] = ['Sélectionnez votre spécialité'];
  onCategorieProfessionnelleChange(event: Event) {
    const target = event.target as HTMLSelectElement; // Cast to HTMLSelectElement
    if (target) {
      const categorieProfessionnelle = target.value;
      const profession = this.professionService.getProfessionByTitle(categorieProfessionnelle);
      if (profession) {
        const specialites = profession.items[0].specialites.map((s: any) => s.nom); // Specify type for 's'
        console.log('Specialites:', specialites); // Debugging line
        this.registerForm.get('specialite')?.setValue(''); // Use optional chaining to avoid null errors
        this.specialites = specialites;
      }
    }
  }
  
  fields = [
    {
      name: 'prenom',
      label: 'Prenom',
      type: 'text',
      placeholder: 'Insérez votre prénom',
      formControl: this.registerForm.get('prenom')
    },
    {
      name: 'nom',
      label: 'Nom',
      type: 'text',
      placeholder: 'Insérez votre nom',
      formControl: this.registerForm.get('nom')
    },
    {
      name: 'dob',
      label: 'Date de naissance',
      type: 'text',
      placeholder: 'Insérez votre date de naissance',
      formControl: this.registerForm.get('dob')
    },
    {
      name: 'sexe',
      label: 'Sexe',
      type: 'radio',
      options: [
        { label: 'Homme', value: 'homme' },
        { label: 'Femme', value: 'femme' }
      ],
      formControl: this.registerForm.get('sexe')
    },
    {
      name: 'tel',
      label: 'Numéro de téléphone',
      type: 'text',
      placeholder: 'Insérez votre numéro de téléphone',
      formControl: this.registerForm.get('tel')
    },
    {
      name: 'adresse',
      label: 'Adresse',
      type: 'text',
      placeholder: 'Insérez votre adresse',
      formControl: this.registerForm.get('adresse')
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      placeholder: 'Insérez votre email',
      formControl: this.registerForm.get('email')
    },
    {
      name: 'mdp',
      label: 'Mot de passe',
      type: 'password',
      placeholder: 'Insérez votre mot de passe',
      formControl: this.registerForm.get('mdp')
    },
    {
      name: 'confirmPassword',
      label: 'Confirmer le mot de passe',
      type: 'password',
      placeholder: 'Confirmez votre mot de passe',
      formControl: this.registerForm.get('confirmPassword')
    },
  ];
 
  professions = [
    { value: '', label: 'Sélectionnez votre profession' }, // Option par défaut
    { value: 'professions de santé', label: 'Professionnels de santé' },
    { value: 'professions de finance', label: 'Professions de finance' },
    { value: 'professions de rh', label: 'Professions de ressources humaines' },
    { value: 'professions de juridique', label: 'Professions de juridique' },  
    { value: 'professions de bien-être', label: 'Professions de bien-être' },
    { value: 'professions de co et marketing', label: 'Professions de commerce et marketing' },
    { value: 'professions de btp', label: 'Professions de bâtiment et travaux publics' },
    { value: `professions d'art`, label: 'Professions d\'art' },
];*/

}


