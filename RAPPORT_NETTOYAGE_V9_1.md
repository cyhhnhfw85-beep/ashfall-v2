# ASHFALL — V9.1 Base procédurale propre

- Retour au moteur principal généré (`generator25.js`, `game.js`), sans module Monde 1 fixe.
- Identifiant de version unique partagé par l’interface et l’exécutable.
- Suppression de la seconde alerte de version obsolète.
- Vérification de la version publiée par métadonnée `ashfall-build` plutôt que par ancienne expression régulière.
- Ressources JS/CSS avec cache-busting `pc91` et nouveau cache Service Worker.
- Aucune suppression ou modification de la logique de sauvegarde, du refuge, des équipements et de la progression.
- Pour installer : décompresser TOUS les fichiers dans un même dossier et servir via HTTPS ou serveur local. La mise à jour du service worker d'une installation antérieure peut demander une actualisation.

Vérification sur iPhone encore à effectuer.
