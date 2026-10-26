# ASHFALL 0.9.3 — PERIPHERIE P03 B3 FULL TEST1

## Objet
Intégration du kit graphique P03-B3 à toute la zone Périphérie, via le renderer modulaire `p01-graphics.js`.

## Principales modifications
- Remplacement des textures de sol Périphérie par un nouveau kit K-17 premium (plaques métalliques, béton industriel, grilles, marquages, trappes).
- Remplacement et enrichissement des murs et portes avec variantes ambre / mécaniques / cyan / rouge.
- Remplacement des obstacles Périphérie par un nouveau set cohérent (caisses, conteneurs, console, générateur, tonneaux, conduites).
- Réduction du bruit visuel par un agencement plus calme des surfaces.
- Conservation du gameplay, des collisions, des salles multi-formats, des portes et de la génération 25 salles.

## Fichiers principaux modifiés
- `p01-graphics.js`
- `service-worker.js`
- `index.html`
- `assets/p01v2/*`

## Limites connues
- Les placements restent pilotés par le renderer existant et la logique actuelle des obstacles.
- Certaines variantes de murs sont stylisées par alternance procédurale et non par plans de salle uniques.
- Validation finale iPhone requise.
