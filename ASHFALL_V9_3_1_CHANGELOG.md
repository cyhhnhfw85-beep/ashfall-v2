# ASHFALL V9.3.1 — Génération des salles 2.0 (TEST)

Base : V9.3.0 Combat Reborn.

## Quotas stricts sur 50 salles procédurales
- 23 salles d’exploration 1×2 (y compris le départ)
- 10 salles d’exploration 2×2
- 6 arènes exclusivement 2×3
- 3 salles d’extraction 1×2/2×2
- 3 salles de ravitaillement 1×2/2×2 (avant-postes sûrs avec coffre)
- 4 salles d’événements 1×2/2×2 (caches)
- 1 boss exclusivement 3×3

Les formats représentent les dimensions physiques du terrain de jeu. Les 50 salles du graphe et les sauvegardes anciennes sont conservés ; seuls les nouveaux départs emploient `geometryVersion:31`.

## Vérifications automatisées
- 500 générations : quotas exacts, 50 nœuds accessibles et chemins connectés
- Syntaxe JavaScript validée
- Fichiers du précache présents et intégrité ZIP vérifiée

## Points à valider sur iPhone
- Navigation, collisions et caméra dans chaque dimension, surtout aux portes
- Arènes et boss dans de grands espaces ; extraction et ravitaillement
- Rendu mini-carte avec proportions de salle
- Compatibilité des anciennes expéditions et performances mémoire

Publication GitHub non effectuée.
