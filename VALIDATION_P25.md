# Validation ciblée — Graphics P2.5

## Exécutés et réussis
- Source P2.4 : ZIP testé intègre ; SHA-256 `d7611ecfdf07a5b026dab8f202efb39a06e06abcfb5fce709c9694c7aaac351d`.
- Fragments : 40 sur 40 PNG en 112 × 230, aucun manquant/vide.
- Rendu Chromium réel du module paper doll : 40/40 repos + 40/40 marche + 10/10 vues principales = **90/90 dessins réussis**.
- Comptage des images Canvas : **40/40** états, sac non dessiné quand absent, arme non dessinée en mode de test désarmé, une seule image d'arme quand équipée.
- 3/3 ressources manquantes provoquées (sac, tête, arme) : fallback modulaire valide.
- 4/4 départs d'expédition dans le jeu complet (Chromium 320 / 375 / 390 / 430 px CSS), **0 exception JS remontée**.
- Sauvegarde : le schéma et les fonctions du jeu sont identiques à P2.4 ; une reprise de sauvegarde réelle P2.4 → P2.5 n’a pas été rejouée dans cette validation finale. Les captures avant/après sont prises lors de sessions distinctes.
- Code métier : `equipment2-core.js` et `survivor-visual-resolver.js` strictement identiques à P2.4. `game.js` identique après normalisation de la chaîne de version.
- Service worker : 100 entrées de pré-cache, aucune ressource manquante.
- Scripts : contrôles `node --check` effectués sur les scripts modifiés et les scripts principaux.
- ZIP final : `unzip -t` après réextraction, archive complète et chemins valides.

- **61/61 contrôles automatisés supplémentaires** (`RESULTATS_CONTROLES_P25.json`) : code protégé, 40 calques, 100 liens PWA, comptage des armes et résolveur.
- Déplacement effectivement mesuré en Chromium à 390 px : x=180 → x≈255 après 600 ms, sans erreur JS, via une sonde uniquement instrumentée dans le banc. Carte, sac et pause ouverts.
- Captures réelles du jeu : 320, 375, 390 et 430 px CSS, sans débordement horizontal.

## Échoués
- Aucun échec dans les scénarios automatisés effectivement exécutés.

## Non exécutés
- Safari / PWA installée sur iPhone.
- Cycle service worker réellement actif, première installation et démarrage hors ligne iOS.
- Partie complète jusqu'à extraction et mort sur cette P2.5.
- Rechargement spécifique d’une sauvegarde historique P2.4 dans P2.5 après empaquetage final.
- Toutes les configurations réelles d’équipement depuis le refuge (matrice testée sur le renderer, pas via toutes les interactions de l'atelier).
- FPS, mémoire, énergie et latence tactile iPhone.

## Point d'acceptation artistique
Les vestes redessinées dans les vues dos/3⁄4 restent des fragments pilotes ; les planches de rendu ne constituent **pas** une validation artistique sur appareil réel.
