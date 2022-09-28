import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})

export class ConnexionComponent {

  constructor(private authService: AuthentificationService, private router: Router) { }

  demandeConnexion(f: NgForm) {
    let email = f.value.email
    this.authService.verificationConnexion(f.value).subscribe(reponse => {
      if (reponse['resultat']) {
        this.authService.connect(email);
        this.router.navigate(['/accueil']);
      }
      else {
        window.alert("Email et/ou mot de passe faux");
        this.router.navigate(['/connexion']);
      }
    });
  }

}

