Bestiary 3D V1.1 visibility safety patch.
The 3D renderer no longer suppresses the existing 2D enemy draw.
The legacy enemy is always rendered, then 3D overlay attempted.
This is a conservative compatibility fix for reported invisible enemies.
Enemy AI, damage, loot, hitboxes, player, HUD, save logic unchanged.
Known tradeoff: possible visual overlap of 2D and 3D until the 3D cause is verified.
Syntax and ZIP integrity checked; iPhone test still needed.
