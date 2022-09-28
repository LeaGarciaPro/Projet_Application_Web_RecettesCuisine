import { Component, OnInit } from '@angular/core';
import { Recette } from '../models/Recette';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})
export class FavorisComponent implements OnInit {

  public listeRecette: Recette[] = new Array();

  constructor() { }

  ngOnInit(): void {
  }

}
