# Bibliothèque SHANTI

Site des articles publiés par l'association SHANTI, hébergé sur GitHub Pages.
Le site est construit automatiquement par GitHub avec **Jekyll** : il n'y a rien à installer.

## Publier un article (sans rien installer)

1. Dans le dépôt sur GitHub, ouvrez le dossier `_articles`.
2. Cliquez sur **Add file > Create new file**.
3. Nommez le fichier `AAAA-MM-JJ-titre-court.md` (ex. `2026-10-03-atelier-tissage-nefta.md`).
4. Copiez le contenu de `MODELE-ARTICLE.md`, remplissez les champs et écrivez l'article.
5. Pour une photo : ouvrez `assets/img/articles`, **Add file > Upload files**, puis indiquez son chemin dans le champ `image`.
6. Cliquez sur **Commit changes**. L'article apparaît dans la bibliothèque en 1 à 2 minutes (suivi dans l'onglet **Actions**).

L'article est automatiquement ajouté à la bibliothèque, trié par date, et filtrable par catégorie, région et année.

### Les champs d'un article

| Champ | Obligatoire | Rôle |
|---|---|---|
| `title` | oui | Titre |
| `date` | oui | Date de publication (AAAA-MM-JJ), sert au tri et au filtre « Année » |
| `categorie` | oui | Un `slug` de `_data/categories.yml` |
| `region` | oui | Alimente le filtre « Région » (orthographe identique d'un article à l'autre) |
| `resume` | conseillé | Texte de la carte et chapô |
| `image`, `image_alt` | conseillé | Photo principale et sa description (sans image : cadre « [photo] ») |
| `auteur`, `mots_cles`, `image_credit` | non | Informations complémentaires |

Pour masquer un article sans le supprimer, ajoutez `published: false`.

## Modifier les catégories

Éditez `_data/categories.yml`. L'ordre du fichier est l'ordre des boutons.
Si vous changez un `slug`, mettez à jour les articles qui l'utilisent.

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
_data/categories.yml  Liste des catégories
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
