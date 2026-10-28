# ASHFALL — Clean & Stable V1 — Rapport de livraison

## Base
Archive source : ashfall-v2 - Copie(3).zip. Aucun changement GitHub, aucune sauvegarde locale utilisateur manipulée.

## Corrections réalisées
- game.js : intégration des 15 correspondances visuelles historiques déjà présentes dans la copie secondaire, sans modifier les identifiants d'objets.
- game.js : neutralisation de la migration automatique d'arsenal destructive (suppression de la réserve et interruption d'expédition) ; les sauvegardes existantes conservent leurs armes.
- game.js : retrait des appels répétés à la migration de catalogue devenue inoffensive ; restauration manuelle conservée.
- game.js : validation plus stricte des types d'objets proposés à la restauration manuelle.
- equipment2-core.js : 15 modèles historiques reconnus pour les calculs d'effets, sans les réintroduire dans les tirages de butin.
- survivor-v947.js : cohérence des attributs d'accessibilité des filtres.
- service-worker.js : nouvelle version de cache et ajout des références exactes des ressources de index.html à la liste de précache.

## Nettoyage
- Retrait de .git/ dans la livraison ZIP (historique Git, inutile à l'exécution).
- Retrait de assets/game.js, copie moteur non chargée par index.html, après reprise des correspondances graphiques manquantes dans le fichier actif.
- Autres ressources conservées : aucune suppression non prouvée.

## Limites importantes
- Les 15 anciens modèles disposent de bonus de compatibilité PROVISOIRES, basés sur les modèles contemporains les plus proches. Leurs valeurs historiques exactes ne sont pas vérifiables dans la base fournie ; aucune transformation des sauvegardes n'est faite.
- La fonction de migration automatique d'arsenal est désactivée pour protéger les sauvegardes. Les anciennes armes restent conservées mais leur compatibilité graphique et gameplay doit être validée en jeu.
- Les tests statiques ne remplacent pas un test de session sur Safari iPhone : sauvegarde, chargement hors ligne, équipements, combat, mort, extraction et persistance à valider sur appareil.
- Aucune modification de l'équilibrage, des cartes ou des ennemis.

## Fichiers modifiés
- game.js
- equipment2-core.js
- service-worker.js
- survivor-v947.js

## Fichiers retirés
- assets/game.js
- .git/ (historique, non extrait)
