# ASHFALL V2.3 — Phase 3 : interactions dans les salles

Base : ASHFALL V2.2 Phase 2. GitHub inchangé.

## Défauts de code confirmés et corrigés
1. Un projectile heurtant un baril déjà amorcé (`primed`) était consommé par `tryHitInteractable`, même si `igniteInteractable` refusait son activation. Désormais, seules les installations intactes interceptent le projectile.
2. `canPassDoor(to)` accédait à `r.rooms[to].seen` sans contrôler que la destination existait. Les destinations absentes ou non entières sont maintenant refusées proprement.
3. `enter(id,from)` accédait immédiatement à la salle sans vérification ; une destination invalide déclenchait une exception. L'entrée est désormais interrompue avec un message explicite.

## Contrôles
- Syntaxe des scripts JS : validée par `node --check`.
- Ressources locales HTML : vérifiées.
- Archive ZIP : test CRC effectué.
- Régression statique : les conditions de portes verrouillées, arènes et extraction sont conservées.

## Limites
Ces tests ne simulent pas une partie complète sur Safari. Les collisions physiques, l'ensemble des 50 salles, les vagues et l'extraction doivent être éprouvés sur iPhone. Les trois anomalies ci-dessus sont des défauts de robustesse confirmés dans le code ; leur fréquence réelle n'a pas été mesurée. Aucun changement de gameplay, d'économie, de sauvegarde ou de graphismes intentionnel.
