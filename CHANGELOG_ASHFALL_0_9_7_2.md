# ASHFALL 0.9.7.2-laboratoire-k17-stabilisation — Correctif de stabilisation

## Corrections
- Identifiant de version aligné dans `index.html` et `game.js`.
- Cache PWA renommé `ashfall-laboratoire-k17-972a`.
- Précache du CSS de détail du sac d'expédition ajouté.
- Références versionnées de `game.js` et du CSS du sac alignées entre HTML et précache.
- README actualisé pour pointer vers le build courant.

## Non modifié
- Sauvegardes et migrations, catalogue, progression, statistiques, équilibre, graphismes et interfaces de jeu.
- Ancien code de compatibilité conservé pour éviter une régression non testée.

## Recette manuelle iPhone
1. Exporter la sauvegarde avant mise à jour.
2. Installer le build complet et charger une fois en ligne.
3. Vérifier l'absence de bandeau de version incohérente.
4. Ouvrir le sac en expédition, vérifier le cadrage du PNG dans les détails.
5. Tester hors ligne après un premier chargement complet en ligne.
6. Vérifier la conservation des crédits, objets, recherches et niveaux de laboratoire.
