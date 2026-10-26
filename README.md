# ASHFALL — 0.9.2 Graphics P2.6

Version de test du jeu ASHFALL, comprenant le système modulaire du Nomade (paper doll).

## Lancer le jeu

Cette application est destinée à être servie par HTTPS (par exemple GitHub Pages).
Son point d'entrée est `index.html` à la racine du dépôt.

## Structure

- `index.html`, `game.js`, `service-worker.js` : application et mode hors ligne.
- `survivor-paperdoll.js`, `survivor-visual-resolver.js` : rendu modulaire du survivant.
- `assets/` : illustrations et ressources, avec leurs sous-dossiers d'origine.
- Fichiers CSS et autres scripts : interfaces et systèmes du jeu.

## Statut

P2.6 est une version alpha à valider sur iPhone. Les tests Safari/PWA réels
et une partie complète n'ont pas été effectués lors de la livraison DEV.

Les fichiers du moteur et des assets sont conservés octet par octet depuis
le ZIP DEV P2.6. Seuls les anciens rapports et captures de développement sont
écartés de cette distribution GitHub ; ce README est actualisé et `.nojekyll`
est ajouté pour publier directement les fichiers statiques.
