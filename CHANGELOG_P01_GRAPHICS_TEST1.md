# ASHFALL 0.9.2 — P01 Graphics TEST 1

Base: Survivant 3.0 TEST 2, conservé sans modification de son sprite, sa taille ou sa rotation.

## Portée exacte
- Rendu pilote de la **salle de départ du secteur 0** uniquement (forme single).
- Dalles industrielles, fissures et signalisation au sol en projection orthographique 90°.
- Dessin des caisses basé uniquement sur les rectangles renvoyés par roomObstacles.
- Dessin des murs basé sur roomWalls; portes selon les états existants.
- Toutes les autres salles conservent leurs rendus précédents.
- Aucun changement volontaire des fonctions de collisions, du gameplay, de l'économie, de l'IA, des sauvegardes ou de l'extraction.
- La référence conceptuelle ne pouvait pas être plaquée comme texture: elle comporte un personnage, des objets et des portes à des positions non liées aux collisions.

## Limites
- Il s'agit d'une **interprétation procédurale initiale**, non d'une reproduction pixel à pixel de la référence artistique.
- Pas de test réel iPhone; inspecter l'alignement des obstacles, les portes, la lisibilité du sol et la fluidité.
- Les ennemis, boss et effets des autres salles ne sont pas encore refondus.
