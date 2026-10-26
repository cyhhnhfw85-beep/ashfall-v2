# ASHFALL — Rapport DEV, pilote Nomade modulaire P2.4

## Mission, base, portée
**Mission :** créer un skin pilote réutilisable et le raccorder au vrai jeu, avec une priorité absolue à l'absence de retour involontaire à l'ancien skin.

**Base :** ASHFALL 0.9.2 Graphics P2.3, SHA-256 du ZIP original `7cb6af8e885948cc4b141e323764ee091fa6daa1733afb2dbd532df27864460e`.

**Livraison :** `0.9.2-graphics-p2.4-pilot` — version de test, non publiée.

## Architecture
- **`survivor-visual-resolver.js`** : lit les données d'équipement sans mutation ; recherche les correspondances d'armes et variations numérotées. En absence d'identifiant exact, renvoie une **classe graphique générique** (pistolet/SMG/fusil/précision/énergie).
- **`survivor-paperdoll.js`** : cinq vues, leurs miroirs, image par pièce, ancre commune, jambes animées et sac optionnel ; arme en calque distinct suivant l'angle de visée réel fourni par le moteur. Il ne modifie aucun état métier.
- **`assets/skins/nomad-v2/manifest.json`** : contrat des vues, directions, résolutions, noms de calques et politiques de secours.
- **`game.js`** : exclusivement raccordement graphique et chaîne de version ; l'appel automatique à `drawNomadGameplay()` est retiré de la boucle de rendu, la fonction originale restant présente et non appelée.
- **`index.html`, `service-worker.js`** : chargement des deux scripts du pilote, nouvelle version et pré-cache des ressources.

## Structure du pack
Chaque vue (`front`, `front-quarter`, `side`, `back-quarter`, `back`) possède : `head`, `torso`, `hips`, `arm-far`, `arm-near`, `leg-left`, `leg-right`, `bag`. Les fragments PNG transparents ont la même taille source **112×230** pour assurer l'alignement et un ancrage fixe ; leurs dimensions d'affichage sont définies en unités du monde par le renderer. Le sac n'est dessiné que lorsque l'emplacement correspondant est occupé.

**Adaptation au standard V1** : le canevas source proposé de 256×320 est réduit ici à 112×230, pour limiter mémoire et chargement. La vue trois-quarts dos est techniquement dérivée de la vue arrière plutôt que peinte séparément. Les phases de marche sont produites par translation/rotation de jambes séparées plutôt que quatre images par vue. Ces choix sont adaptés à un *pilote* et devront être réexaminés avant la production finale des skins.

## Diagnostic du fallback historique, et correction
La référence P2.3 demandait un identifiant d'arme par table de noms exacts et toutes les images de sac dès qu'un sac était porté. Lorsqu'une correspondance manquait, `AshNomad2.draw()` renvoyait `false` et la boucle appelait le Nomade procédural historique.

Dans le pilote P2.4, le résolveur central reconnaît les variantes et les noms usuels ; toute image manquante donne une **représentation du même style**, pas une sortie vers `drawNomadGameplay()` :
- arme inconnue / PNG manquant : silhouette d'arme générique liée à sa classe présumée depuis le libellé ;
- sac manquant : petit sac neutre ;
- composant essentiel manquant : silhouette tactique sombre intégrée au renderer ;
- script modulaire entier indisponible : silhouette d'urgence minimaliste intégrée au raccordement du moteur.

Un **rendu volontaire du survivant historique** demeure impossible par la boucle normale du jeu, puisque sa fonction n'est plus appelée. La compatibilité du moteur historique a été préservée au niveau du code source, mais le mode de repli est désormais toujours visuellement dans la famille Nomade modulaire.

## Fichiers modifiés et ajoutés
- **Modifiés :** `game.js`, `index.html`, `service-worker.js`.
- **Ajoutés :** `survivor-visual-resolver.js`, `survivor-paperdoll.js`, `assets/skins/nomad-v2/manifest.json`, 49 PNG sous `assets/skins/nomad-v2/` (40 fragments + 5 images maîtresses sans sac + 4 sources non découpées du tableau approuvé), les présents documents.
- **Conservés octet par octet :** `equipment2-core.js`, les anciens dossiers et visuels, les CSS, les fichiers de sauvegardes/format, le moteur d'ennemis.

## Validation
Voir `VALIDATION_P24_MODULAIRE.md` et les captures fournies. Ont été exécutés : contrôle du chargement du jeu réel dans Chromium, 128 combinaisons de dessin, erreur simulée d'image obligatoire ou optionnelle, quatre formats mobiles, ouverture d'une expédition, syntaxe JS, vérification du pré-cache et de l'intégrité de l'archive.

**Non effectués :** séance sur iPhone, mise à jour PWA réelle, tests complets extraction/mort/sauvegarde, mesures de performances mobiles.

## Limites artistiques explicites
Cette première version a une silhouette bien plus cohérente grâce aux vues sources approuvées, mais **n'atteint pas encore une finition commerciale**. Le dos et le profil sans sac sont reconstitués partiellement ; la vue trois-quarts dos et les bras en visée extrême nécessitent un travail d'illustration et d'animation supplémentaire. Les variantes d'armure/bottes restent des accents, pas un sprite par modèle. Ne pas traiter les planches de rendu comme une validation iPhone.

## Procédure de vérification iPhone
1. Exporter la sauvegarde actuelle P2.3 depuis son interface et garder le ZIP P2.3 intact.
2. Pour un test sans risque sur la sauvegarde principale, charger P2.4 sur une **origine HTTPS distincte** : sa base localStorage est indépendante. Un simple autre chemin sous le même domaine ne garantit pas cette séparation.
3. Vérifier la version `0.9.2-graphics-p2.4-pilot`, la disponibilité des 40 parties graphiques, le fonctionnement du joystick et la tenue d'arme.
4. Tester toutes les directions, avec/sans sac, variantes d'armes, reprise et mode hors ligne après premier chargement.
5. Pour le retour arrière, remettre l'archive P2.3 sur le site de test et recharger. Ne pas effacer les données de la PWA principale.

## TRANSMISSION À ASHFALL PROMPT
1. **Mission :** réalisation et intégration locale du premier Nomade paper doll modulaire.
2. **Version source :** ASHFALL 0.9.2 Graphics P2.3, archive protégée intacte.
3. **Version produite :** ASHFALL `0.9.2-graphics-p2.4-pilot` (prototype jouable).
4. **Fichiers :** `game.js`, `index.html`, `service-worker.js` modifiés ; deux modules JS et pack 50 ressources/manifest ajoutés ; rapports créés.
5. **Fonctionnalités :** cinq vues + miroir, pièces distinctes, arme indépendante, résolveur de variations, sac optionnel, marche visuelle, fallback nouveau-style sans ancien skin.
6. **Tests :** 128/128 dessins, trois cas de ressources absentes, quatre lancements d'expédition Chromium, syntaxes et pré-cache contrôlés ; aucun test iPhone ni FPS.
7. **Risques :** trois-quarts dos dérivé, nettoyage des textures du sac à raffiner, articulation des bras rudimentaire, recette réelle iPhone et PWA encore ouverte.
8. **Livrables :** ZIP complet, captures matrices/jeu, présent rapport, changelog et validation.
9. **Validation demandée :** revue artistique du pilote et recette iPhone avant toute généralisation et avant Bestiaire 2.0.

**DESTINATAIRE : ASHFALL PROMPT**

**ACTION : Transmettre le ZIP, les captures et le rapport de développement à ASHFALL PROMPT pour analyse avant toute publication ou poursuite.**
