# ASHFALL — Tactical Map V3 / contrôle d’ouverture

**GitHub `main` : NE PAS INSTALLER.** Laboratoire indépendant.

- Correction de l’ouverture multiple : suppression du `onclick` concurrent du bouton mini-carte.
- Appui tactile/Apple Pencil : ouverture sur `pointerup`, anti-double clic synthétique de 700 ms.
- Clavier et souris : `click` reste fonctionnel.
- Pas d’ouverture si un autre panneau est déjà affiché.
- Fermeture par le bouton X du panneau.
- Simulation du jeu interrompue pendant le panneau via la garde existante `if(!data.run||overlay)return` dans `update(dt)`.
- Aucun changement volontaire à l’équipement, au butin, à la génération ou aux sauvegardes.

## Tests à effectuer sur Safari iPhone
1. Appui sur la mini-carte : une seule ouverture.
2. Fermeture avec X : retour au jeu.
3. Pendant la carte, pas de déplacement ni de combat.
4. Ouverture avec un doigt pendant que le joystick est maintenu avec un autre.
5. Zoom +/- et pincement, puis fermer et rouvrir.

Les contrôles statiques ne prouvent pas le bon fonctionnement sur iPhone.
