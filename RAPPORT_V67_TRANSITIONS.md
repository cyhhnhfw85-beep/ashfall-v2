# ASHFALL Alpha V6.7 — anti-boucle de transitions

Base V6.6. Moteur `fixedworld.js` corrigé.

- Apparition désormais à 112 unités du bord (au lieu de 72/75), hors de la zone active (78 unités).
- Verrou temporaire par entrée de salle: toute nouvelle transition exige que le Survivant ait quitté les zones de porte de la salle d’arrivée.
- Aucune dépendance temporelle : le verrou est levé par la position du personnage, pas par un compte à rebours.
- Fonctionne sur les 22 ouvertures, dont 05 ↔ 06, sans altérer les transitions volontaires.
- 12 fonds illustrés et masques PNG inchangés.
- Tester sur iPhone : sortie N de 05 -> entrée S de 06, puis retour volontaire et toutes les autres connexions.
