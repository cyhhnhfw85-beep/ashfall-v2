# V6.5 — Affinement conservateur des masques

Base: V6.4. Les 12 fonds illustrés restent identiques (SHA-256 contrôlés).

Chaque masque de collision a été réduit localement (3 à 7 unités) pour supprimer les marges trop larges des contours existants. Les couloirs d’accès aux portes ont été dégagés. Les images `CONTROLES_V65/` proviennent **directement des 12 PNG utilisés par le jeu**, pas de nouveaux dessins de démonstration.

**Limite** : cette passe est un affinement des tracés hérités de V6.3. Elle n’est PAS une segmentation sémantique parfaite objet par objet. Les murs extérieurs continuent à être protégés par le moteur, qui utilise une marge fixe : certains contours de mur ne figurent donc pas dans le masque. Des tests sur iPhone restent obligatoires.

Contrôles: 12/12 images inchangées, 22 ouvertures présentant une zone praticable, dimensions des 12 masques conformes, archive complète.
