# Procédure iPhone sans risque — ASHFALL Graphics P2.5

1. **Avant tout :** exporte ta sauvegarde depuis le site/PWA actuelle et conserve le ZIP P2.4 original.
2. **Déploiement de test :** utilise une **origine HTTPS différente** de la PWA principale (un autre chemin sous la même origine ne sépare pas le `localStorage`). Cette mission ne publie rien.
3. Installe tous les fichiers du ZIP P2.5 sur l'environnement de test, sans mélanger les assets et le service worker P2.4.
4. Vérifie le libellé `0.9.2-graphics-p2.5-sprite-cleanup` dans le jeu. Recharge si l'ancienne version reste visible ; ne supprime pas le stockage de ta PWA principale pour forcer un rafraîchissement.
5. Dans une partie de test, vérifie le Nomade à l'arrêt, en mouvement, dans huit directions, le sac avec/sans équipement, différentes armes, HUD/joystick, coffre/extraction, fermeture/reprise puis mode hors ligne après un chargement réussi.
6. Si échec, arrête les tests ; retrouve la version P2.4 en restaurant son archive intégrale sur le **site de test**. Ne change ni la version publiée ni les données du jeu principal.
