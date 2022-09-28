import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Methods": "GET,POST",
    "Access-Control-Allow-Headers": "Content-type",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  })
};

@Injectable({
  providedIn: 'root'
})

export class RecettesService {

  constructor(private http: HttpClient) { }

  public baseURL: string = "http://localhost:8888";

  //méthode pour récupérer toutes les recettes de l'application
  getRecettes(): Observable<any> {
    return this.http.get(this.baseURL + '/recettes/liste');
  }

  //méthode pour récupérer les recettes par leur nom (égalité entière)
  getRecettesByNom(nom: String): Observable<any> {
    return this.http.get(this.baseURL + '/recettes/bynom/' + nom);
  }

  getRecettesByMotCle(nom: String): Observable<any> {
    return this.http.get(this.baseURL + '/recettes/bymotcle/' + nom);
  }

  getRecettesByIngrédient(): Observable<any> {
    return this.http.get(this.baseURL + '/recettes/byingredients');
  }

  getRecettesByAuteur(auteur: String): Observable<any> {
    return this.http.get(this.baseURL + '/recettes/byauteur/' + auteur);
  }

  getRecettesByDifficulte(auteur: String): Observable<any> {
    return this.http.get(this.baseURL + '/recettes/bydifficulte/' + auteur);
  }



}

