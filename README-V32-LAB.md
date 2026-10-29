# ASHFALL V32 — COPIE EXPÉRIMENTALE / NE PAS DÉPLOYER

Cette copie inclut les fichiers réels d'ASHFALL issus de l'archive fournie et une branche V32 expérimentale dans `game.js`.

## Inclus
- Création des expéditions par le générateur V32 de 50 salles à quotas variables (`makeMapV32Experimental`).
- Coordonnées physiques et portes issues de `v32-browser-bundle.js`.
- Portes et murs V32 par adaptateur partagé (plusieurs ouvertures par mur).
- Transition V32 branchée sur les points d'arrivée du moteur existant (repositionnement de 47 unités, **pas une continuité parfaite**).
- Carte physique de diagnostic superposée, distincte des mini-carte et carte principale du jeu.
- Stockage local expérimental (`ashfall_v32_lab_only_v1`) différent de la clé V31.
- Enregistrement du service worker volontairement désactivé dans `game.js`.

## ATTENTION : NON VALIDÉ COMME JEU FONCTIONNEL
- Aucun test iPhone réel.
- Intégration de `makeMapV32Experimental` à la boucle de création effectuée, mais **pas de parcours réel complet validé** (combat, portes verrouillées, extractions, obstacles, cartes historiques, sauvegarde/reprise).
- Les anciens panneaux de carte conservent leurs hypothèses V31 et peuvent afficher des données incohérentes. Utiliser la surcouche de diagnostic V32.
- Les avant-postes supplémentaires et salles secrètes ne sont pas entièrement redéfinis; les règles V31 de progression/événements peuvent être incohérentes dans cette copie.
- Les transitions repositionnent encore le joueur 47 unités en profondeur, ce qui produit un saut sur la carte; pas encore de transition continue garantie.
- Ne pas publier sur GitHub ou remplacer les fichiers de production.
- Si le site de test partage un domaine avec le PWA de production, un ancien service worker peut intercepter les ressources. Utiliser de préférence un serveur local avec origine distincte.

## Essai
Lancer un serveur HTTP statique à la racine de ce dossier, puis ouvrir son `index.html` dans le navigateur. Exemple : `python -m http.server 8765` et `http://localhost:8765/`. Cette copie est destinée à vérifier progressivement les points d'intégration.

## Suivi
1. Effectuer smoke test démarrage, entrée expédition, franchissement réciproque.
2. Corriger éventuelles collisions et transitions.
3. Construire Tactical Map V3 sur la même géométrie.
4. Tester sur iPhone et sauvegarde V32 ; vérifier V31 sur le jeu stable.
