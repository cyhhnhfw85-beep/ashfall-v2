# ASHFALL — Alpha V4 · Salles 03 et 04

## Base
ASHFALL 0.9.3 — SURVIVANT 4.0 CLASSIQUE + environnements V3 salles 01–02.

## Modifications
- Salles 03 (dépôt abandonné, 720×800) et 04 (maintenance, 360×800) : nouvelles illustrations industrielles fixes en WebP, créées à partir de textures et d’éléments existants du jeu.
- Décors alignés sur les collisions déjà présentes dans `rooms.json` pour 03/04 (inchangées).
- Portes dessinées à l'est de 03 et à l'ouest de 04, aux positions logiques existantes Y=400.
- Conservation des modifications précédentes des salles 01/02 (fonds V3 + coordonnées de collisions V3).
- Mise à jour uniquement de la clé de cache offline du service worker.

## Limites
- Ce sont des environnements de test, PAS des illustrations artistiques finales approuvées par le joueur.
- Le moteur continue à dessiner ses rectangles cyan de porte au-dessus des fonds, sans nouvelle animation.
- Le terminal de maintenance est décoratif, le gameplay et les récompenses restent identiques à l’Alpha précédente.
- Aucun test visuel automatique en navigateur ou test iPhone certifié : validation utilisateur requise.
- Aucun changement des combats, du butin, de l’inventaire, des sauvegardes ou des ennemis.

## Tests demandés
1. Ouvrir le Monde 1 fixe et aller 01 → 02 → 03 puis retour 02.
2. Depuis 02 aller à 04 et revenir à 02.
3. Vérifier les collisions autour de chaque machine ou stockage.
4. Vérifier la lisibilité de deux coffres en 03 et l'absence d'ennemis en 03 et 04.
5. Refaire l'essai sur iPhone à 320/375/390/430 px CSS si disponible.
