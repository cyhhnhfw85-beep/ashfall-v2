# ASHFALL 0.9.7.3 — Actualisation payante du marchand

Base : ASHFALL 0.9.7.2 (archive complète).

- Bouton « Actualiser le stock » dans l'onglet Acheter uniquement, sans changement de la grille des objets.
- Coûts par cycle : 150, 250, 400, 600 et 850 crédits ; maximum 5 actualisations.
- Une actualisation régénère les 7 offres d'armes et les 5 offres d'équipement du catalogue existant, sans garantie de rareté.
- Demande de confirmation avant débit ; débit et changement de stock enregistrés ensemble, retour à l'état précédent en cas d'échec de sauvegarde.
- Compteur d'actualisations persisté dans l'objet marchand de la sauvegarde actuelle, sans réinitialiser les autres données.
- Remise à zéro du compteur seulement à la rotation naturelle (après deux expéditions ou progression du niveau marchand).
- Onglet Vendre et inventaire possédé inchangés.
- Version 0.9.7.3 synchronisée, URLs CSS/JS et cache PWA renouvelés.

## Contrôles

- Syntaxe JS : node --check sur les 10 fichiers JavaScript.
- Simulation du marchand : 12 offres, stabilité à la réouverture, coûts progressifs, limite de 5, réinitialisation au cycle naturel, rollback en cas d'échec de sauvegarde.
- ZIP : test d'intégrité et présence des fichiers référencés dans le cache.

## Validation restante

- Test visuel et comportemental sur Safari iPhone et PWA installée ; export de sauvegarde conseillé avant publication.
