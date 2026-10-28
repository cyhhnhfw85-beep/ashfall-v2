# ASHFALL V2.7 — Phase 7 : économie et progression

## Base
Archive complète ASHFALL V2.6 Phase 6. Aucune modification GitHub.

## Audit
- Coffres payants : prix 750 / 2400 / 6200 crédits ; chaque table de probabilités totalise 1000/1000.
- Marchand : prix dépendant de la rareté, du modèle et du niveau ; revente limitée pour les objets achetés.
- Butin : vérification des tirages Équipements 2.0 et de la limitation des raretés en difficulté I.
- Progression : le plafond du marchand doit être calculé à partir du palier passé à la génération, sans dépendre d'un état global potentiellement différent.

## Correction
- `game.js` : `merchantRarityCap(tier=merchantTier())` accepte un palier explicite borné de 0 à 4 ; `merchantGenerateGear(slot,tier)` transmet ce palier.
- `service-worker.js` : nouvelle clé de cache pour charger la correction.
- Ajout du test `test_phase7.cjs`.
- Aucune modification des prix, chances, récompenses, inventaires, crédits ni schémas de sauvegarde.

## Tests exécutés
- `node test_economy.cjs` : PASS, simulations marchand (100 000 générations au total), vérification des prix et de la migration des offres, plus simulation de 150 000 coffres.
- `node loot-balance-test.js` : PASS, 330 000 tirages simulés, aucune rareté Légendaire/Mythique en difficulté I.
- `node test_phase7.cjs` : PASS, huit cas de plafond de rareté et trois tables de probabilités.
- Vérification syntaxique des scripts JS et intégrité CRC du ZIP : PASS.

## Limites
- Ces tests sont des simulations et tests de code, pas une mesure de progression sur des sessions iPhone.
- Impossible de conclure sur la durée nécessaire pour obtenir un équipement Mythique, le ressenti de difficulté ou l'équilibre à long terme sans télémétrie de parties.
- Tester avec une sauvegarde exportée et conserver V2.6 en secours.
