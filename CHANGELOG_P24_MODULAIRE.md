# ASHFALL — 0.9.2-graphics-p2.4-pilot — Nomade modulaire V1

## Référence
- Source protégée : `ASHFALL_0.9.2_GRAPHICS_P2_3.zip` (SHA-256 `7cb6af8e885948cc4b141e323764ee091fa6daa1733afb2dbd532df27864460e`).
- Produit : prototype local **0.9.2-graphics-p2.4-pilot**.

## Modifications réellement réalisées
- Nouveau pack graphique indépendant `assets/skins/nomad-v2/` : cinq vues techniques (face, trois-quarts face, profil, trois-quarts dos, dos) et leurs fragments alignés.
- Fragments séparés pour capuche/tête, torse, bassin, deux bras, deux jambes et sac optionnel. Les miroirs couvrent les orientations gauches.
- Nouveau renderer `survivor-paperdoll.js` (indépendant du moteur de gameplay), armement orienté séparément, marche animée sur les jambes, marques sobres selon le matériel actif.
- Nouveau résolveur `survivor-visual-resolver.js` acceptant les armes du catalogue, notamment les déclinaisons numérotées Nomade, Vektor, Spectre, Ion et Cendre.
- Suppression du déclenchement automatique de `drawNomadGameplay()` en gameplay : image optionnelle absente / arme inconnue utilisent un repli interne au nouveau style.
- Mise à jour de `index.html`, `game.js` (seul raccordement graphique + version), `service-worker.js` (nouveau cache et ressources).

## Non réalisé / à ne pas présenter comme fini
- Le trois-quarts dos est un **assemblage dérivé** (non peint comme une illustration maître originale).
- Les articulations de bras sont limitées à des pivots graphiques simples ; pas de cinématique inverse ni d'animation finale des tirs.
- Le nettoyage des sacs incorporés à la planche référence utilise des zones de veste reconstituées, encore à perfectionner par un artiste.
- Aucune modification des collisions, dommages, statistiques, crédits, sauvegardes, équipements ou ennemis.
