/* Liste des recettes */
app.get("/recettes", (req, res) => {
    console.log("/recettes");
    try {
        db.collection("recettes").find().toArray((err, documents) => {
            res.end(JSON.stringify(documents));
        });
    } catch (e) {
        console.log("Erreur sur /recettes : " + e);
        //méthode pour terminer le processus de réponse
        res.end(JSON.stringify([]));
    }
});

/* Liste des ingrédients */
app.get("/ingredients", (req, res) => {
    console.log("/ingredients");
    try {
        db.collection("ingredients").find().toArray((err, documents) => {
            res.end(JSON.stringify(documents));
        });
    } catch (e) {
        console.log("Erreur sur /ingredients : " + e);
        //méthode pour terminer le processus de réponse
        res.end(JSON.stringify([]));
    }
});

/* Connexion */
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