# covidelivery
Une application permettant aux commerçants de proposer leurs produits et à leurs clients habituels de commander et d'être livrés à domicile ou à un emplacement autorisé
An app for market retailers to list products and enable customers to command and be delivered at home or at authorized places

___________
Première installation : yarn install
Pour lancer le site : yarn start
Pour le mettre en ligne : up
Pour lancer les tests : yarn test

___________
TODO :

[] PROBLEME GIT !!!!!!!

- PETOUILLES :
	[x] Cacher le bouton de commande tant que l'on n'est pas connecté
	[x] Ne pas envoyer la commande pour un panier vide (message d'alerte)
	[] Champs "required"
	[] Autocomplete
	[] Sur modifyCategory, si parentId vide (""), crée une nouvelle catégorie (qui sera vide à l'affichage)
	- Revoir l'arborescence
		[] Séparer orders et order
		[] Voir les commandes depuis SellerPage ?

- ACCUEIL
	[x] visualiser la liste des produits, avec prix, quantité, provenances, etc…

- COMPTE / CONNEXION
	[x] Gérer les autorisations
	[] S'inscrire et navigation
    [] Possibilité de se connecter

    Une fois connecté :
	- CLIENT : 
	[] Le client peut créer son compte en indiquant ses coordonnées de livraison (nom, adresse, téléphone, complément d'infos (digicode...) <!-- moyen de paiement ?, -->)
	[] Le client peut modifier les infos de son compte
	- COMMERCANT :
	[] Le commerçant peut créer son compte et le modifier

- PAGES VENDEUR
	- GESTION DES PRODUITS :
	[x] Le commerçant peut ajouter de nouveaux produits avec un formulaire
	[x] Le comerçant peut modifier un produit
	[x] Le commerçant peut modifier plusieurs produits (ex: plusieurs prix...)
	[x] Le commerçant peut supprimer un produit
	[x] Le commerçant peut créer une nouvelle catégorie de produits

	- TRAITEMENT DES COMMANDES :
	[x] Le commerçant peut visualiser la liste des commandes (date de la commande, noms des clients, leurs adresses... ) où il peut sélectionner une commande à traiter
	[x] Le commerçant peut visualiser une commande avec les informations sur le client (nom, tel, adresse...) et les produits commandés (libellé, quantité...)
	[] Le commerçant peut imprimer la liste des commandes et chaque commande (créer un pdf)
	[x] Le commerçant peut informer l'API qu'une commande est traitée

- PAGES CLIENT
	[x] Le client peut visualiser la liste des produits et les boutons de validation
	[x] Le client peut passer une commande (ajouter des quantités de chaque produit, puis valider)
	[] Le client peut visualiser sa commande

_______________________
- API :
	[] User : lister les produits en stock
	[] User : Commander (en passant un tableau d'objets produits, quantité…)
	[] User : Ajouter ses coordonnées de livraison

	[] Seller : lister les commandes (a traiter, déjà traitées)
	[] Seller : marquer une liste de commandes comme traitée
	[] Seller : Ajouter/Modifier/Supprimer un produit (en passant un objet produit, prix, promo….)
		

