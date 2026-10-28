# ASHFALL V2.2 — Phase 2 : équipements et bonus

Source : ASHFALL V2.1 Phase 1. Aucun changement GitHub ni écriture dans les sauvegardes utilisateur.

## Corrections vérifiées

1. Les sacs historiques `bag-prospector` et `bag-reclaimer` étaient reconnus pour leurs statistiques, mais **leurs bonus d'extraction n'étaient jamais appliqués**, car `finalize()` testait seulement les identifiants des sacs modernes. Les deux modèles historiques sont désormais pris en charge : +2 % de crédits (plafond 80) et +1 composant pour une extraction de 15 salles ou plus, respectivement.
2. La texture des bottes historiques `boots-spectre` pointait vers Vélocis alors que leur comportement correspond à Impulsion. Le visuel de substitution a été aligné.
3. La validation des sauvegardes refuse désormais les équipements dont le modèle est inconnu ou incompatible avec leur emplacement, au lieu de laisser un bonus silencieusement nul. Elle vérifie également que `eq2.gear` est bien une liste et que `eq2.slots` est présent.
4. La validation des expéditions vérifie la présence des structures requises avant de les parcourir, réduisant les erreurs sur sauvegardes malformées.

## Tests

- Node.js : 205 cas contrôlés (18 modèles actuels + 15 historiques × 6 raretés, 4 bonus de sacs, 3 validations). PASS.
- `node --check` sur les deux fichiers modifiés : PASS.
- Archive complète : contrôle d'intégrité ZIP et scripts JavaScript, références HTML : à vérifier dans la livraison.

## Limites importantes

- Les 15 anciens modèles utilisent toujours des **effets de substitution** provenant du catalogue actuel : les valeurs historiques exactes ne sont pas retrouvées.
- Les bonus ne sont pas tous validés en situation réelle de combat sur Safari iPhone ; il reste des tests de jeu à réaliser.
- La validation stricte peut refuser une sauvegarde contenant un modèle historique non couvert : il faut alors conserver la sauvegarde et traiter explicitement ce modèle, sans supprimer l'objet.
- Aucune modification volontaire des taux de butin, prix, raretés ou niveaux.
