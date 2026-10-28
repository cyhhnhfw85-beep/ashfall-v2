# ASHFALL V2.5 — Phase 5 : performances

## Base et périmètre
Base : ASHFALL V2.4 Phase 4, copie locale. Aucun accès à GitHub. Modifications limitées à `game.js`, `immersion.js`, `service-worker.js`.

## Constats confirmés par lecture du code
1. `ashSchedulePlayfield()` créait une nouvelle requête `requestAnimationFrame` à chaque événement de redimensionnement, sans dédoublonnage. `render()` en créait aussi directement.
2. La boucle principale continuait à appeler `update()` et `draw()` sur chaque frame reçue, même si le document était masqué (le navigateur réduit généralement les frames mais ne garantit pas l'arrêt).
3. La boucle d'effets d'immersion effaçait le canvas à chaque frame, même en refuge ou lorsque les particules étaient désactivées et qu'aucun effet ne restait.

## Corrections
- Coalescence des demandes de redimensionnement à une seule par frame, sans planification pendant le masquage.
- Suspension de la simulation et du dessin pendant le masquage du document ; horloge réinitialisée à chaque frame masquée pour éviter un saut au retour. Le gestionnaire de pause/sauvegarde existant est conservé.
- Évitement du dessin des effets lorsque rien n'est visible ; effacement immédiat du canvas si les effets sont désactivés.
- Nouvelle version de cache du service worker.

## Contrôles et limites
- Vérification de syntaxe `node --check` de 14 scripts : OK.
- Contrôles statiques ciblés des changements : OK.
- Intégrité CRC de l'archive et fichiers référencés : voir résultats du packaging.
- Aucun benchmark FPS, mémoire, batterie ou temps de chargement sur Safari iPhone n'a été effectué. Aucun gain numérique n'est revendiqué.
- Les scénarios d'extraction, combat, sauvegarde et retour d'arrière-plan nécessitent une recette sur appareil. Les optimisations ne constituent pas une certification de stabilité.

## Recette iPhone conseillée
1. Ouvrir l'application en refuge, activer/désactiver les effets ; vérifier l'absence d'artefacts.
2. Lancer une expédition et vérifier déplacements, tirs, particules et fluidité.
3. Mettre Safari en arrière-plan puis revenir ; vérifier pause et reprise sans saut de temps.
4. Faire pivoter l'écran et vérifier le cadrage.
5. Terminer une extraction et rouvrir le jeu ; vérifier les récompenses et la sauvegarde.
