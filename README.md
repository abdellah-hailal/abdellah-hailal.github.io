# Portfolio d'Abdellah Hailal (« Cause et effet »)

Site statique en HTML, CSS et JavaScript natifs. Aucune dépendance, aucune étape de compilation.

## Structure

```
portfolio/
├── index.html              Page principale
├── 404.html                Page d'erreur
├── assets/
│   ├── css/styles.css      Styles (mobile d'abord, thèmes clair et sombre)
│   ├── js/main.js          Graphe causal, visionneuse, copie de l'adresse
│   ├── fonts/              Schibsted Grotesk et Newsreader (hébergées localement)
│   └── img/
│       ├── favicon.svg
│       ├── projets/        Captures d'écran des projets (WebP, deux tailles chacune)
│       └── og-image.png    Aperçu lors du partage (1200 × 630)
├── CNAME                   Domaine personnalisé (hailal.com) pour GitHub Pages
├── robots.txt
├── sitemap.xml
└── .nojekyll               Empêche GitHub Pages de traiter le site avec Jekyll
```

## Tester en local

Depuis le dossier `portfolio` :

```bash
python -m http.server 8000
```

Puis ouvrir http://localhost:8000.

## Mettre le site en ligne sur hailal.com

Le site est configuré pour l'adresse `https://hailal.com/`. Le fichier `CNAME` (qui contient `hailal.com`) indique à GitHub Pages quel domaine servir. Il doit rester à la racine du dépôt.

### 1. Déposer le site sur GitHub

1. Sur GitHub, créer un dépôt **public** nommé `abdellah-hailal.github.io` (sans README, ni .gitignore, ni licence).
2. Depuis le dossier `portfolio` :
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Premier déploiement du portfolio"
   git branch -M main
   git remote add origin https://github.com/abdellah-hailal/abdellah-hailal.github.io.git
   git push -u origin main
   ```

### 2. Activer GitHub Pages

1. Dans le dépôt : Settings, puis Pages.
2. Source : « Deploy from a branch », branche `main`, dossier `/ (root)`, puis Save.
3. Section « Custom domain » : vérifier qu'elle affiche `hailal.com` (lu depuis le fichier `CNAME`). Sinon, saisir `hailal.com` et cliquer sur Save.

### 3. Configurer le DNS chez le registraire de hailal.com

Dans la zone DNS du domaine, supprimer les anciens enregistrements A, AAAA et CNAME de `@` et de `www` (par exemple une page de stationnement), puis ajouter :

| Type  | Nom   | Valeur                      |
|-------|-------|-----------------------------|
| A     | @     | 185.199.108.153             |
| A     | @     | 185.199.109.153             |
| A     | @     | 185.199.110.153             |
| A     | @     | 185.199.111.153             |
| AAAA  | @     | 2606:50c0:8000::153         |
| AAAA  | @     | 2606:50c0:8001::153         |
| AAAA  | @     | 2606:50c0:8002::153         |
| AAAA  | @     | 2606:50c0:8003::153         |
| CNAME | www   | abdellah-hailal.github.io   |

Ces adresses sont celles publiées par GitHub pour Pages. Les comparer une fois avec la page « Managing a custom domain for your GitHub Pages site » de la documentation GitHub avant de les enregistrer.

Ne pas ajouter d'enregistrement générique (`*`).

### 4. Activer HTTPS

La propagation DNS prend de quelques minutes à 24 heures. Quand Settings, Pages affiche « DNS check successful », cocher **Enforce HTTPS**. Le certificat peut prendre jusqu'à une heure à apparaître.

`www.hailal.com` redirige ensuite automatiquement vers `hailal.com`.

### 5. Sécuriser le domaine (recommandé)

Dans les paramètres du compte GitHub (Settings, Pages, « Add a domain »), vérifier `hailal.com` en ajoutant l'enregistrement TXT demandé. Cela empêche un autre compte GitHub d'utiliser ton domaine.

### Vérifier

```bash
dig hailal.com +short        # doit afficher les quatre adresses 185.199.x.153
dig www.hailal.com +short    # doit afficher abdellah-hailal.github.io
```

## Héberger ailleurs (Vercel ou Netlify)

Importer le dépôt ou glisser le dossier `portfolio` dans l'interface, sans commande de build et avec la racine comme dossier de sortie. Ajouter ensuite `hailal.com` comme domaine dans leur tableau de bord et suivre leurs propres valeurs DNS (le fichier `CNAME` est alors inutile).

## Mettre à jour le contenu

Tout le texte se trouve dans `index.html`. Chaque projet est un bloc `<article class="case">` : copier un bloc existant pour en ajouter un nouveau.

Pour changer les couleurs, modifier les variables au début de `assets/css/styles.css` (bloc `:root` pour le thème clair, bloc `prefers-color-scheme: dark` pour le thème sombre). Vérifier le contraste (au moins 4,5:1 pour le texte) après chaque changement.

Après une modification, mettre à jour la date `lastmod` dans `sitemap.xml`.

## Ajouter ou remplacer une capture d'écran

Chaque capture existe en deux tailles WebP dans `assets/img/projets/` : la largeur d'origine (affichée dans la visionneuse) et la moitié (affichée dans la page). Garder les attributs `width` et `height` égaux aux dimensions d'origine pour éviter les décalages de mise en page, et décrire l'écran dans l'attribut `alt`.

## Direction visuelle

Les décisions de design (couleurs, typographies, espacements, mouvement) sont décrites dans `DESIGN.md`.

Le graphe du héros est écrit directement en SVG dans `index.html` (deux variantes : `graph-wide` et `graph-tall`). Pour ajouter un projet, ajouter son nœud et ses arêtes dans les deux variantes ; chaque arête porte `data-from` et `data-to`.
