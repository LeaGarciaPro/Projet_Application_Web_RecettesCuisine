import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  constructor(private authService: AuthentificationService, private router: Router) { }

  ngOnInit(): void {
  }

  inscription(f: NgForm) {
    let email = f.value.email
    this.authService.inscriptionUtilisateur(f.value).subscribe(reponse => {
      if (reponse['resultat']) {
        this.authService.connect(email);
        this.router.navigate(['/accueil']);
      }
      else {
        this.router.navigate(['/inscription']);
      }
    });
  }

}
