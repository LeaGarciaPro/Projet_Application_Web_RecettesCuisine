mongoimport --db BDDMEAN --collection ingredients --file ingredients.json --jsonArray --drop
mongoimport --db BDDMEAN --collection recettes --file recettes.json --jsonArray --drop
mongoimport --db BDDMEAN --collection utilisateurs --file utilisateurs.json --jsonArray --drop
mongoimport --db BDDMEAN --collection avis --file avis.json --jsonArray --drop
