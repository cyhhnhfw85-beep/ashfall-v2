# ASHFALL 0.9.5.9 — Equipment Pack V1.0 (TEST)

Source: ASHFALL_V9_5_9_CONTRATS_UI_POLISH_TEST(1).zip

## Scope
- 108 normalized PNG files copied unchanged to `assets/equipment_v1/`.
- `game.js`: e2ItemArt now selects a PNG by existing model ID and `w.rar`, with the original glyph as fallback.
- `service-worker.js`: unique cache name, all 108 new assets precached for offline installation.
- `index.html`: test build marker and cache-busting version for game.js.
- Existing Equipment2 catalog, model IDs, effects, drop rates, game saves, and game balance unchanged.
- All original `assets/inventory_v952/` images retained for rollback/comparison.

## Compatibility and limitations
The current game has 21 equipment IDs (15 catalog + 6 legacy), while the new pack has 18 visual families. Consequently multiple current IDs may share a visual family. Not every graphical model corresponds to a distinct lootable in-game equipment. New item-model definitions and gameplay effects have NOT been created; that requires a separate design decision.

The visual associations below are **display aliases only**; labels/statistics continue to use the actual game IDs.

- `armor-bastion` → `BASTION-X`
- `armor-predator` → `REACTOR`
- `armor-regenerator` → `SENTINELLE`
- `boots-scout` → `VELOCIS`
- `boots-spectre` → `IMPULSION`
- `boots-anchor` → `ANCRAGE`
- `module-tesla` → `AMPLIFICATEUR`
- `module-aegis` → `STABILISATEUR`
- `module-medic` → `REGENERATEUR`
- `bag-prospector` → `SCOUT`
- `bag-reclaimer` → `RAVEN`
- `bag-securizer` → `DASTION`
- `artifact-resonance` → `OEIL_DU_VIDE`
- `artifact-vitality` → `COEUR_DE_CENDRE`
- `artifact-frenzy` → `NOYAU_INSTABLE`
- `helmet-scout` → `VELOCIS`
- `helmet-guard` → `BASTION-X`
- `helmet-vital` → `FANTOME`
- `module-rate` → `CADENCE`
- `module-power` → `AMPLIFICATEUR`
- `module-xp` → `FRAGMENT_ETHER`

## Validation
Static checks: assets, rarity mapping, JS syntax and unchanged Equipment2 core; no actual iPhone gameplay session executed. iPhone Safari, offline PWA cache, and all visual contexts require user test.
