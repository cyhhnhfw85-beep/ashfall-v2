# ASHFALL — Tactical Map V3 : persistance du zoom (laboratoire)

**NE PAS INSTALLER SUR GITHUB MAIN.** Copie expérimentale uniquement.

Changement ciblé dans `game.js`, composant `ashV32TacticalInteractions` : lorsque l’interface recrée la grande carte V32, le niveau de zoom et le cadrage relatif de l’ancienne vue sont réappliqués au nouveau SVG. Le libellé de pourcentage est synchronisé. Les cartes V31 ne sont pas concernées.

Vérifications effectuées : `node --check game.js`, intégrité du nouveau ZIP, différence limitée au bloc de restauration de vue (hors ajout de cette note). Aucun test tactile sur Safari iPhone ni essai complet de gameplay n'a été réalisé.

À tester sur iPhone : ouvrir la carte, zoomer, fermer et rouvrir, changer de salle, rouvrir; tester pincement, panoramique, recentrage et « Tout voir ». Vérifier les sauvegardes séparément.
