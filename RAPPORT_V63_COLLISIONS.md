# ASHFALL Alpha V6.3 — Intégration collisions ajustées

## Travaux
- Reprise des 12 illustrations existantes, sans les modifier.
- Empreintes polygonales des objets solides redéfinies ou resserrées, inspirées de la référence bleue validée.
- **Correction majeure** : suppression des collisions fantômes provenant des anciens rectangles `obs`, auparavant cumulés avec les polygones.
- Bordures infranchissables préservées avec la marge physique du joueur (22 + rayon).
- Positions et connexions des portes conservées selon rooms.json.
- Calque de contrôle `CONTROLES_COLLISIONS_V63/`, basé sur les vrais fichiers de fond, non sur des illustrations de référence générées.
- Affichage debug optionnel : touche C en test desktop ou `?collisionDebug=1`.

## Limites
Ce lot est une **version à valider sur iPhone**. Les nouvelles empreintes ont été tracées manuellement, pas extraites par modèle 3D ; elles peuvent exiger des retouches au contact. Ne pas confondre le plan illustratif précédent avec une géométrie automatiquement exploitable. Les changements de portes et de spawn n'ont pas été requis ici.

## Inventaire
- Salle 01 : 7 empreintes; 1 porte(s); 360×800.
- Salle 02 : 5 empreintes; 4 porte(s); 360×800.
- Salle 03 : 8 empreintes; 1 porte(s); 720×800.
- Salle 04 : 5 empreintes; 1 porte(s); 360×800.
- Salle 05 : 5 empreintes; 2 porte(s); 720×800.
- Salle 06 : 4 empreintes; 4 porte(s); 720×1200.
- Salle 07 : 5 empreintes; 1 porte(s); 720×800.
- Salle 08 : 3 empreintes; 1 porte(s); 360×800.
- Salle 09 : 6 empreintes; 2 porte(s); 720×1200.
- Salle 10 : 6 empreintes; 2 porte(s); 360×800.
- Salle 11 : 4 empreintes; 2 porte(s); 1080×1200.
- Salle 12 : 5 empreintes; 1 porte(s); 360×800.
