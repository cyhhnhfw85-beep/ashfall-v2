# ASHFALL V6.4 — Moteur à masques éditables

- Tous les fichiers `01.webp` à `12.webp` sont byte-identiques à la V6.3.
- `assets/fixedworld/masks/XX.png` contient la géométrie effective (blanc = obstacle, noir = libre).
- `fixedworld.js` charge la matrice binaire du PNG, et vérifie le disque du Survivant avec neuf sondes.
- `editeur-collisions.html` permet de peindre/effacer les obstacles à taille réelle et exporter le masque à réintégrer.
- **Limite importante** : les premiers masques sont rasterisés depuis les polygones V6.3. Ils ne constituent PAS encore une reproduction exacte des plans conceptuels générés, et doivent être finement retouchés pour chaque salle.
- Le chargement des images est asynchrone avec repli vers les anciens polygones si la ressource manque; inspecter le débogage après chargement.
- Aucun test iPhone réel effectué.
