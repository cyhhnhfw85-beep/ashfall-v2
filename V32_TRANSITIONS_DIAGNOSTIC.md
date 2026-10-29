# Geometry V32 — Diagnostic de continuité visuelle (laboratoire seulement)

Le moteur conserve la marge de 47 unités en entrée de salle ; aucun comportement de `enter()`, `transition()`, collisions ou sauvegarde n’a été changé.

Le panneau de diagnostic distingue la position brute (cercle cyan) du marqueur lissé (point blanc) pendant 180 ms à chaque changement de salle. Il affiche le nombre de passages et la distance entre les deux positions observées lors du dernier passage (cette distance varie selon la fréquence de rafraîchissement, et ne mesure PAS la collision).

## Tests manuels nécessaires
1. Lancer une expédition V32, s’approcher d’une porte et la franchir dans chaque sens.
2. Vérifier que le point blanc traverse visuellement la frontière et que le cercle cyan marque la position réelle.
3. Essayer deux portes sur un même côté, une salle boss, une extraction, et le retour depuis un avant-poste.
4. Contrôler que les obstacles, coffres, installations et ennemis ne bloquent pas les ouvertures.
5. Fermer/recharger Safari et vérifier la reprise d’expédition.

**Non validé sur navigateur/iPhone par les tests automatisés.** Le lissage cosmétique n'élimine pas le téléport de gameplay ; il prépare seulement un affichage fidèle.
