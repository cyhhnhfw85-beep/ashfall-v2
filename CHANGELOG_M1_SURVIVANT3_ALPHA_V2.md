# ASHFALL — Monde fixe Alpha V2, intégration Survivant 3.0

## Modifications ciblées
- Remplacement visuel du cercle cyan du joueur par le sprite `assets/survivant-topdown.png` via `AshTopDownSurvivor.draw()` déjà présent dans la base.
- Rotation 360° : direction du mouvement en exploration et visée vers la cible la plus proche au combat.
- Ombre sous le personnage et repli sur cercle cyan lorsque la ressource ne charge pas.
- Invalidation du cache PWA (service-worker) et versions des fichiers du prototype dans index.html.

## Non modifié
- Aucun changement d'économie, progression, sauvegarde, collisions, 12 salles, IA, combats ou loot.
- Le mode alpha reste isolé du jeu principal. Les équipements visuels variables ne sont PAS raccordés au prototype.
- Aucune publication GitHub.

## Validation
- Vérification syntaxique Node à effectuer / effectuée lors du packaging.
- Test réel navigateur PC/iPhone à faire par utilisateur, non certifié dans cette livraison.
