# Validation — ASHFALL 0.9.2-graphics-p2.1

## Résumé
Version de développement produite pour **correctif graphique ciblé du Nomade 2.0**.

## Contrôles exécutés
- Vérification de syntaxe JavaScript : `nomad2-renderer.js` ✅
- Vérification de syntaxe JavaScript : `game.js` ✅
- Vérification de syntaxe JavaScript : `service-worker.js` ✅
- Vérification de présence / ouverture des sprites héros modifiés ✅
- Vérification différentielle vs ZIP source P2 ✅
- Prévisualisations techniques avant/après générées ✅

## Contrôles non exécutés dans ce contexte
- Démarrage réel du jeu en navigateur headless ❌
- Refuge / expédition / déplacement / tir en exécution réelle ❌
- Recette iPhone P2.1 ❌

## Motif des non-exécutions
Les tentatives d'ouverture automatisée du jeu dans Chromium via l'environnement conteneur ont été bloquées par la politique locale du navigateur (`net::ERR_BLOCKED_BY_ADMINISTRATOR`).

## Conclusion
La version est **préparée pour recette manuelle** et conserve une portée strictement visuelle sur la base P2.
