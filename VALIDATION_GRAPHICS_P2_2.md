# Validation — ASHFALL 0.9.2-graphics-p2.2

## Tests exécutés
- Syntaxe `nomad2-renderer.js` via `node --check` ✅
- Vérification de présence des assets héros requis ✅
- Vérification du pré-cache `service-worker.js` avec `pack-side.png` et token `0902g22` ✅
- Vérification des versions `index.html` / `game.js` en `0.9.2-graphics-p2.2` ✅
- Génération des captures de contrôle :
  - `captures/ASHFALL_P2_2_PREVIEW_NOMADE.png` ✅
  - `captures/ASHFALL_P2_2_AVANT_APRES_NOMADE.png` ✅
- Intégrité du ZIP final via `unzip -t` ✅

## Tests non exécutés
- Recette gameplay complète en partie réelle ⚪
- Recette iPhone / Safari / PWA ⚪
- Publication GitHub Pages ⚪

## Résultat visuel attendu
- Sans sac équipé : aucune apparition du sac en face / profil / dos.
- Avec sac équipé : sac visible et cohérent en face (peek), profil, dos.
- Capuche face plus propre et moins tronquée dans l'angle haut gauche.
