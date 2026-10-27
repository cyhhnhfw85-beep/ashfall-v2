# ASHFALL — Retour au gameplay procédural

Base de départ : ASHFALL 0.9.3 Alpha V8.0.

- Suppression du module expérimental « TEST MONDE 1 FIXE · 12 SALLES ».
- Suppression des données et images exclusives du prototype fixe.
- Conservation de la navigation normale du refuge, des secteurs et du bouton « PARTIR EN EXPÉDITION ».
- Conservation du générateur procédural (`generator25.js`) et du gameplay (`game.js`).
- Conservation des sauvegardes ; aucune suppression de données locales n'est exécutée.
- Cache de service worker renouvelé et ressources du test fixe retirées du précache.

Cette étape **restaure le jeu procédural existant**, sans implémenter encore la nouvelle vision discutée (exploration / extraction / progression).

Contrôles : scripts JS, cohérence des liens de chargement et archive ZIP. Validation tactile iPhone reste nécessaire.
