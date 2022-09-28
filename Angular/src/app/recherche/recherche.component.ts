import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Recette } from '../models/Recette';
import { RecettesService } from '../services/recettes.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {

  public listeRecette: Recette[] = new Array();

  constructor(private recettesService: RecettesService, private router: Router) {
  }

  ngOnInit(): void {
  }

  research(f: NgForm) {
    let input = f.value.element;
    let choix = f.value.choix;
    console.log("entrée :" + input);
    console.log("choix :" + choix);
    if (choix === "un") {
      console.log("pb");
      this.getRecettesByNom(input);
    }
    else if (choix === "deux") {
      this.getRecettesByMotCle(input);
    }
    else if (choix === "trois") {
      this.getRecettesByIngredients();
    }
    else if (choix === "quatre") {
      this.getRecettesByAuteur(input);
    }
    else if (choix === "cinq") {
      this.getRecettesByPrix();
    }
    else {
      this.getRecettesByDifficulte(input);
    }
  }

  getRecettesByNom(elementRecherche: any) {
    this.recettesService.getRecettesByNom(elementRecherche).subscribe(reponse => {
      this.listeRecette = reponse;
      console.log(reponse);
    })
  }

  getRecettesByIngredients() {
    this.recettesService.getRecettesByIngrédient().subscribe(reponse => {
      this.listeRecette = reponse;
    })
  }

  getRecettesByMotCle(elementRecherche: any) {
    this.recettesService.getRecettesByMotCle(elementRecherche).subscribe(reponse => {
      this.listeRecette = reponse;
    })
  }

  getRecettesByAuteur(elementRecherche: any) {
    this.recettesService.getRecettesByAuteur(elementRecherche).subscribe(reponse => {
      this.listeRecette = reponse;
    });

  }

  getRecettesByPrix() {

  }

  getRecettesByDifficulte(elementRecherche: any) {
    this.recettesService.getRecettesByDifficulte(elementRecherche).subscribe(reponse => {
      this.listeRecette = reponse;
    });
  }

  console() {
    console.log("bonjour");
  }

}
