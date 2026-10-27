# ASHFALL Alpha V5.5 — Correctif salles 01–06

## Portes et transitions
- Salles 01, 02, 03, 04 : aucune connexion ni coordonnée de porte modifiée (déjà alignées globalement).
- Salle 05 : porte sud **conservée à X=180** : l'illustration réelle la représente décentrée à gauche. Contrairement au premier diagnostic, changer vers X=360 aurait créé une erreur. Entrée depuis 02 corrigée : apparition à X=180. Porte nord X=360 conservée.
- Salle 06 : portes latérales déplacées de Y=400 à Y=600 pour aligner les ouvertures illustrées. Le positionnement d'arrivée est désormais calculé à partir des portes réelles de la salle destination, toutes transitions confondues.
- Connexions entre les 12 salles inchangées. Les salles 07 et 08 restent avec leur porte latérale à Y=400, l'arrivée y est cohérente.

## Collisions
- 01 / 02 : conservées ; audit visuel précédent n'a pas trouvé d'erreur majeure.
- 03 : ajout collision pour la petite caisse centrale représentée au sol.
- 04 : conservées ; les cinq zones correspondent aux cinq groupes de machines.
- 05 : deux groupes de machines latérales supérieurs, le générateur central et deux groupes latéraux inférieurs ajustés au décor. La console de réactivation est déplacée sur le sol praticable devant le générateur (X=360,Y=605) ; logique et marqueur visuel restent synchronisés.
- 06 : quatre ensembles de machines dans les coins ; axe central et croisements des quatre portes dégagés.

## Conservation et limites
- Aucun fond illustré ni autre fichier image modifié.
- Aucun changement d'économie, d'équipements, du bestiaire ou de sauvegardes.
- Tests statiques des données, de syntaxe JS et d'intégrité ZIP effectués ; non testé sur un vrai iPhone. Vérifier les 4 transitions de 06, la console de 05, la caisse centrale en 03 et le passage des obstacles 05/06.
