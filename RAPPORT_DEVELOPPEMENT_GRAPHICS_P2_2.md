# ASHFALL 0.9.2-graphics-p2.2 — Rapport de développement

## Résumé court
Correctif final ciblé du **Nomade 2.0** à partir de **ASHFALL 0.9.2-graphics-p2.1**.
Objectif : corriger le sac tactique et la capuche frontale, sans toucher au gameplay, aux sauvegardes, aux commandes, à GitHub ou à la structure du jeu.

## Version
- Version source : **ASHFALL 0.9.2-graphics-p2.1**
- Version produite : **ASHFALL 0.9.2-graphics-p2.2**

## Corrections apportées
1. **Sac tactique**
   - Suppression du sac intégré dans `torso-side.png` et `torso-back.png`.
   - Nettoyage de `pack.png` pour un usage dédié au sac équipé.
   - Ajout de `pack-side.png` pour le rendu de profil.
   - Mise à jour de `nomad2-renderer.js` pour un affichage conditionnel :
     - **sans sac équipé** : aucun sac visible ;
     - **avec sac équipé** : sac visible en face (peek), profil et dos.

2. **Capuche face**
   - Ajustement ciblé de `torso-front.png` afin de retrouver une silhouette frontale plus complète et moins coupée dans la zone haute gauche.

3. **Versioning / cache**
   - Passage en **0.9.2-graphics-p2.2**.
   - Mise à jour des suffixes `0902g22` et du cache service worker `ashfall-0902-graphics-p22`.

## Fichiers modifiés
- `assets/visual2/hero/torso-front.png`
- `assets/visual2/hero/torso-side.png`
- `assets/visual2/hero/torso-back.png`
- `assets/visual2/hero/pack.png`
- `assets/visual2/hero/pack-side.png` *(nouveau)*
- `nomad2-renderer.js`
- `service-worker.js`
- `index.html`
- `game.js`

## Captures fournies
- `captures/ASHFALL_P2_2_PREVIEW_NOMADE.png`
- `captures/ASHFALL_P2_2_AVANT_APRES_NOMADE.png`

## Tests réussis
- Syntaxe JS du renderer ✅
- Vérification ressources / pré-cache ✅
- Vérification versioning P2.2 ✅
- Génération captures de contrôle ✅
- Intégrité du ZIP final ✅

## Tests non exécutés
- Recette gameplay complète en partie réelle
- Recette iPhone / Safari / PWA
- Publication

## Risques restants
- La validation finale sur iPhone reste nécessaire pour confirmer le rendu exact sur appareil réel et le bon rafraîchissement du cache.
- Le correctif est volontairement **ciblé** : il ne revoit pas l'ensemble du pipeline d'animation ni d'autres assets du personnage.

## Livrables
- ZIP jouable : `ASHFALL_0.9.2_GRAPHICS_P2_2.zip`
- Rapport : `RAPPORT_DEVELOPPEMENT_GRAPHICS_P2_2.md`
- Validation : `VALIDATION_GRAPHICS_P2_2.md`
- Changelog : `CHANGELOG_GRAPHICS_P2_2.md`
- Registre : `REGISTRE_RESSOURCES_GRAPHICS_P2_2.md`
- Captures :
  - `captures/ASHFALL_P2_2_PREVIEW_NOMADE.png`
  - `captures/ASHFALL_P2_2_AVANT_APRES_NOMADE.png`

## TRANSMISSION À ASHFALL PROMPT
- Mission : **DEV P2.1 — Correctif final Nomade 2.0**
- Version source : **ASHFALL 0.9.2-graphics-p2.1**
- Version produite : **ASHFALL 0.9.2-graphics-p2.2**
- Fichiers modifiés : voir section dédiée ci-dessus.
- Corrections apportées : sac dissocié du torse, rendu conditionnel du sac, capuche frontale ajustée, versioning/cache mis à jour.
- Tests exécutés : syntaxe renderer, présence ressources, cohérence cache/version, captures de contrôle, intégrité ZIP.
- Tests non exécutés : gameplay complet, iPhone/Safari/PWA, publication.
- Risques restants : validation iPhone et cache réel encore à confirmer.
- Livrables : ZIP, rapport, validation, changelog, registre ressources, captures.

**DESTINATAIRE : ASHFALL PROMPT**

**ACTION : Transmettre le ZIP, les captures et le rapport de développement à ASHFALL PROMPT pour analyse avant toute publication ou poursuite.**
