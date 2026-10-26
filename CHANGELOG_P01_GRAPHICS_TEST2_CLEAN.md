# ASHFALL 0.9.2 — P01 Graphics TEST 2 CLEAN

## Correction
- Retrait du fallback graphique vers l'ancien Nomade `AshPaperDollV1` dans les expéditions.
- Rendu du Survivant 3.0 par son image unique, rotation 360°, dimensions 40 x 78 inchangées.
- URL de sprite versionnée pour contourner les anciennes réponses du cache PWA.
- Silhouette de secours neutre conservée en cas d'échec du chargement de l'image, sans retour à l'ancien skin.

## Nettoyage ciblé
- Suppression des 50 fichiers de l'ancien ensemble `assets/skins/nomad-v2/`.
- Suppression des scripts devenus inutiles `survivor-paperdoll.js` et `survivor-visual-resolver.js`.
- Nettoyage des références HTML et service worker.
- Autres anciens assets laissés en place car leur absence de dépendances fonctionnelles n'est pas entièrement établie, notamment les illustrations du refuge.

## Limites
- Décor P01 TEST 1 inchangé : toujours à reprendre artistiquement.
- Aucun test réel sur iPhone effectué.
- Conserver TEST 2 du Survivant comme restauration sûre.
