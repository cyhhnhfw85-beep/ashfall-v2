# ASHFALL 0.9.3 ASH25 G2 — HUD FIX TEST 1

Base : ASHFALL 0.9.3 ASH25 G2 expérimentale validée par utilisateur.

- Terrain uniquement **sous le HUD** : son bord supérieur est calculé à partir du bas réel de `.gamebar` + 4 px.
- Terrain jusqu’en bas de l’écran, derrière le joystick, sans ancienne zone vide.
- Hauteur logique du canvas recalculée proportionnellement à la place disponible ; zoom uniforme conservé.
- HUD, joystick, salles 25, monde, portes, collisions, sauvegardes et ennemis inchangés.
- Version runtime corrigée pour correspondre à la version de la page (le G2 original affichait encore la version P01 V3.2 dans game.js).
- Identifiant de cache PWA et URLs CSS/JS renouvelés.

Tests : analyse syntaxique JavaScript, vérification ZIP, existence des fichiers du pré-cache, contrôle des remplacements. Validation visuelle sur iPhone à réaliser.
