# ASHFALL — Rapport DEV — 0.9.2 Graphics P2.6, finition artistique Nomade

## Mission et traçabilité
- **Mission** : finition visuelle ciblée des pièces modulaires, priorisant les vestes de profil, trois-quarts et dos.
- **Version source exclusive** : `ASHFALL_0.9.2_GRAPHICS_P2_5.zip`, SHA-256 `99aaf71cf0eec462c2258ab39ddd480d50ee945bcf42988b4f4097bc88afd774`.
- **Version produite** : `0.9.2-graphics-p2.6-art-polish`.
- **Aucune intervention GitHub ou publication**. La source ZIP originale est restée intacte.

## Améliorations effectivement réalisées
- Rééquilibrage des ombres, éclairages et volumes de tissu, sans nouveau motif d'équipement amovible.
- Ajout de coutures de panneaux, épaules et taille, plis du vêtement, points de couture et nuances de matériau, dans les cinq torses : `front`, `front-quarter`, `side`, `back-quarter`, `back`.
- Traitement **asymétrique propre du trois-quarts dos** : épaule éclairée et panneau opposé plus sombre pour différencier cette vue de la vue arrière.
- Renforcement contrôlé des plis en profil et trois-quarts ; face retouchée avec parcimonie car les détails initiaux étaient déjà présents.
- Le sac reste totalement distinct dans `__bag.png`, les bras et les armes restent distincts ; les 40 fragments du pilote conservent les mêmes chemins et coordonnées.
- Aucun changement des animations, des directions, du résolveur, du fallback, de la hiérarchie des calques ou des interactions.

## Fichiers existants modifiés (liste exhaustive : 9)
1. `assets/skins/nomad-v2/front__torso.png`
2. `assets/skins/nomad-v2/front-quarter__torso.png`
3. `assets/skins/nomad-v2/side__torso.png`
4. `assets/skins/nomad-v2/back-quarter__torso.png`
5. `assets/skins/nomad-v2/back__torso.png`
6. `assets/skins/nomad-v2/manifest.json` — statut et limites artistiques documentés
7. `index.html` — identifiants de version et suffixes de ressources uniquement
8. `game.js` — chaînes d'identification de version uniquement
9. `service-worker.js` — cache `ashfall-0902-graphics-p26art` et suffixes `0902g26`

### Fichiers de documentation ajoutés
- `RAPPORT_DEV_GRAPHICS_P2_6.md`
- `CHANGELOG_GRAPHICS_P2_6.md`
- `VALIDATION_GRAPHICS_P2_6.md`
- `RECETTE_IPHONE_GRAPHICS_P2_6.md`

## Sécurité de l'intégration
Les PNG restent en **112 × 230 px**, et leur canal alpha, silhouette, ancre source et boîte englobante sont exactement identiques à P2.5. Aucun pixel hors de la silhouette n'a été ajouté. `survivor-paperdoll.js`, `survivor-visual-resolver.js` et `equipment2-core.js` sont byte-identiques à la version source. Les modifications du moteur `game.js` sont exclusivement des textes de version, vérifiées après normalisation.

## Résultats techniques et limites
- **Rendu réel du module dans Chromium** : 45/45 compositions pour P2.6 (5 vues sans équipement, 8 orientations avec arme longue, 16 états sac avec/sans, 16 états arme courte/longue). Aucun retour d'exception JS. Même suite exécutée contre P2.5 : 45/45.
- **Jeu complet injecté en mémoire dans Chromium** : lancement effectif d'expédition aux largeurs 320, 375, 390 et 430 px CSS, sans exception JavaScript. Captures du jeu à 390 px pour P2.5 et P2.6.
- **Statique** : 9 modifications attendues, aucune modification métier, sept scripts JS vérifiés, manifeste avec cinq vues, 100/100 chemins de pré-cache présents, transparences de 5 PNG inchangées.
- **Non exécutés** : navigateur Safari sur appareil, PWA installée avec cache actif, performance chiffrée FPS/RAM iPhone, partie longue et recette complète extraction/mort P2.6. Aucun résultat iPhone ni performance n'est inventé.
- **Limites artistiques** : la vue trois-quarts dos demeure fondée sur une illustration dérivée, non une illustration dédiée ; la finition a volontairement été limitée aux torses. Certaines coutures fines deviennent discrètes à l'échelle de jeu, d'où l'importance de la revue sur iPhone.

Les captures Chromium sont accompagnées séparément :
- `P26_AVANT_APRES_TORSOS_5V.png` : PNG 4× pour contrôle des textures
- `P26_5VIEWS_SANS_EQUIPEMENT.png` : 5 vues réelles du renderer
- `P26_8D_AVEC_ARME.png` : 8 orientations avec fusil
- `P26_8D_SAC_SANS_SAC.png` : 8 directions avec/sans sac
- `P26_8D_ARME_COURTE_LONGUE.png` : changement visuel pistolet/fusil
- `P26_JEU_AVANT_APRES_390.png` : captures du jeu à 390 px CSS (sessions procédurales distinctes)

## TRANSMISSION À ASHFALL PROMPT
1. **Mission** : finition artistique ciblée P2.6 des cinq torses du Nomade.
2. **Source** : P2.5 `ASHFALL_0.9.2_GRAPHICS_P2_5.zip` (SHA-256 indiqué ci-dessus).
3. **Version produite** : `ASHFALL_0.9.2_GRAPHICS_P2_6.zip`, version interne `0.9.2-graphics-p2.6-art-polish`.
4. **Modifications** : 5 PNG `__torso`, manifeste, `index.html`, `game.js`, `service-worker.js` ; quatre rapports ajoutés.
5. **Réalisations** : plis, reliefs, éclairages, coutures, finition trois-quarts dos sans changement des mécanismes de dessin.
6. **Tests** : 45 dessins Chromium P2.6 et 45 P2.5, 4 démarrages du jeu Chromium, 7 syntaxes JS, 100 liens de pré-cache, comparaison des transparences réussis ; aucune erreur JS dans les contrôles exécutés. Safari iPhone, performances, cycle PWA réel et partie longue non exécutés.
7. **Risques** : détails discrets à taille de jeu, trois-quarts dos toujours dérivé, validation tactile et performance iPhone non acquise.
8. **Livrables** : ZIP P2.6, rapport DEV, changelog, validation, recette iPhone, captures avant/après et matrices listées ci-dessus.
9. **Validation requise** : revue artistique par ASHFALL PROMPT puis recette iPhone du propriétaire avant publication ou passage au Bestiaire.

**DESTINATAIRE : ASHFALL PROMPT**

**ACTION : Transmettre le ZIP, les captures et le rapport de développement à ASHFALL PROMPT pour analyse avant de poursuivre.**
