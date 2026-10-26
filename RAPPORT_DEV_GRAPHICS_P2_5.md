# ASHFALL 0.9.2 Graphics P2.5 — Nettoyage des sprites du Nomade modulaire

## Mission / référence
- **Mission :** isoler correctement torse, bras, sac et arme des cinq vues du skin pilote sans réécrire le moteur paper doll.
- **Version source :** `0.9.2-graphics-p2.4-pilot`.
- **Archive source protégée :** `ASHFALL_0.9.2_GRAPHICS_P2_4_PILOT.zip` — SHA-256 `d7611ecfdf07a5b026dab8f202efb39a06e06abcfb5fce709c9694c7aaac351d`.
- **Version produite :** `0.9.2-graphics-p2.5-sprite-cleanup`.
- **Publication/GitHub/Bestiaire :** aucune intervention.

## Ce qui a changé
1. **Torses sans équipement incrusté.** Les torses de profil, 3/4 face, dos et 3/4 dos ont été reconstruits avec une veste tactique anthracite, coutures et plis. Cette reconstruction remplace les pixels d'un sac/bras/arme soudés au corps sans laisser de rectangle transparent. La vue face originale est conservée.
2. **Bras autonomes.** Les vues de bras de profil et 3/4 face reprennent des fragments de manches/gants déjà propres du pack approuvé, recadrés aux ancres existantes. Les éléments ressemblant à une arme dans `side__arm-near.png` disparaissent du sprite.
3. **Sacs autonomes.** Le sac du dos et du 3/4 dos est isolé par masque suivant son volume (sans épaules ni bas du torse). Le sac 3/4 face est une pièce textile indépendante reconstruite depuis la vue de sac du profil. Les deux autres vues de sac inchangées étaient déjà dissociées.
4. **Têtes/capuches propres.** Les cinq calques `head` sont ramenés à la capuche, au visage et au col : les fragments d'épaules ainsi que les bandes de fond/traits parasites ne doivent plus déborder de cette couche.
5. **Contrôle sans arme.** Un paramètre d'affichage `previewUnarmed` a été ajouté à `survivor-paperdoll.js` *uniquement pour le banc de vérification visuelle*. Le moteur de jeu ne le transmet jamais. Dans une partie normale, le résolveur d'armes et les tirs sont inchangés.
6. **Cache PWA :** nouvelles chaînes de version et de cache, avec la même politique de pré-cache.

## Fichiers source modifiés — liste exacte
**16 PNG :**
- `assets/skins/nomad-v2/front__head.png`
- `assets/skins/nomad-v2/front-quarter__head.png`
- `assets/skins/nomad-v2/front-quarter__torso.png`
- `assets/skins/nomad-v2/front-quarter__arm-far.png`
- `assets/skins/nomad-v2/front-quarter__arm-near.png`
- `assets/skins/nomad-v2/front-quarter__bag.png`
- `assets/skins/nomad-v2/side__head.png`
- `assets/skins/nomad-v2/side__torso.png`
- `assets/skins/nomad-v2/side__arm-far.png`
- `assets/skins/nomad-v2/side__arm-near.png`
- `assets/skins/nomad-v2/back-quarter__head.png`
- `assets/skins/nomad-v2/back-quarter__torso.png`
- `assets/skins/nomad-v2/back-quarter__bag.png`
- `assets/skins/nomad-v2/back__head.png`
- `assets/skins/nomad-v2/back__torso.png`
- `assets/skins/nomad-v2/back__bag.png`

**5 autres fichiers :**
- `assets/skins/nomad-v2/manifest.json` — état du pilote et déclaration de l'isolation des pièces.
- `survivor-paperdoll.js` — mode d'aperçu sans arme et identifiant du pilote ; pas de changement de logique métier.
- `game.js` — identifiant de version seulement.
- `index.html` — identifiant de version / cache-busting seulement.
- `service-worker.js` — nouveau nom de cache et suffixes des fichiers préchargés seulement.

**Ajoutés :** ce rapport, le changelog, les résultats de validation et la procédure iPhone. Aucun fichier graphique supplémentaire n'est nécessaire : les 40 chemins de fragments existants restent ceux du standard P2.4.

## Compatibilité
- Géométrie de toutes les pièces : **112 × 230 px**, ancres et dimensions d'affichage inchangées.
- Cinq vues maîtresses + miroir conservées ; renderer, résolveur et fallback interne préservés.
- `equipment2-core.js` identique octet par octet.
- `survivor-visual-resolver.js` identique octet par octet.
- `game.js` identique au P2.4 après normalisation de la seule chaîne de version.
- `ashfall_pwa_v1` et les schémas de sauvegarde non modifiés.
- En cours de partie, le pipeline garde une **seule** illustration d'arme sélectionnée et n'affiche le sac que lorsqu'il est équipé.

