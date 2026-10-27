# ASHFALL 0.9.3 — Alpha V6 — illustrations 07–12

## Réalisation
Six fonds illustrés intégrés : salle 07 Entrepôt sécurisé, 08 Ravitaillement, 09 Poste de défense, 10 Sas de sécurité, 11 Arène du Mécha, 12 Extraction finale.
Images ajustées au canvas logique sans étirer les objets, avec extension de bords lorsque le rapport d'aspect de la source ne correspond pas exactement.

## Conservations
- Fonds illustrés 01 à 06 STRICTEMENT identiques à la V5.5 (SHA256 égaux).
- rooms.json et son architecture, ses portes, collisions et logique inchangés.
- Survivant 4.0 et moteur inchangés.
- GitHub inchangé.

## Réserves et validation
Le placement des portes et obstacles du prototype (07–12) n'est pas automatiquement recalculé depuis les nouvelles illustrations.
09 : porte nord dessinée au centre du fond, alors que le prototype la programme à X=180 ; correction graphique ou technique à valider.
08 : plateforme cyan dans le fond : décor uniquement, non liée à un objet interactif.
07–12 : collisions à auditer / valider sur iPhone ; des obstacles visibles peuvent ne pas correspondre aux rectangles existants.
Pas de test de navigation réel sur appareil ni de validation artistique finale.

## Contrôles
- Dimensions de chaque nouveau WebP conformes à rooms.json.
- Archives ZIP vérifiées après création.
