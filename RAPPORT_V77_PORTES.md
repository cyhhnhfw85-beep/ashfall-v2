# ASHFALL V7.7 — Alignement des portes et état rouge/bleu

Base : V7.6. Les fonds originaux, masques de collision, cinq ennemis et loot K-17 sont préservés.

- Salle 09, porte nord : corrigée à x=269 (sur le fond, l'ouverture lumineuse est entre x=190 et 348). L'ancien déclencheur était centré à x=360.
- Salle 03, porte est : recentrée près de y=389.
- Salle 07, porte est : recentrée près de y=393.
- Salle 10 : petits ajustements de centrage des portes haut/bas.
- Les 22 zones d'affichage ont été élargies/cadrées pour correspondre davantage à la taille des seuils illustrés. Les zones de déclenchement restent étroites et à 44 unités du bord.
- Affichage : porte verrouillée ROUGE, porte ouverte BLEUE, directement au niveau du seuil.
- Dispositif anti-boucle (verrou jusqu'à sortie de la zone + délai d'arrivée) préservé.

Tests statiques : exactitude des 11 connexions réciproques, cohérence des positions, parcours libre depuis les points d'arrivée jusqu'aux déclencheurs, intégrité des assets et syntaxe JS. Le rendu et le ressenti sur iPhone restent à valider.
