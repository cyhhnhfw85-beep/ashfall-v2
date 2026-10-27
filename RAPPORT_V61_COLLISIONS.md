# ASHFALL Alpha V6.1 — Portes, murs et collisions

Base : ASHFALL Alpha V6 — 12 salles illustrées.

## Modifications
- Ajustement manuel des emprises de collision pour les 12 salles sur leurs visuels existants.
- Mur périphérique continu : marge de 22 unités, sans franchissement.
- Collision cercle/rectangle, afin de réduire les coins invisibles.
- Sous-pas de déplacement pour éviter la traversée à haute vitesse.
- Topologie et coordonnées de portes préservées : les 12 salles restent interconnectées.
- Aucune illustration WebP modifiée (12/12 identiques en SHA256).

## Tests automatiques
- Géométrie des douze salles contrôlée.
- Entrées/sorties accessibles après inflation de 12 unités et cheminement sur grille de 10 unités.
- Transitions bidirectionnelles vérifiées.
- Validation réelle sur iPhone et contrôle artistique des contours encore nécessaires.

## Couverture des salles
- 01: 6 zones bloquantes, 1 porte(s), 1641 cellules praticables connectées
- 02: 4 zones bloquantes, 4 porte(s), 1719 cellules praticables connectées
- 03: 5 zones bloquantes, 1 porte(s), 3402 cellules praticables connectées
- 04: 5 zones bloquantes, 1 porte(s), 1142 cellules praticables connectées
- 05: 5 zones bloquantes, 2 porte(s), 3180 cellules praticables connectées
- 06: 4 zones bloquantes, 4 porte(s), 4537 cellules praticables connectées
- 07: 5 zones bloquantes, 1 porte(s), 2837 cellules praticables connectées
- 08: 4 zones bloquantes, 1 porte(s), 1581 cellules praticables connectées
- 09: 6 zones bloquantes, 2 porte(s), 5381 cellules praticables connectées
- 10: 6 zones bloquantes, 2 porte(s), 1328 cellules praticables connectées
- 11: 4 zones bloquantes, 2 porte(s), 9661 cellules praticables connectées
- 12: 5 zones bloquantes, 1 porte(s), 1232 cellules praticables connectées
