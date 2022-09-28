import { Component, getNgModuleById, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {

  constructor(private authService: AuthentificationService, private router: Router) { }

  //fonction appelée si on recherche (appelée à l'initialisation du composant)
  ngOnInit(): void {
  }

  deconnexion() {
    this.authService.disconnect();
    this.router.navigate(['/accueil']);
  }

  isConnected() {
    return this.authService.boolUserConnected();
  }

}
