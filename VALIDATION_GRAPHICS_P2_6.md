# ASHFALL P2.6 — Validation technique

## Exécutés et réussis
- P2.5 SHA-256 identifié, ZIP source intègre.
- Retouches restreintes à 5 PNG de torse ; alpha, silhouette et 112×230 identiques sur les 5.
- 40 chemins de calques paper doll conservés et présents dans le manifeste.
- `survivor-paperdoll.js`, `survivor-visual-resolver.js`, `equipment2-core.js` identiques octet pour octet à P2.5.
- `game.js` et `index.html` identiques après normalisation des identifiants de version.
- 100 entrées de pré-cache vérifiées présentes ; identifiant de cache P2.6 unique.
- 7 scripts JS validés par `node --check` : game, equipment, paper doll, resolver, identity, immersion, service worker.
- Tests Chromium du **véritable renderer** : 45/45 compositions P2.6, 45/45 compositions P2.5 pour comparer, sans exception JS. Vues testées : 5 corps sans arme/sac ; 8 armées ; 8×2 sac ; 8×2 arme courte/longue.
- Jeu complet P2.6 en Chromium injecté en mémoire : 4/4 départs d'expédition (320, 375, 390, 430 px CSS), aucune exception JS.
- Capture Chromium du jeu P2.5 et P2.6 à 390 px CSS. Les sessions de jeu sont distinctes.

## Tests échoués / limites du banc
- Navigation du navigateur vers un serveur HTTPS ou localhost bloquée par l'environnement ; le jeu a donc été chargé avec ses ressources intégrées en mémoire dans le banc. Les interactions du jeu et le renderer n'ont **pas** été modifiés sur disque pour ce test.

## Non exécutés
- Test Safari / iPhone réel (jouabilité, netteté, taille physique).
- Première installation, mise à jour et hors-ligne réel du service worker dans une PWA.
- Partie complète jusqu'à extraction et mort sur P2.6.
- Mesures FPS, latence, RAM, batterie iPhone.
- Matrice exhaustive d'équipements manipulés depuis l'atelier (le renderer est testé avec combinaisons synthétiques).

## Verdict
**Candidate de recette iPhone**, pas validée artistiquement ni définitivement pour publication.
