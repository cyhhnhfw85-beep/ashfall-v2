# Tactical Map V3 — Cadrage fiable (laboratoire)

**INSTALLER SUR GITHUB MAIN : NON.** Copie experimentale a tester dans un environnement separe.

## Problème corrigé
Le moteur remplace le DOM de la grande carte lors de sa fermeture. Lire ensuite scrollLeft/scrollTop d’une vue détachée peut rendre un cadrage incorrect ou le remettre par défaut. Le correctif memorise le centre normalise pendant que la carte est visible et le reutilise a la recreation.

## Limites volontaires
- Le zoom et le cadrage ne sont conserves qu'au sein de la même expedition en memoire.
- Le correctif ne modifie ni les sauvegardes ni les equipements.
- Aucun test Safari iPhone n'a ete realise.

## Recette manuelle
1. Ouvrir grande carte en appuyant sur la mini-carte. Zoomer et déplacer.
2. Fermer avec X, rouvrir : zoom et cadrage doivent être preserves.
3. Recentrer sur joueur, fermer et rouvrir : le cadrage doit rester sur le joueur.
4. Commencer une expedition différente : ancien cadrage ne doit pas etre reutilise.
5. Verifier l'arret de joystick et des tirs lorsque la carte est ouverte.
