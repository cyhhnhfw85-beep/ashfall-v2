# ASHFALL — Équilibrage du loot d'expédition V1

Base : ASHFALL_DIFFICULTE_I_RECRUE_V1.zip.

## Problèmes constatés
- Génération d'armes historiques : 1 chance sur 7 de mythique (14,29 %) par tirage d'arme.
- Génération d'équipement : 0,6 % de mythique (1,2 % pour les artéfacts), indépendamment de la progression.
- Les coffres d'arène forçaient la rareté épique et les salles gardées imposaient un minimum rare.
- La conversion des armes en équipement V2 pouvait laisser des raretés inadaptées.

## Nouvelle table — difficulté I, par objet généré
| Source | Commun | Inhabituel | Rare | Épique | Légendaire | Mythique |
|---|---:|---:|---:|---:|---:|---:|
| Ennemi | 68 % | 25 % | 6,5 % | 0,5 % | 0 % | 0 % |
| Coffre de salle | 50 % | 34 % | 14 % | 2 % | 0 % | 0 % |
| Coffre d'arène | 35 % | 40 % | 22 % | 3 % | 0 % | 0 % |

La chance de *faire tomber* un objet après une élimination reste de 5,5 % ; la table ci-dessus ne s'applique qu'une fois le drop déclenché. Le nombre de coffres et les récompenses économiques sont inchangés. Les objets existants, coffres achetés et récompenses de niveau ne sont pas réécrits. Les difficultés II-V sont encore verrouillées : leurs tables restent à concevoir.

## Limitations
- Les tirages déjà générés dans une expédition sauvegardée restent inchangés.
- Les coffres de boutique utilisent leur table propre, inchangée.
- Vérification statique et tests de distribution effectués, mais test iPhone requis.
