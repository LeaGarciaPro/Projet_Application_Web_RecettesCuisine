import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AffichageRecettesComponent } from './affichage-recettes/affichage-recettes.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { FavorisComponent } from './favoris/favoris.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecetteComponent } from './recette/recette.component';
import { RechercheComponent } from './recherche/recherche.component';

const routes: Routes = [
  { path: '', component: AffichageRecettesComponent },
  { path: 'accueil', component: AffichageRecettesComponent },
  { path: 'rechercher', component: RechercheComponent },
  { path: 'favoris', component: FavorisComponent },
  { path: 'recette', component: RecetteComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'details/:recetteid', component: RecetteComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
