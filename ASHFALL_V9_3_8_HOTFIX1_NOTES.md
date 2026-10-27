# ASHFALL V9.3.8 — HOTFIX 1

Corrige le défaut de livraison de V9.3.8 : game.js annonçait V9.3.7 alors que index.html annonçait V9.3.8, ce qui déclenchait une fausse alerte de fichiers cachés.

- Version runtime et HTML synchronisées.
- Cache PWA et paramètres de ressources incrémentés, sans suppression de localStorage ou IndexedDB.
- Correction de la regex de détection de version publiée (ancien motif invalide).
- Aucune modification de la logique d'équipement, de sauvegarde ou d'extraction.

Validation : analyse statique et intégrité archive, pas de validation Safari iPhone. Avant une publication, préserver une sauvegarde exportée.
