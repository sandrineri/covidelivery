# covidelivery
An app for market retailers to list products and enable customers to command and be delivered at home

Première installation : yarn install
Pour lancer le site : yarn start
Pour le mettre en ligne : up
Pour lancer les tests : yarn test

TODO :
- BASES
    [x] Liste de produits, avec prix, quantité, provenances, etc…
    [] Le commerçant peut ajouter de nouveaux produits avec un formulaire

- COMPTE / CONNEXION
    [] Possibilité de se connecter
    [] Une fois connecté, possibilité de passer une commande (ajouter des quantités de chaque produit au panier, puis valider).
    [] Le commerçant peut visualiser les commandes (nom, tel, adresse, produits)

- API :
	[x] User : lister les produits en stock
	[] User : Commander (en passant un tableau d'objets produits, quantité…)
	[] User : Ajouter ses coordonnées de livraison

	[] Seller : lister les commandes (a traiter, déjà traitées)
	[] Seller : marquer une liste de commandes comme traitée
	[] Seller : Ajouter/Modifier/Supprimer un produit (en passant un objet produit, prix, promo….)
		

