ASHFALL 0.9.7.3 — Actualisation payante du marchand. Voir CHANGELOG_ASHFALL_0_9_7_3.md.

# ASHFALL — Version actuelle 0.9.7.2-laboratoire-k17-stabilisation

**Base :** archive complète fournie par l'utilisateur (`Nouveau dossier.zip`), version 0.9.7.1.
**Correctif 0.9.7.2 :** synchronisation de l'identifiant de build entre l'interface et le moteur ; nouvelle clé de cache du service worker ; ajout de la feuille `expedition-bag-detail-fix.css` au précache ; actualisation de la référence de `game.js` et de la feuille CSS dans `index.html`.

Le gameplay, le catalogue d'objets, les achats, les statistiques et les règles de migration des sauvegardes ne sont **pas modifiés** par ce correctif.

**Installation :** publier le contenu du dossier de jeu à la racine du site en remplaçant l'ensemble des fichiers du build. Ne pas effacer les données du navigateur ni le stockage local. Exporter une sauvegarde avant mise à jour. Sur iPhone, ouvrir le jeu en ligne après déploiement pour permettre l'installation du nouveau cache, puis vérifier le mode hors ligne.

**Limites :** la compatibilité de toutes les anciennes sauvegardes et les parcours complets sur Safari iPhone nécessitent une validation manuelle. Les technologies verrouillées du laboratoire restent intentionnellement verrouillées.

---

## Documentation historique

# ASHFALL — Version 0.9.1-graphics-p1.1

Version de jeu complète, basée exclusivement sur ASHFALL 0.9.0-beta.1 Équipements 2.0, et sur le correctif d'interface P1.1 pour HUD/joystick. Pas de nouvelle étape 2 engagée.

- `index.html` : point d'entrée PWA HTML.
- `game.js` : moteur original, uniquement version et présentation d'un texte de contrat ajustés.
- `graphics-p1.css` : nouveau HUD premium et joystick visuellement modernisé.
- `assets/hud/nomad-badge.png` : portrait extrait de la maquette artistique fournie.
- `equipment2-core.js` : mécanique Équipements 2.0 historique inchangée.
- `service-worker.js` : cache PWA 0.9.1 P1.1 avec toutes les ressources nécessaires.

Lire `CHANGELOG_GRAPHICS_P1_1.md`, `RAPPORT_GRAPHICS_P1_1.md`, `VALIDATION_GRAPHICS_P1_1.md` et `INSTALLATION_IPHONE_GRAPHICS_P1_1.md` avant déploiement.

**Sauvegardes** : conserver un export. L'installation remplace les fichiers du site, pas les données de progression. Les tests Safari iPhone doivent encore être réalisés par le propriétaire.


## Correctif publication/cache V9.2.8.1
Identifiant unique : 0.9.3-procedural-equipment-v9.2.8.1
Synchronisation index.html, game.js, service-worker.js sans reinitialisation des sauvegardes. Deployer tous les fichiers.
