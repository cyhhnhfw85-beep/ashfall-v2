# ASHFALL — Base de développement SANS HUD (test)

## Modifié
- Retrait de la structure visuelle du HUD expédition (vie, XP, mini-carte, sac, pause et contrats) du HTML.
- Retrait du fichier de styles dédié `expedition-rebuild.css` et de l’injection `af938-critical-hud`.
- Désactivation de l’affichage des commandes visuelles du joystick, avec préservation de la zone tactile.
- Maintien de points d’ancrage HTML **cachés** pour les identifiants utilisés par le moteur.

## Important : limite de portée
`game.js` est un moteur monolithique (~2 Mo). Les mises à jour de PV, de carte, de sac, les événements pause et les commandes tactiles y sont imbriqués avec le gameplay. Il serait dangereux de supprimer aveuglément ces portions JavaScript. Elles restent **présentes mais sans interface visuelle correspondante**. Certaines règles CSS HUD historiques résident toujours dans `game.css` et d’autres styles partagés, mais elles n’ont plus de structure HUD à afficher.

## Préservé
- Moteur de jeu, inventaires, progression, sauvegardes, combats.
- Canvas et zone tactile de déplacement invisible.
- Aucun accès ni publication GitHub.

## Validation
- Archive construite et testée en intégrité; JavaScript moteur inchangé.
- Pas de validation navigateur ni iPhone.
- Version destinée comme **base technique sans HUD**, et NON comme version finale jouable ergonomiquement.
