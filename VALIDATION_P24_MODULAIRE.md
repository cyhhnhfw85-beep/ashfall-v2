# ASHFALL 0.9.2-graphics-p2.4-pilot — Validation technique

## Résultats réellement obtenus

| Contrôle | Résultat | Commentaire |
|---|---|---|
| Archive P2.3 de départ | OK | SHA-256 identifié et archive source conservée |
| Syntaxe JS des scripts modifiés et créés | OK | `node --check` |
| 5 vues et 8 directions logiques | OK | Vérifiées par le renderer et la matrice Chromium |
| 128 scénarios de dessin | 128/128 | 8 orientations × 2 états sac × 4 armes × 2 états mouvement |
| Arme inconnue | OK | Rendu générique interne, retour positif |
| Sac de profil indisponible | OK | Renderer reste en état nouveau-style |
| Tête face indisponible | OK | Silhouette de repli interne |
| Arme PNG indisponible | OK | Arme générique interne |
| Chargement des PNG via Chromium | OK | 56 images (40 fragments + 16 armes) |
| Jeu complet aux tailles 320 / 375 / 390 / 430 CSS | OK | Démarrage et lancement d'expédition depuis interface Chromium injectée en mémoire, sans exception JS observée |
| Données Équipements 2.0 | INCHANGÉES | Fichier `equipment2-core.js` byte-identique à P2.3 |
| Pré-cache PWA | OK statique | Toutes les entrées ont un fichier présent ; test réel offline non effectué |
| Test d'intégrité du ZIP final | À compléter lors de l'assemblage | `zipfile.testzip()` et extraction vérifiées au conditionnement |

## Tests non exécutés
- Recette sur **iPhone réel**, Safari, PWA installée et mode hors ligne.
- Partie complète avec combat prolongé, extraction, mort, boss et toutes les catégories de coffre.
- Migration de la vraie sauvegarde du joueur et import/export sur iPhone.
- Mesures FPS, mémoire, latence tactile et coût énergétique sur iPhone.
- Validation de chaque équipement individuel et de chaque asymétrie graphique.

## Limites du banc Chromium
L'environnement ne permettait pas la navigation directe vers un serveur local ou un fichier. Le jeu a été chargé **en mémoire** : HTML, CSS, scripts exacts et assets du pack transmis sous data URI, avec stockage local simulé isolé. La scène a réellement exécuté le moteur JS et démarré une expédition ; cette méthode ne prouve pas la mise à jour de la PWA ni son stockage réel.

## Statut
**Prototype jouable de test**, non validé artistiquement, non publié et non validé sur iPhone.
