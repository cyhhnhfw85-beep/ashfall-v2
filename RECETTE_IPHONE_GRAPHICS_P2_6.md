# Recette iPhone — ASHFALL P2.6 (sans risque pour la sauvegarde principale)

1. **Exporter** depuis la PWA actuelle une sauvegarde et en garder une copie hors du téléphone si possible. Conserver les ZIP P2.5 et P2.6.
2. Préférer déployer P2.6 sur **une autre origine HTTPS de test**. Son `localStorage` est distinct ; un export peut être importé explicitement si nécessaire. Ne pas supprimer la PWA ni les données de l'origine principale.
3. Ouvrir la version de test et vérifier l'étiquette `0.9.2-graphics-p2.6-art-polish`.
4. À l'écran d'expédition : observer successivement face, 3/4, profil et dos en tournant le personnage, au repos et en marche. Contrôler les coutures et le contraste à taille réelle, sans zoom.
5. Vérifier les superpositions avec/sans sac, arme courte puis longue, armure, bottes, et les huit directions.
6. Effectuer une extraction et une reprise ; confirmer l'absence de régression de sauvegarde.
7. Tester ensuite la réouverture hors ligne, **uniquement sur l'origine de test**, puis documenter les bugs éventuels avec captures et modèle iPhone.
8. Si l'apparence ne convient pas, **ne pas publier P2.6** ; la P2.5 historique demeure inchangée, et il suffit de revenir à l'archive P2.5 sur l'environnement de test. Ne jamais effacer les données de la PWA principale.

La vérification du pré-cache dans le rapport est une vérification statique des chemins ; elle n'atteste pas du fonctionnement hors ligne sur Safari iOS.
