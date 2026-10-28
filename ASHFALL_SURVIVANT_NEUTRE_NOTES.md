# ASHFALL — Survivant neutre (Accueil + Survivant)

Base : ASHFALL_V9_5_9_BADGES_EQUIPE_CACHEFIX_TEST(1).zip

- Ajout `assets/survivant-neutre-v1.png` (PNG RGBA réellement transparent, détouré depuis l'image fournie).
- Écran Accueil : `#homeHeroSurvivor` affiche le nouveau survivant.
- Écran Survivant : `#characterHeldWeaponImage` affiche le même survivant.
- Le rafraîchissement dynamique dans `game.js` ne remplace plus le portrait par les anciens Nomades pistolet/fusil.
- Les données d'armes, équipement, bordures de rareté, badges, inventaire, combat et sauvegardes ne sont pas modifiés.
- Cache de service worker renouvelé, image ajoutée aux ressources mises en cache.

## À vérifier sur iPhone

1. Ouvrir Accueil puis Survivant, vérifier la transparence, la taille et le cadrage.
2. Équiper une arme différente : l'image centrale reste neutre, le slot ARME et les données changent normalement.
3. Quitter et relancer la PWA, contrôler le rendu et la sauvegarde.

Contrôles statiques effectués ; pas de test interactif iPhone exécuté.
