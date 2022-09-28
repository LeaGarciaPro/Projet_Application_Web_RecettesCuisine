export interface Recette {
    nom: String,
    type: String
    temps: String,
    difficulte: String,
    prix: number,
    nbPersonnes: number,
    datePubli: String,
    //on recopie, si on veut ses informations on fait une jointure
    auteurPseudo: String,
    //      [ [objet ingredient entier, quantité], [objet ingredient entier, quantité]]
    ingredients: any[]
    description: String
}