# ASHFALL V2.1 — Phase 1 : sauvegardes et fins d'expédition

## Source et périmètre
Base : `ASHFALL_CLEAN_STABLE_V1_COMPLET.zip`. Travail effectué sur une copie. Aucun changement GitHub, aucune sauvegarde iPhone manipulée.

## Constatations confirmées dans le code
1. Les deux voies de fin d'expédition (`e2Finish` et `finish`) modifiaient définitivement `data`, vidaient `data.run` et affichaient le bilan **même si `persist()` échouait**. Risque : résultat visible mais non sauvegardé, puis restauration d'une ancienne expédition au redémarrage.
2. L'import de sauvegarde demandait confirmation mais n'imposait pas de copie locale de l'état antérieur avant remplacement. Risque de perte de possibilité de retour arrière après import valide mais indésirable.
3. Le système principal préfère correctement une sauvegarde primaire valide à une récupération plus ancienne ; la récupération n'est utilisée que si la primaire est absente ou invalide. Ce comportement a été conservé.
4. La réinitialisation destructive de l'arsenal était déjà neutralisée dans Clean & Stable V1. Aucun changement supplémentaire.

## Corrections appliquées
- Capturer l'état complet avant chaque fin d'expédition (nouveau système E2 et système historique).
- Vérifier `persist()` **avant** de fermer l'expédition et d'afficher le bilan ; en cas d'échec, restaurer l'état en mémoire et avertir l'utilisateur.
- Avant un import confirmé, créer et vérifier une copie locale horodatée `ashfall_pwa_v1_before_import_*`; refuser le remplacement si la copie ne peut être écrite.
- Tous les autres fichiers sont identiques à Clean & Stable V1, sauf ce rapport.

## Vérifications
- Contrôle syntaxique Node.js de `game.js` : OK.
- Comparaison de l'arborescence avec la base : seul `game.js` est modifié parmi les fichiers préexistants.
- Intégrité ZIP finale : OK.
- Références locales HTML : vérifiées par le script de contrôle.

## Limites importantes
- Aucun test de gameplay réel sur Safari iPhone ; aucune certification de FPS, comportement hors ligne, collisions ou interactions tactiles.
- Les scénarios de mort, extraction et reprise n'ont **pas** été validés de bout en bout dans un navigateur. Les corrections sont des protections ciblées du code, pas une garantie générale d'absence de bugs.
- En cas de manque de stockage local, la sauvegarde peut toujours échouer ; un export externe reste indispensable.
- Si le stockage est épuisé, la fin d'expédition reste bloquée tant que l'enregistrement ne peut aboutir : ce comportement privilégie la préservation de l'état plutôt qu'une réussite non persistée.
- Les objets, l'économie, les graphismes et le gameplay ne sont pas rééquilibrés dans cette phase.

## Recette manuelle recommandée
1. Exporter le code de sauvegarde avant installation.
2. Nouvelle expédition, quitter/revenir pendant une salle, vérifier position et butin.
3. Extraction réussie, fermer/réouvrir, vérifier crédits, butin et absence d'expédition active.
4. Mort, fermer/réouvrir, vérifier bilan et pertes prévues.
5. Abandon, vérifier statistiques et absence de double récompense.
6. Importer une sauvegarde de test et vérifier qu'un backup `before_import` est créé.
7. Répéter avec une ancienne sauvegarde historique si disponible, sans toucher à la sauvegarde principale.
