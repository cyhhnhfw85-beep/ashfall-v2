# ASHFALL V9.3.8 — Premium Minimal HUD — Build de test

Base exacte : ZIP V9.3.7 fourni. Aucune modification GitHub.

## Implémenté
- HUD supérieur limité à un cœur rempli en fonction de la vie (PV numériques centrés), un hexagone XP rempli dynamiquement, une mini-carte rectangulaire cliquable, sac/compteur et pause.
- Barre de contrat masquée visuellement, sans supprimer sa logique ni ses données. Contrats accessibles dans les menus existants.
- Terrain central et zone joystick séparés géométriquement. Le moteur mesure la hauteur réelle de la zone de contrôle pour dimensionner le canvas, sans valeur codée en dur de 88 px.
- Joystick centré dans une zone basse sombre distincte, mouvement semi-flottant d'origine conservé.
- Cache service worker et références des ressources passés en hud938 ; version affichée actualisée.

## Limites de validation
- Vérifications statiques et intégrité ZIP uniquement (si tests passés). Aucun test iPhone réel ni certification de compatibilité/sauvegarde.
- Les sauvegardes/localStorage et règles du gameplay ne sont pas modifiées. Avant publication, conserver une sauvegarde exportée et tester la reprise d'une sauvegarde existante sur iPhone.
- Les captures de conception étaient des maquettes et non des rendus HTML.
