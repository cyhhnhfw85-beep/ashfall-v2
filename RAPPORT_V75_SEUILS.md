# ASHFALL — Alpha V7.5 : seuils illustrés

Base : V7.4 (butin et coffres, 5 sprites officiels).

## Correction
- 22 zones de déclenchement recalées sur les ouvertures peintes dans les vraies images et non sur une distance fixe au bord du bitmap.
- Zones de déclenchement **locales**, 13 unités maximum d'écart dans le sens de progression, 27/28 unités latérales.
- Traits cyan dessinés à **la même position** que les déclencheurs (référence unique).
- 22 apparitions adaptées à chaque seuil, sur le côté intérieur, hors trigger pour empêcher les rebonds instantanés.
- Verrou `doorTransitionArmed` et délai `doorGrace` conservés.
- Salles, masques, coffres, loot, ennemis, économie et sauvegardes non modifiés.

**Validation :** positions calculées sur les assets PNG/WebP et testées sur les masques de collisions; test iPhone réel restant à faire.

Voir `assets/fixedworld/door-thresholds.json` pour les coordonnées.
