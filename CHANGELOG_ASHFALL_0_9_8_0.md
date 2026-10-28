# ASHFALL 0.9.8.0 — Rééquilibrage économique (alpha test)

Base exacte : archive ASHFALL 0.9.7.3, conservée hors modification.

## Corrections intégrées

1. Marchand — nouveau prix garanti par rareté : base de 750 / 1 400 / 2 900 / 6 900 / 13 500 / 24 000 CR, modulée par catégorie, modèle, niveau et puissance de l'arme. Les prix des coffres ne changent pas.
2. Marchand — plafonds de rareté selon progression : palier 0 Inhabituel maximum, palier 1 Rare, palier 2 Épique, palier 3 Légendaire, palier 4 Mythique. Le tirage d'équipement respecte désormais le même plafond que les armes. Les probabilités relatives admissibles sont conservées par rejet des tirages hors palier.
3. Marchand — migration non destructive du stock existant : les offres non vendues sont recalculées une seule fois et celles hors palier remplacées ; les offres déjà vendues, le compteur d'actualisations, les crédits, les objets possédés et les contrats ne sont pas modifiés. Le stock ne se renouvelle pas gratuitement à l'ouverture.
4. Revente — valeur du loot d'équipement ajustée à la rareté et au niveau ; pour les objets achetés, revente limitée à 25 % du prix historique. Même calcul dans le marchand et les actions de l'inventaire.
5. Ennemis — les éliminations par projectile et explosion utilisent la même routine pour les crédits, l'XP et la chance de drop de 5,5 % ; protection contre le double déclenchement.
6. Numéro de version et cache PWA synchronisés sur 0.9.8.0.

## Volontairement inchangés

- Coffres du refuge : 750 / 2 400 / 6 200 CR ; probabilités inchangées.
- Contrats et récompenses : inchangés.
- Crédits des ennemis, salles, arènes, boss et extraction : inchangés.
- Drop des coffres de salle, inventaire, équipements et laboratoire : inchangés.
- Actualisations payantes : 150 / 250 / 400 / 600 / 850 CR, cinq par cycle.
- Schéma de sauvegarde et objets déjà possédés : inchangés.

## Contrôles

- Syntaxe des JavaScript : `node --check`.
- 20 000 générations de chaque palier de marchand, plafond respecté.
- Test de migration d'un ancien stock : crédits, inventaire, offres vendues et compteur inchangés, migration idempotente.
- 50 000 tirages Monte-Carlo par type de coffre pour référence, probabilités préservées.
- 12 000 scénarios économiques par combinaison de 10 / 25 / 50 salles et de 30 / 60 / 85 % de réussite. **Ce sont des simulations conditionnelles et non des parties exécutées dans le moteur.**
- Intégrité de l'archive ZIP.

## Validation restante

Tests manuels sur iPhone indispensables : achat, vente, ancien stock sauvegardé, 5 actualisations, nouvelle rotation naturelle, extraction et explosion, cache PWA. Faire une exportation de sauvegarde avant publication.
