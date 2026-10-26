# ASHFALL — Rapport DEV P2.3 · Correction finale Nomade 2.0

**Mission :** corriger uniquement la capuche frontale, l'ancrage conditionnel du sac de profil et le manifeste graphique.

**Version source :** `ASHFALL 0.9.2-graphics-p2.2` (ZIP intact, SHA-256 `780649a05bdd330b14c773086a1777a2ce427532608184a780553ff4c6b0c430`).

**Version produite :** `ASHFALL 0.9.2-graphics-p2.3`.

## Corrections effectuées

1. **Capuche de face** — suppression exacte de la composante flottante de 277 pixels alpha. Reconstitution locale du bord supérieur gauche directement sur le sprite principal, en réutilisant ses couleurs. Mesure : **2 composantes alpha (P2.2) → 1 seule (P2.3)**, à voisinage 8 ; aucun fragment isolé restant.
2. **Sac tactique de profil** — nettoyage de `pack-side.png` (suppression des résidus de manche), retrait supplémentaire de l'ancienne bosse de sac incrustée dans le profil du torse, rapprochement du sac vers le dos et raccord discret avec l'épaule. La vue de dos conserve un sac séparé du torse ; les plis du tissu sans sac ont été améliorés. En face, un morceau du sac est visible et relié par une sangle discrète uniquement si un sac est équipé.
3. **Manifeste** — `pack.png` possède en réalité une résolution de **88 × 74 px** (et non 160 × 111). `pack-side.png` est déclaré avec sa résolution réelle **40 × 72 px**. `world`, `offset` et condition de visibilité sont renseignés pour les deux sprites.
4. **Distribution PWA** — version passée à `0.9.2-graphics-p2.3`, cache `ashfall-0902-graphics-p23`, query `0902g23`. Aucun changement des règles du service worker.

## Fichiers du jeu modifiés

- `assets/visual2/hero/torso-front.png`
- `assets/visual2/hero/torso-side.png`
- `assets/visual2/hero/torso-back.png`
- `assets/visual2/hero/pack-side.png`
- `assets/visual2/manifest.json`
- `nomad2-renderer.js`
- `index.html` (identifiants de version seulement)
- `game.js` (identifiants de version seulement)
- `service-worker.js` (identifiants de version/cache seulement)

**Inchangés :** `pack.png`, les jambes, les armes, le cœur Équipements 2.0, les styles HUD/joystick, les décors, les ennemis, l'économie et les sauvegardes.

## Contrôles réellement exécutés

- **13/13 contrôles statiques ciblés réussis** : hash source, versions, invariance des scripts protégés, absence de fragment, manifeste/résolutions, chemins de précache, périmètre de diff.
- **5/5 scripts JS** : analyse syntaxique avec `node --check` (`nomad2-renderer.js`, `game.js`, `service-worker.js`, `equipment2-core.js`, `immersion.js`).
- **Rendu Canvas Chromium isolé**, avec le véritable `nomad2-renderer.js` et ses sprites actuels injectés en URI de données (la seule adaptation se fait dans le banc d'essai, pas dans le ZIP) : **face, profil, dos**, avec et sans sac, à **1× et 3×**.
- Contrôle effectif des appels `drawImage` : **0 image de sac sans sac**, **1 image de sac avec sac**, pour chacune des trois orientations. Aucun message d'erreur JavaScript lors de ces cas.
- Test de défaillance de `pack-side.png` : sans sac, le Nomade continue de s'afficher ; avec sac, le renderer retourne `false` pour permettre le fallback existant.
- ZIP complet recontrôlé après empaquetage avec `unzip -t`.

## Non exécutés / limites

- Pas de navigation HTTP/file complète du jeu dans Chromium : la politique du navigateur de ce conteneur bloque ces navigations. La preuve de rendu porte sur le **renderer réel isolé**, pas une expédition complète.
- Pas de recette Safari / PWA installée sur iPhone, ni de test offline dynamique ou de mesures FPS/RAM.
- Le vieux sous-assemblage des bras/arme demeure celui de P2.2 et peut paraître épais en zoom 3× ; il n'a pas été redessiné dans ce correctif ciblé.
- L'aspect du tissu sans sac en vue arrière reste stylisé : validation visuelle finale à réaliser sur iPhone avant publication.

## Images fournies

- `captures/ASHFALL_P23_CAPUCHE_AVANT_APRES_6X.png` : vrai sprite source avant/après, zoom 6× avec contrôle des composantes alpha.
- `captures/ASHFALL_P23_POSES_1X.png` : six vues rendues par le moteur graphique isolé à l'échelle logique 1×.
- `captures/ASHFALL_P23_POSES_3X.png` : les six mêmes vues, zoom 3× pour audit de l'ancrage.

**Installation prudente :** exporter la sauvegarde P2.2 avant tout remplacement. Préférer une origine HTTPS de test distincte (sa sauvegarde locale sera distincte) et conserver P2.2 pour retour arrière. Aucune publication n'a été exécutée.

## TRANSMISSION À ASHFALL PROMPT

- **Mission :** correctif P2.2 final de la capuche et du sac.
- **Version source :** ASHFALL 0.9.2-graphics-p2.2.
- **Version produite :** ASHFALL 0.9.2-graphics-p2.3.
- **Fichiers modifiés :** neuf fichiers listés ci-dessus, aucun autre fichier historique du jeu altéré.
- **Corrections :** capuche rattachée sans fragment, sac conditionnel lisible/attaché sur les trois vues, manifeste mis à jour, versions/cache actualisés.
- **Tests exécutés :** 13 contrôles statiques ciblés, cinq syntaxes JS, six poses de rendu Canvas à deux échelles, test de repli, intégrité ZIP.
- **Tests non exécutés :** démarrage complet du jeu par navigation navigateur, partie complète, iPhone Safari/PWA, performances réelles.
- **Risques restants :** recette artistique iPhone et cache réel à confirmer ; poses de bras P2.2 conservées.
- **Livrables :** `ASHFALL_0.9.2_GRAPHICS_P2_3.zip`, ce rapport et les trois captures ci-dessus.

**DESTINATAIRE : ASHFALL PROMPT**

**ACTION : Transmettre le ZIP, les captures comparatives et le rapport de développement à ASHFALL PROMPT pour validation avant toute publication.**
