# ASHFALL V6.2 — Cartographie détaillée des collisions

Base: Alpha V6.1. Fonds illustrés: **12/12 octet pour octet identiques** (SHA-256).

- **Zones bloquantes** tracées manuellement à partir des 12 vrais décors; `64` polygones de volumes.
- Collisions **cercle contre polygone**, prenant en compte les arêtes et les angles; anti-traversée avec sous-pas existants.
- Limites extérieures infranchissables.
- Alignement de porte nord salle 09 corrigé : X=360 (porte visuelle centrale).
- Coffre logistique 03 : point d’interaction déplacé de X=545 vers X=475 afin de rester accessible devant le stockage solide.
- Apparition sécurisée à chaque transition (recherche d'espace libre si position bloquée).
- Images de contrôle `CONTROLE_01.png` à `CONTROLE_12.png` en livraison séparée.
- Test géométrique de connexions des portes : OK.

## Limites
Contours tracés manuellement; leur finesse doit être contrôlée avec les aperçus et sur iPhone. Les coffres/ennemis restent gérés séparément; aucune modification de leurs visuels, de l'économie ou des sauvegardes.
