const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Content-type', 'application/json');
    next();
});

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;
const url = "mongodb://localhost:27017";

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    let db = client.db("BDDMEAN");

    /* PARTIE GENERALE*/

    //Connexion
    app.post("/connexion", (req, res) => {
        console.log("/connexion avec " + JSON.stringify(req.body));
        try {
            db.collection("utilisateurs")
                .find(req.body)
                .toArray((err, documents) => {
                    if (documents.length == 1)
                        res.end(JSON.stringify({ "resultat": 1, "message": "Authentification réussie" }));
                    else res.end(JSON.stringify({ "resultat": 0, "message": "Email et/ou mot de passe incorrect" }));
                });
        } catch (e) {
            res.end(JSON.stringify({ "resultat": 0, "message": e }));
        }
    });

    //Inscription
    app.post("/inscription", (req, res) => {
        console.log("/inscription avec " + JSON.stringify(req.body));
        try {
            db.collection("utilisateurs")
                .insertOne(req.body, (err, result) => {
                    if (result) {
                        res.end(JSON.stringify({ "resultat": 1, "message": "Inscription réussie" }));
                    } else {
                        res.end(JSON.stringify({ "resultat": 0, "message": "Inscription échouée" }));
                    }
                });
        } catch (e) {
            console.log(e);
        }

    });

    //Récupération des données d'un utilisateur
    //attention à ce que l'on renvoie (tableau d'objets json ou un seul objet, car pour y accéder côté client c'est différent!)
    app.get("/utilisateur/donnees/:email", (req, res) => {
        let email2 = req.params.email;
        console.log("/utilisateur/donnees/" + email2);
        try {
            db.collection("utilisateurs")
                .findOne({ "email": email2 }, (err, documents) => {
                    res.end(JSON.stringify(documents));
                });
        } catch (e) {
            console.log("Erreur sur /utilisateurs/donnees/" + email + " : " + e);
            res.end(JSON.stringify([]));
        }
    });

    //Récupération de toutes les recettes pour l'accueil
    app.get("/recettes/liste", (req, res) => {
        console.log("/recettes/liste");
        try {
            db.collection("recettes").find().toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch (e) {
            console.log("Erreur sur /recettes/liste : " + e);
            res.end(JSON.stringify([]));
        }
    });

    /* PARTIE RECHERCHE*/

    //Recherche des recettes par nom entier
    app.get("/recettes/bynom/:nomrecette", (req, res) => {
        let nomRecette = req.params.nomrecette;
        console.log("/recettes/bynom/" + nomRecette);
        try {
            db.collection("recettes").find({ nom: nomRecette }).toArray((err, documents) => {
                res.end(JSON.stringify(documents));
                console.log(JSON.stringify(documents));
            });
        } catch (e) {
            console.log("Erreur sur /recettes/bynom/" + nomRecette + " : " + e);
            res.end(JSON.stringify([]));
        }
    });

    //Recherche des recettes par mot clé (insensible à la casse)
    app.get("/recettes/bymotcle/:nomrecette", (req, res) => {
        let nomRecette = req.params.nomrecette;
        console.log("/recettes/bymotcle/" + nomRecette);
        try {
            db.collection("recettes").find({ "nom": { '$regex': '.*' + nomRecette + '.*', '$options': 'i' } }).toArray((err, documents) => {
                res.end(JSON.stringify(documents));
                console.log(JSON.stringify(documents));
            });
        } catch (e) {
            console.log("Erreur sur /recettes/bymotcle/" + nomRecette + " : " + e);
            res.end(JSON.stringify([]));
        }
    });

    //Recherche des recettes par ingrédients
    app.get("/recettes/byingredients", (req, res) => {
        console.log("/recettes/byingredients");
        try {
            db.collection("recettes").find().toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch (e) {
            console.log("Erreur sur /recettes/byingredients : " + e);
            res.end(JSON.stringify([]));
        }
    });

    //Recherche des recettes par auteur
    app.get("/recettes/byauteur/:nomauteur", (req, res) => {
        let nomauteur2 = req.params.nomauteur;
        console.log("/recettes/byauteur/" + nomauteur2);
        try {
            db.collection("recettes").find({ auteurPseudo: nomauteur2 }).toArray((err, documents) => {
                res.end(JSON.stringify(documents));
                console.log(JSON.stringify(documents));
            });
        } catch (e) {
            console.log("Erreur sur /recettes/byauteur/" + nomauteur2 + " : " + e);
            res.end(JSON.stringify([]));
        }
    });

    //Recherche des recettes par difficulté
    app.get("/recettes/bydifficulte/:difficulte", (req, res) => {
        let difficulte2 = req.params.difficulte;
        console.log("/recettes/bydifficulte/" + difficulte2);
        try {
            db.collection("recettes").find({ difficulte: { '$regex': '.*' + difficulte2 + '.*', '$options': 'i' } }).toArray((err, documents) => {
                res.end(JSON.stringify(documents));
                console.log(JSON.stringify(documents));
            });
        } catch (e) {
            console.log("Erreur sur /recettes/bydifficulte/" + difficulte2 + " : " + e);
            res.end(JSON.stringify([]));
        }
    });

});

app.listen(8888);

