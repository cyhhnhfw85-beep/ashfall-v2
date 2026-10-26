# ASHFALL — Périphérie GFX TEST 1

Base technique : `ASHFALL_0.9.3_ASH25_G2_HUD_FIX_TEST1`

## Objectif
Étendre le langage graphique validé de la salle pilote P01 à toute la Périphérie, sans modifier le gameplay, les collisions, la génération des salles ni les sauvegardes.

## Modifications réalisées
- Généralisation du rendu P01 à tout le secteur 0 (Périphérie).
- Compatibilité visuelle des salles 1x2, 2x2, 2x3 et 3x3.
- Variantes légères selon le type de salle : entrée, extraction, combat, boss, relais, standard.
- Conservation du Survivant 3.0 et des proportions existantes.
- Mise à jour des versions HTML / runtime / cache PWA.

## Fichiers modifiés
- `p01-graphics.js`
- `game.js`
- `index.html`
- `service-worker.js`
- `CHANGELOG_PERIPHERIE_GFX_TEST1.md`

## Tests réalisés
- Vérification de syntaxe JavaScript : OK
  - `node --check game.js`
  - `node --check p01-graphics.js`
  - `node --check service-worker.js`
- Vérification d'intégrité du ZIP : OK

## Points volontairement inchangés
- collisions et hitbox
- coordonnées des obstacles
- logique des portes
- génération des salles
- progression / sauvegardes
- autres secteurs hors Périphérie
