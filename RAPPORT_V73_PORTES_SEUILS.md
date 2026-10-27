# ASHFALL V7.3 — Seuils et cadrage des portes

Base : V7.2 avec les cinq sprites officiels, sans retoucher les 12 illustrations ni les 12 masques PNG.

## Changements dans fixedworld.js
- Déclenchement TP ramené de 78 à **44 unités** du bord, juste avant le mur physique (rayon 12 et marge 22).
- Détection transversale centrée sur l'ouverture, demi-largeur 29 au maximum (avant plage porte +10 = largeur ~87/93).
- Position d'apparition à **88 unités** du bord de la nouvelle salle, au lieu de 112 : arrivée plus proche de la porte, mais pas dans son déclencheur.
- Garde de transition **0,32 s**, puis réarmement hors zone de porte, pour supprimer les enchaînements involontaires.
- Le grand rectangle cyan/rouge opaque sur chaque porte est remplacé par un fin trait coloré de 3 px au seuil intérieur, calé sur le centre de la porte de la scène.
- Liaisons et coordonnées des 22 seuils conservées et croisées avec les illustrations originales; en salle 05, la sortie sud est visuellement décalée à gauche (x=180), et la nord au centre (x=360) : c'est bien la géométrie illustrée.

## Limites
- Vérifications programmatiques et prévisualisations des 22 seuils, sans test physique iPhone.
- Les seuils visuels sont cohérents mais le confort ressenti et le rendu en jeu restent à valider.
