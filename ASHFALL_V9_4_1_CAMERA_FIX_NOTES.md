# ASHFALL V9.4.1 — Correction de la zone visible de la caméra

## Cause corrigée
`game.css` définit une règle `body.ashfall-expedition.ash25-fullscreen #stage #canvas` qui donne au canvas toute la hauteur après le HUD, en ignorant le panneau joystick. Sa spécificité CSS surpassait la règle de `hud-v940.css` : le canvas passait visuellement derrière le joystick et une partie du rendu de la salle restait invisible.

## Intervention
- Règle plus spécifique pour limiter le canvas entre la barre supérieure et la zone joystick.
- `ashFitPlayfield` mesure déjà les dimensions affichées du canvas et synchronise sa résolution interne.
- Version de cache actualisée et fichiers applicatifs cohérents.
- Aucune modification de la géométrie des salles, de la physique ou des sauvegardes.

## Validation
Contrôles de syntaxe et intégrité ZIP effectués. Test sur iPhone requis : aller au bord inférieur d'une salle 1×2 et d'une salle 2×3, vérifier que la caméra montre le mur/la porte inférieure, sans étirement ni chevauchement avec le joystick.
