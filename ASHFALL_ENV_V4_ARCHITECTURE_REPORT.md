# ASHFALL 0.9.8.2 — Environment V4 Architecture Procedurale
Base: ASHFALL 0.9.8.2 Environment V3.1.
New expedition rooms only: envArchitectureV4 flag. Existing saves unchanged.
In standard/guarded/secret rooms, generate up to 2-3 physical industrial obstacles per cell, only in peripheral work zones, avoid existing obstacles/interactables, validate centre-to-cell-centre traversability using radius-expanded BFS.
The same roomObstacles() geometry is consumed by movement, enemies, projectile collisions and rendering. No phantom collisions. Door and mandatory objective accessibility needs actual playtesting.
New: six procedural architectural floor identities, perimeter braces, enhanced obstacle massing.
Not done: full enemy pathfinding, complete automated end-to-end tests, iPhone FPS measurements.
8/10 or 8.5/10 NOT claimed. ZIP and JS syntax checked.
