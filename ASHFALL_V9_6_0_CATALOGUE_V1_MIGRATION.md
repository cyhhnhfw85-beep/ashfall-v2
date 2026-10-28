# ASHFALL 0.9.6.0 — Migration du catalogue (TEST)

## Périmètre
- 18 nouvelles familles d'équipement réellement générables (4 armures, 3 bottes, 3 sacs, 4 modules, 4 artefacts), chacune déclinée en 6 raretés : 108 PNG.
- 6 familles d'armes de l'arsenal V9.5.7 et leurs 36 images conservées.
- Les 15 anciennes familles et 6 modèles « héritage » ne figurent plus au catalogue de génération.
- Les nouvelles familles sont liées à des effets existants. Réglages de base PROVISOIRES à valider en jeu ; pas de nouveaux systèmes d'effets.
- L'affichage du marchand, du survivant, du sac, des notifications de ramassage et du bilan d'expédition utilise les illustrations du modèle et de la rareté.

## Migration des sauvegardes (choix explicite utilisateur)
- Au refuge, une sauvegarde préalable est écrite sous `ashfall_pwa_v1_pre_catalogue_v1` dans le stockage local avant toute suppression.
- Suppression **sans compensation** des équipements anciens possédés, y compris ceux qui étaient portés ; libération des emplacements correspondants.
- Conservation des armes actuelles, crédits, recherche, composants, améliorations, régions, statistiques et autres données de progression.
- Anciennes offres du marchand invalidées pour renouveler les modèles proposés.
- Migration marquée `equipmentCatalogV1Migrated=true`, idempotente.
- Si une expédition est en cours, la migration est **différée au retour au refuge** pour ne pas casser la session. La session en cours peut donc encore contenir des anciens objets ; ils seront supprimés au retour.
- Si la sauvegarde préalable échoue, la suppression est interrompue.

## Vérifications requises sur iPhone
- Vérifier les 18 familles dans les récompenses et au marchand, et les six raretés au fil des tests.
- Tester les effets des équipements et l'équilibrage (notamment sacs, modules, artefacts).
- Vérifier que les objets hérités ont disparu après retour au refuge et que crédits, recherche, progression sont inchangés.
- Vérifier les PNG dans les notifications et bilans de victoire / mort / abandon.
- Exporter une sauvegarde avant installation ; aucune modification GitHub n'a été faite.
