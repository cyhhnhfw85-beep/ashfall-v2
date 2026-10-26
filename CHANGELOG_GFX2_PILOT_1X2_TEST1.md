# ASHFALL 0.9.3 — GFX 2 · Prototype pilote 1×2 TEST 1

Base : ASHFALL 0.9.3 Périphérie GFX TEST 1.

## Périmètre strict
Uniquement la salle de départ des nouvelles cartes 25 salles (`kind=start`, `shape=1x2`). Les autres salles et secteurs conservent leurs graphismes précédents.

## Changements visuels
- Remplacement du micro-quadrillage de 60 unités par six grands panneaux sobres sur 360×800 unités.
- Diminution des textures répétitives, salissures et marquages.
- Ombres de contact simplifiées sur les obstacles, réduction des agrandissements excessifs dans cette salle.
- Rythme structurel des murs élargi et éclairages industriels discrets.
- Maintien exact des rectangles logiques des portes et obstacles.
- Aucune modification des textures sources, du Survivor 3.0, des hitbox, du gameplay ou de la génération.

## Fichiers modifiés
- `p01-graphics.js` (pilote visuel uniquement)
- `game.js` et `index.html` (numéro de version / runtime)
- `service-worker.js` (cache de version)

## Limites
- Test visuel sur appareil iPhone non effectué.
- Le décor est une composition 2D Canvas à partir des ressources existantes. Ce lot ne remplace pas encore tous les sprites par des illustrations redessinées.
- Les sprites visuellement réduits peuvent sembler plus petits : à vérifier sur iPhone.
