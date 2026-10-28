# DESIGN.md · Portfolio d'Abdellah Hailal (v3, « Cause et effet »)

## Concept

Abdellah travaille sur l'inférence causale : estimer l'effet réel d'une intervention. Le site entier est un diagramme causal.

- Le nom est composé comme l'argument de l'opérateur de Pearl : *do(*Abdellah Hailal*)*.
- Le héros est un graphe orienté interactif : ses compétences (causes) mènent à ses projets (effets), qui mènent à « Votre équipe » (le stage visé).
- Chaque projet se lit comme une chaîne causale : Question, Intervention, Effet.

Un seul élément audacieux : le graphe et la typographie du nom. Tout le reste est calme.

Direction établie sans bibliothèque UXKIN (non connectée) : elle repose sur le sujet du client, ses projets réels et les règles des skills installés.

## Couleur

| Jeton | Clair | Sombre | Rôle |
|---|---|---|---|
| `--paper` | #EEF0F5 | #0E1022 | Fond de page, gris froid (pas de crème) |
| `--surface` | #FFFFFF | #171A33 | Panneaux de figures, nœuds du graphe |
| `--ink` | #151935 | #E7E9F4 | Texte, traits du graphe |
| `--muted` | #4E5470 | #A2A8C3 | Texte secondaire (contraste ≥ 6:1) |
| `--line` | #CDD2DE | #2C3150 | Filets, arêtes inactives |
| `--accent` | #3437C9 | #9EA2FF | Intervention : boutons, liens, chemin actif du graphe |
| `--accent-ink` | #FFFFFF | #0E1022 | Texte sur l'accent |
| `--accent-soft` | #E1E2FB | #23264A | Fond du chemin actif |

Une seule couleur d'accent, réservée à l'action et au chemin causal mis en évidence.

## Typographie

- **Schibsted Grotesk** (variable, 400 à 800) : titres, texte, interface. Hébergée localement.
- **Newsreader italique** (variable) : la notation (*do(·)*, *Question*, *Intervention*, *Effet*), les légendes des colonnes du graphe. Hébergée localement.
- Échelle : 14 · 16 · 18 · 20 · 25 · 32 · 44 · clamp(48 à 104) px. Corps 17 px, interlignage 1,6 ; serif +0,05.
- Pas de majuscules d'étiquette, pas de police à chasse fixe pour les petites étiquettes, pas de mot isolé mis en couleur dans un titre.

## Espacement et forme

- Échelle de 4 : 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Largeur de contenu 72 rem, texte ≤ 66 caractères.
- Rayons : 6 (puces), 8 (images), 14 (panneaux = 8 + 6 de marge, concentrique), 999 (nœuds de compétence).
- Profondeur : une ombre en couches pour les panneaux ; aucune bordure lourde.

## Composants

- Bouton principal (accent), bouton secondaire (contour), lien texte souligné.
- Nœud de graphe : compétence (pilule), projet (bloc titre + sous-titre italique), objectif (contour pointillé).
- Étude de cas : en-tête, fiche de contexte, chaîne Question → Intervention → Effet, figure, outils, captures repliables.
- Galerie repliable (`<details>`) et visionneuse (`<dialog>`).

## Mouvement (pondération Jakub, puis Emil)

- Un seul moment au chargement : les arêtes du graphe se tracent par colonne (≈ 900 ms au total).
- Survol ou focus d'un nœud : le chemin causal s'allume en 160 ms, le reste s'estompe.
- Dépliage des captures : 240 ms. Pression des boutons : scale(0.97).
- `prefers-reduced-motion` : tout est instantané, rien n'est caché.

## Images

Captures réelles des projets en WebP (deux tailles), dimensions explicites, chargement différé, repliées par défaut. Icônes SVG à trait de 1,6 px.
