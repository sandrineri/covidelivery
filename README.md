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

- PETOUILLES :
	[] orders api : manque téléphone
	[x] Cacher le bouton de commande tant que l'on n'est pas connecté
	[x] Ne pas envoyer la commande pour un panier vide (message d'alerte)
	[] Champs "required"
	[] Autocomplete
	[] Rechargements de pages après envois à l'API
	- Revoir l'arborescence
		[] Séparer orders et order
		[] Voir les commandes depuis SellerPage

- ACCUEIL
	[x] visualiser la liste des produits, avec prix, quantité, provenances, etc…

- COMPTE / CONNEXION
	[x] Gérer les autorisations
	[] S'inscrire et navigation
    [x] Possibilité de se connecter

    Une fois connecté :
	- CLIENT : 
	[x] Le client peut créer son compte en indiquant ses coordonnées de livraison (nom, adresse, téléphone, mail, complément d'infos (digicode...) <!-- moyen de paiement ?, -->)
	[x] Le client peut modifier les infos de son compte
	- COMMERCANT :
	[] Le commerçant peut accéder aux pages vendeur

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
	[x] Le client peut visualiser et utiliser les boutons de validation de sa commande sur la page produits
	[x] Le client peut passer une commande (ajouter des quantités de chaque produit, puis valider)
	[] Le client peut visualiser sa commande




Non connecté sur la page principale :
-> A besoin d'un bouton connecter / s'inscrire
//Non connecté sur une autre page :
//-> Connexion auto via Auth0

Connecté en tant que client :
-> On affiche un bouton se déconnecter + bouton commande
Connecté en tant que vendeur :
-> On affiche trois boutons dynamiques (deux à la fois) + bouton se déconnecter

- Finir les pétouilles de navigation/connexion [S]
- [x] Lorsque une requête est envoyée à l'API, si l'utilisateur n'existe pas mais que son token est reconnu par Auth0, créer l'utilisateur [J]
- Créer les comptes en mode "inactif" par défaut [J]
- [x] Pouvoir modifier ses coordonnées [S/J]