# ASHFALL 0.9.3 ASH25 — G2 FULL PLAYABLE EXPERIMENTAL

Base : ASHFALL 0.9.2 P01 V3.2 PROPS TEST 1.

## Inclus
- Jeu entier (HTML, JS, CSS, images, sauvegardes et service worker).
- Nouvelles expéditions : 25 salles, géométries 1x2, 2x2, 2x3, 3x3.
- Nouvelles salles disposées sur une grille d'occupation sans chevauchement.
- Boss, sorties, arènes et avant-postes conservés dans la nouvelle carte, avec densités réduites.
- Portes à coordonnées par connexion, transition de spawn devant l'ouverture correspondante.
- Caméra avec suivi du joueur, canvas étendu au portrait et HUD/joystick superposés pour les nouvelles expéditions.
- Mini-carte utilisant les cellules réelles et décompte dynamique (25 / 50).
- Anciennes sauvegardes : code historique maintenu grâce à `geometryVersion`; aucune conversion destructive.

## Restrictions et validation
- Prototype jouable prévu pour essais mais NON validé sur iPhone. Le test d'exécution navigateur a été bloqué par la politique d'accès aux pages de l'environnement.
- Les sols graphiques P01 stylisés ont été conçus pour la forme 1x1 et ne couvrent pas encore le nouveau départ 1x2, qui utilise le rendu industriel générique du moteur.
- Équilibrage d'événements et durée réelle des expéditions non validés.
- Exporter sa sauvegarde avant les essais ; tester sur une origine séparée / ne pas remplacer la PWA stable.

## Contrôles automatiques effectués
- 1 000 générations avec exactement 25 salles, connexions valides et zéro chevauchement.
- Syntaxe JS (Node --check), intégrité ZIP et ressources déclarées dans le pré-cache.
- Tests directs des entrées/sorties sur iPhone, combats, sauvegardes et performances : encore nécessaires.
