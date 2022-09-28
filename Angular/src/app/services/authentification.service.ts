import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { User } from '../User';

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

//classe qui contient tous les services liés à la connexion, déconnexion de l'utilisateur, j'ai rassemblé tout ici
//on injecte ce service dans les composants qui l'utilisent
export class AuthentificationService {

  constructor(private http: HttpClient) { }

  //variable dans laquelle on va stocker une unique valeur, l'email de l'utilisateur
  //si elle est remplie, elle contient l'email de celui qui est connecté
  public user: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public baseURL: string = "http://localhost:8888";

  //méthode appelée lorsque l'on reçoit une réponse positive de la vérification des identifiants (demandé par connexion), 
  //de la part du serveur, elle remplie la variable user avec l'email de la personne connectée
  //appel : this.authService.connect(f.value.email);
  connect(email: string) {
    this.user.next(email);
  }

  //vide la variable user contenant l'email de la personne connectée
  //méthode appelée lorsque l'on clique sur le bouton de déconnexion
  disconnect() {
    this.user.next("");
  }

  //méthode appelée lors d'une demande de connexion, envoie les informations (email et mdp) fournis au serveur pour vérification
  verificationConnexion(identifiants: any): Observable<any> {
    return this.http.post(this.baseURL + '/connexion', JSON.stringify(identifiants), httpOptions);
  }

  //méthode horrible que j'ai mis mille ans à écrire pour aucune raison
  boolUserConnected() {
    if (this.user.value === "" || this.user.value === null || this.user.value === undefined) {
      return false;
    }
    else {
      return true;
    }
  }

  //méthode pour récupérer l'utilisateur
  getUser() {
    return this.user.getValue();
  }

  //méthode pour l'inscription
  inscriptionUtilisateur(data: any): Observable<any> {
    return this.http.post(this.baseURL + '/inscription', JSON.stringify(data), httpOptions);
  }

  public userData: User = new User;

  //méthode pour récupérer les données de l'utilisateur à partir de son adresse mail
  getUtilisateur(email: string) {
    this.http.get<User>(this.baseURL + '/utilisateur/donnees/' + email).subscribe(reponse => {
      this.userData = reponse;
      console.log(reponse);
    })
    return this.userData;
  }

}
