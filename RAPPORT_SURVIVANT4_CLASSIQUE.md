# ASHFALL 0.9.3 — SURVIVANT 4.0 CLASSIQUE

## Objet
Remplacement graphique du survivant jouable par le **Survivant 4.0 classique** à partir de l'image fournie par l'utilisateur.

## Fichiers modifiés
- `assets/survivant-topdown.png` — sprite remplacé par la version 4.0 nettoyée.
- `survivant-topdown.js` — mise à jour du cache-busting de l'image (`v=093sv4c1`) et commentaire de version.
- `service-worker.js` — nouveau nom de cache et mise à jour des références du sprite / script pour forcer le rechargement.
- `index.html` — mise à jour de la référence du script `survivant-topdown.js` et du libellé de version affiché.

## Fichiers ajoutés
- `backup_survivant4/survivant-topdown_ORIGINAL.png` — sauvegarde de la ressource d'origine.
- `RAPPORT_SURVIVANT4_CLASSIQUE.md` — présent rapport.
- `CHANGELOG_SURVIVANT4_CLASSIQUE.md` — synthèse de la livraison.

## Préparation du PNG
- Image source reçue : `32a5a5d1-b8a9-593b-adc4-1f4ce516390a.png`
- Vérification : le damier était intégré à l'image (canal alpha source entièrement opaque).
- Traitement : détourage du personnage avec conservation des détails principaux.
- Export final : PNG RGBA avec vrai canal alpha.
- Canvas final aligné sur la ressource du moteur : **635×1237px**.

## Contrôles techniques effectués
1. Vérification du chemin réellement utilisé par le moteur : `assets/survivant-topdown.png`.
2. Vérification de la présence d'un canal alpha sur le PNG final.
3. Vérification de la taille finale du sprite pour compatibilité avec le rendu existant.
4. Vérification des références de cache (`survivant-topdown.js`, `service-worker.js`, `index.html`).
5. Vérification de l'intégrité de l'archive finale ZIP.

## Résultat attendu en jeu
- Survivant 4.0 visible dans les salles en remplacement de l'ancien sprite.
- Fusil orienté vers le haut au repos.
- Rotation 360° conservée via le système existant.
- Aucun damier ni fond opaque autour du personnage.

## Limites / remarques
- Aucun système de gameplay n'a été modifié.
- Le placement visuel est conservé via le système existant de rendu (`drawImage(..., -20, -39, 40, 78)`).
- La mise à jour du cache a été faite pour limiter le risque d'affichage de l'ancien sprite sur navigateur/PWA.
