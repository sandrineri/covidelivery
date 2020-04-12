# covidelivery
An app for market retailers to list products and enable customers to command and be delivered at home

Première installation : yarn install
Pour lancer le site : yarn start
Pour le mettre en ligne : up
Pour lancer les tests : yarn test

TODO :
- PETOUILLES
    [x] Réparer la recherche
    [x] mettre des dates par défaut (ex: min: -1 semaine, max: aujourd'hui)
    [x] afficher seulement les petites images par défaut, et afficher les grandes images au clic
        [x] afficher les grandes images via une "lightbox" (plus tard)
    [x] ajouter les dates d'annonces
        [x] modifier l'affichage des dates d'annonces pour dire : "Disponible au..."
    [x] contraindre la taille des images dans les annonces
    [x] récupérer les valeurs de la surface
    [x] permettre la recherche de mots multiples
    [x] récupérer les valeurs de prix achat et location
    [x] réduire le nombre de props dans App.jsx en groupant les props "soeurs".
    [x] modifier les valeurs "en dur" dans le PriceChooser par les variables du state
    [x] donner un nom plus explicite pour MyGoogleMap
    [x] créer un dossier config avec un fichier de variables "globales", pour y mettre
        [x] url de l'api
        [x] la locale utilisée dans google maps et le datechooser
- NOTIFS :
    [x] ajouter un input pour entrer une adresse mail
    [x] ajouter un bouton qui déclenche une fonction qui console.log le mail et le rythme, et les critères actuellement selectionnés
    [x] ajouter un select pour choisir un rythme de notification (1/j, 1/h, 1/s)
        [x] Modifier le select en utilisant react-select
    [x] remplacer le console.log par un appel a l'api d'envoi de mail, en ajoutant le token
- CALENDRIER :
    [x] Modifier le input type=date en utilisant react-datepicker
        [x] Mettre en cohérence les dates début/fin
- RANGE :
    [x] remplacer les elements natif par un composant react a définir
- CARTE :
    [x] afficher une carte google maps
        [x] générer un marker par annonce, avec le titre
        [] afficher les markers en prenant en compte la géolocalisation des annonces (pas encore fait côté API)
- ARRONDISSEMENTS :
    [x] corriger le bug quand on retire tous les arrondissements [S]
    [x] rendre actif le select d'arrondissement, en utilisant le parametre d'api "cp" [S]
- FOURNISSEURS :
    [x] ajouter un filtre de sources d'annonces, en utilisant le parametre d'api "providers" (seulement seloger pour le moment) [S]
- AUTHENTIFICATION :
    [x] permettre a un utilisateur de se loguer
- PAGINATION :
    [x] Ads : récupérer le total, en déduire le nombre de pages
    [x] Pagination : prendre le total de resultats et la position en props
        [x] afficher une liste de chiffres correspondant aux pages
        [x] au clic sur un chiffre, faire un set de la variable de state de position
    [x] Ads : créer une variable de state qui stocke notre position (page/resultats)
    [x] Ads : rejouer le useEffect si la variable de state de position est modifiée
    [] Optionnel : créer une variable de state pour "size", afin de rendre le nombre de resultats par page parametrable par l'utilisateur
- TESTS :
    [x] ajouter des tests unitaires
- i18n :
    [] Optionnel : i18n



    BOITE A IDEES :
    - Classer les annonces de la plus récente à la plus ancienne [J]