## Essais réellement effectués
- Chromium headless, moteur Canvas `AshPaperDollV1` réel : **40 états de repos**, **40 états de marche**, **10 vues maîtresses avec/sans sac**, rendus sans erreur JS.
- Instrumentation `drawImage` sur **40 combinaisons** : zéro sac quand non équipé, zéro arme en mode aperçu désarmé, une illustration d'arme lorsque l'arme de test est active ; **40/40 vérifications réussies**.
- Trois cas provoqués de ressource manquante (sac optionnel, tête essentielle, PNG d’arme) : `draw()` retourne `true` et n’appelle pas l’ancien skin. Cas réalisés dans un banc de rendu Chromium isolé.
- Jeu complet ouvert en Chromium aux largeurs **320, 375, 390, 430 px CSS** ; départ d'expédition obtenu, HUD et personnage visibles, aucune exception JS capturée.
- Comparaison de captures Chromium de P2.4 et P2.5 à 390 px (sessions distinctes : mêmes dimensions d’affichage, mais scènes non identiques).
- Contrôle de pré-cache : **100 chemins référencés, aucun manquant**.
- ZIP et syntaxes JS vérifiés après emballage (voir `VALIDATION_P25.md`).

## Contrôles complémentaires de livraison
- 61/61 vérifications ciblées dans `RESULTATS_CONTROLES_P25.json`, dont intégrité des fichiers métier, 40 fragments, manifeste, pré-cache, orientations et unicité de l’arme.
- Démarrage effectif d’expédition en Chromium à 320/375/390/430 px : entrée de jeu et valeurs de PV visibles, largeur sans débordement horizontal.
- À 390 px, déplacement clavier vers la droite mesuré depuis une sonde de test **lecture seule** ajoutée uniquement à une copie instrumentée du script (x : 180 → environ 255 unités en 600 ms). Carte, sac, pause ouverts successivement. **Aucune sonde ajoutée au ZIP livré.**

## Limites / risques ouverts
- Les quatre torses reconstruits sont **des retouches pilotes** : veste/texture redessinées, différence stylistique résiduelle possible avec les fragments issus des planches, particulièrement en 3/4 dos.
- Les bras 3/4 face / profil réemploient des manches propres de face : les volumes articulés restent une approximation graphique pilote.
- Aucune partie complète jusqu'à extraction/mort, aucune mise à jour PWA installée, aucune performance FPS/RAM iPhone mesurée.
- Aucune vérification physique Safari/iPhone pour P2.5 : la validation artistique appartient au propriétaire du jeu et à ASHFALL PROMPT.

## Captures fournies (toutes réelles, pas une maquette IA)
- `captures/P25_GAME_390.png` : jeu réellement exécuté sous Chromium.
- `captures/P25_CHROMIUM_AVANT_APRES_390.png` : deux sessions de jeu, format 390 px CSS, non présentées comme la même salle.
- `captures/P25_FRAGMENTS_AVANT_APRES.png` : comparaison directe des vraies ressources PNG du ZIP P2.4 et du build P2.5.
- `captures/P25_GAME_320.png`, `P25_GAME_375.png`, `P25_GAME_430.png` : captures du jeu en Chromium aux formats indiqués.
- `captures/P25_MOVEMENT_GAME_390.png` : jeu exécuté après déplacement contrôlé.
- `captures/P24_GAME_390.png` : référence P2.4 avec la même sauvegarde de test.
- `captures/AVANT_APRES_JEU_390.png` et `captures/AVANT_APRES_NOMADE_ZOOM_4X.png`.
- `captures/AVANT_APRES_6_FRAGMENTS_3X.png` : fichiers avant/après.
- `captures/P25_RENDER_MATRIX_8D_5STATES.png` : 8 directions × 5 états ; Canvas du renderer réel.
- `captures/P25_MOVEMENT_8D_5STATES.png` : mêmes directions en animation simulée.
- `captures/P25_MASTER_5VIEWS_WITH_WITHOUT_BAG.png` : 5 vues principales avec et sans sac.

## TRANSMISSION À ASHFALL PROMPT
1. **Mission :** nettoyage graphique des composants du pilote Nomade paper doll P2.4.
2. **Source :** `ASHFALL 0.9.2-graphics-p2.4-pilot` (ZIP original intact).
3. **Production :** `ASHFALL 0.9.2-graphics-p2.5-sprite-cleanup`.
4. **Fichiers :** 16 PNG, 1 manifeste, 1 renderer, 3 fichiers de version/distribution ; 4 documents ajoutés. Liste complète ci-dessus.
5. **Réalisé :** séparation visuelle torse/bras/sac/arme, peinture des textiles sous anciens accessoires, calques de capuche nettoyés, mode de vérification désarmé non utilisé par le gameplay.
6. **Tests :** 90 états Canvas réussis, 40/40 vérifications `drawImage`, trois scénarios de repli, 4 lancements Chromium mobiles, pré-cache 100 chemins, JS et ZIP. Aucun échec détecté dans les cas exécutés.
7. **Non exécutés / risques :** recette iPhone, offline PWA installé, expédition complète jusqu'à mort/extraction, FPS et mémoire ; qualité artistique du dos/3⁄4 à juger.
8. **Livrables :** ZIP complet, rapport, changelog, validation, procédure iPhone, planches et captures ci-dessus.
9. **Validation nécessaire :** revue visuelle ASHFALL PROMPT puis recette sur iPhone avant publication ou Bestiaire.

**DESTINATAIRE : ASHFALL PROMPT**

**ACTION : Transmettre le ZIP, les captures et le rapport de développement à ASHFALL PROMPT pour analyse avant de poursuivre.**
