import { Component, OnInit } from '@angular/core';
import { Recette } from '../models/Recette';
import { RecettesService } from '../services/recettes.service';

@Component({
  selector: 'app-affichage-recettes',
  templateUrl: './affichage-recettes.component.html',
  styleUrls: ['./affichage-recettes.component.css']
})

export class AffichageRecettesComponent implements OnInit {

  public listeRecette: Recette[] = new Array();

  constructor(private recettesService: RecettesService) { }

  ngOnInit(): void {
    this.getRecettes();
  }

  getRecettes() {
    this.recettesService.getRecettes().subscribe(reponse => {
      this.listeRecette = reponse;
    })
  }

  public icon = 'favorite_border';

  public toggleIcon() {
    if (this.icon === 'favorite_border') {
      this.icon = 'favorite icon';
    } else {
      this.icon = 'favorite_border'
    }
  }

  //<mat-icon id="icone" (click)="toggleIcon()">{{icon}}</mat-icon>
  //https://stackoverflow.com/questions/52076602/to-change-multiple-icons-onclick-in-angular-6

}
