# Bibliothèque SHANTI

Site des articles publiés par l'association SHANTI, hébergé sur GitHub Pages.
Le site est construit automatiquement par GitHub avec **Jekyll** : il n'y a rien à installer.

## Publier un article : le back-office

L'équipe publie depuis **Pages CMS**, un back-office en ligne gratuit relié à ce dépôt.

1. Allez sur https://app.pagescms.org et connectez-vous avec GitHub.
2. Choisissez le dépôt `bibliotheque`.
3. Rubrique **Articles** > **Ajouter** : remplissez le formulaire, puis **Enregistrer**.
4. L'article apparaît sur le site 1 à 2 minutes plus tard.

Les rubriques **Thèmes** et **Régions** permettent d'ajouter de nouvelles entrées : elles apparaissent aussitôt dans les listes déroulantes du formulaire. Un thème sans article n'est pas affiché dans les filtres du site.

**Dans le texte d'un article :**
- une citation : bouton « citation », avec le nom de la personne sur une dernière ligne séparée ;
- une légende de photo : une ligne en *italique* juste sous la photo ;
- un brouillon : décochez « Publié ».

**Inviter un membre de l'équipe :** depuis Pages CMS (réglages du dépôt > collaborateurs), par simple e-mail, même sans compte GitHub. Ou via GitHub : **Settings > Collaborators**.

Le fichier `.pages.yml` contient la configuration du back-office. `MODELE-ARTICLE.md` sert à publier sans le back-office, directement dans GitHub.

## Charte graphique

Le site suit la charte SHANTI (2021) :

- **Couleurs** : bleu foncé `#001F92`, bleu clair `#A6D6F5`, blanc. Elles sont en haut de `assets/css/style.css` (bloc `:root`).
- **Police** : Galatea, hébergée dans `assets/fonts` (8 graisses, format .woff2).
- **Logos** : `assets/img/logo-shanti-bleu.png` (en-tête) et `logo-shanti-blanc.png` (pied de page).
- **Formes libres** (rectangles, trames, arcs) : `_includes/formes.html`. Elles n'ont qu'une couleur (blanc sur bleu foncé ou sur bleu clair) et occupent leur propre espace, jamais sous du texte.
- **Règles de couleur** : sur bleu foncé, uniquement du blanc. Bleu clair et blanc peuvent se combiner. Le bleu foncé peut aller sur du bleu clair, jamais l'inverse.
- **Photos** : tant qu'un article n'a pas d'image, un cadre « [photo] » s'affiche à sa place. Format conseillé : paysage, 1600 px de large minimum.
- **Nom de la page** : `title` et `tagline` dans `_config.yml`.

## Mettre le site en ligne

1. Créez un dépôt **public** sur GitHub (ex. `bibliotheque`).
2. Décompressez le zip, **entrez dans le dossier**, sélectionnez **tout son contenu** (Ctrl+A) et glissez-le dans **Add file > Upload files**. Ne glissez pas le dossier lui-même.
3. **Commit changes**.
4. **Settings > Pages** : « Deploy from a branch », branche **main**, dossier **/ (root)**, **Save**.
5. Attendez la coche verte dans l'onglet **Actions**, puis ouvrez l'adresse indiquée dans Settings > Pages.

L'adresse du site est détectée automatiquement : il n'y a rien à modifier dans `_config.yml`, ni pour `pseudo.github.io/nom-du-depot`, ni après l'ajout d'un domaine personnalisé.

## Organisation des fichiers

```
_config.yml           Réglages du site
_themes/              Liste des thèmes
_regions/             Liste des régions
.pages.yml            Configuration du back-office
_articles/            Un fichier par article
_layouts/             Gabarits (page, article)
_includes/            Morceaux réutilisés (en-tête, pied, carte…)
assets/css/style.css  Styles et charte
assets/js/            Filtres de la bibliothèque
assets/img/           Logo, favicon, photos des articles
index.html            Page Bibliothèque
```

## Prévisualiser en local (facultatif)

Avec Ruby installé : `gem install jekyll` puis `jekyll serve`, et ouvrez http://localhost:4000.
