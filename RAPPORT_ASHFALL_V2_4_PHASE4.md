# ASHFALL V2.4 — Phase 4 : cohérence graphique

## Base et périmètre
Base : ASHFALL V2.3 Phase 3, sans suppression de ressources ni modification de sauvegardes, d'économie ou de gameplay. Aucun changement GitHub.

## Défauts confirmés dans le code et corrections
1. **Décors interactifs dessinés deux fois** : les formes Canvas de secours étaient toujours dessinées, puis recouvertes par les sprites PNG pour les événements et explosifs. Cela pouvait laisser apparaître des cadres géométriques et produire un rendu hétérogène. Les primitives de secours ne sont désormais dessinées que lorsque l'image correspondante n'est pas prête ; les anneaux et avertissements d'interaction restent présents.
2. **Balise d'avant-poste dessinée au mauvais emplacement** : le sprite `outpost` était dessiné après restauration de la translation Canvas, donc à l'origine `(0,0)` au lieu du centre de la balise `(180,195)`. Il est désormais dessiné dans le bon repère ; les formes vectorielles restent un secours si l'image manque.
3. **Cache PWA** : clé de cache incrémentée pour charger les changements de cette version.

## Contrôles effectués
- Validation syntaxique de tous les fichiers JavaScript via `node --check`.
- Décodage et intégrité de 307 images JPEG/PNG/WebP par Pillow : aucune erreur.
- Disponibilité des 42 sprites d'environnement attendus : aucune référence manquante.
- Vérification des chemins HTML locaux, contrôle CRC du ZIP et conservation des fichiers de la base.

## Limites
- Aucun test visuel automatisé dans Safari iPhone ; les changements de rendu doivent être vérifiés sur appareil, en particulier la balise, les barils, les condensateurs et les événements de salle.
- La phase 4 ne prétend pas harmoniser intégralement toutes les animations, proportions et illustrations ; aucune image originale n'a été redessinée.
- Le code de jeu et le service worker sont les deux seuls fichiers préexistants modifiés.
