const CACHE='ashfall-survivor-rarity-v9-5-0-20261027';
const FILES=["./permanent-upgrades-v949.css?v=949","./hud-actions-v944.css?v=pa944","./merchant-reborn.css?v=mr945","./hud-v940.css?v=pa944","./hud-contracts-v943.css?v=pa944","./","./index.html","./game.css?v=mr942","./identity-tokens.css?v=mr942","./identity-components.css?v=mr942","./identity-integrated.css?v=mr942","./loot-phase.css?v=mr942","./progression-phase.css?v=mr942","./equipment-phase.css?v=mr942","./longterm-phase.css?v=mr942","./home-simplified.css?v=mr942","./refuge-ui-clean.css?v=mr942","./equipment2.css?v=mr942","./graphics-p1.css?v=mr942","./assets/hud/nomad-badge.png","./assets/visual2/hero/torso-front.png","./assets/visual2/hero/torso-side.png","./assets/visual2/hero/torso-back.png","./assets/visual2/hero/leg-left.png","./assets/visual2/hero/leg-right.png","./assets/visual2/hero/pack.png","./assets/visual2/hero/pack-side.png","./assets/visual2/manifest.json","./assets/weapons_framed/carbine_k17.png","./assets/weapons_framed/cendre.png","./assets/weapons_framed/impulse.png","./assets/weapons_framed/ion.png","./assets/weapons_framed/nomade9.png","./assets/weapons_framed/pistol_reinforced.png","./assets/weapons_framed/pistol_rescue.png","./assets/weapons_framed/pistol_used.png","./assets/weapons_framed/precision.png","./assets/weapons_framed/prototype.png","./assets/weapons_framed/reliquat.png","./assets/weapons_framed/rifle_industrial.png","./assets/weapons_framed/rifle_recovery.png","./assets/weapons_framed/smg_sector.png","./assets/weapons_framed/spectre.png","./assets/weapons_framed/vektor.png","./assets/chest_common.webp","./assets/chest_common_charging.webp","./assets/chest_common_open.webp","./assets/chest_rare.webp","./assets/chest_rare_charging.webp","./assets/chest_rare_open.webp","./assets/chest_epic.webp","./assets/chest_epic_charging.webp","./assets/chest_epic_open.webp","./assets/nomade/pistol_complete.png","./assets/nomade/rifle_complete.png","./identity.js?v=mr942","./equipment2-core.js?v=ei948","./survivant-topdown.js?v=mr942","./assets/survivant-topdown.png?v=mr942","./p01-graphics.js?v=mr942","./assets/p01v2/floor_concrete.png?v=mr942","./assets/p01v2/floor_metal.png?v=mr942","./assets/p01v2/floor_cracked.png?v=mr942","./assets/p01v2/floor_grate.png?v=mr942","./assets/p01v2/floor_wear.png?v=mr942","./assets/p01v2/floor_hazard.png?v=mr942","./assets/p01v2/floor_hatch.png?v=mr942","./assets/p01v2/floor_tread.png?v=mr942","./assets/p01v2/wall_horizontal.png?v=mr942","./assets/p01v2/wall_horizontal_amber.png?v=mr942","./assets/p01v2/wall_horizontal_pipes.png?v=mr942","./assets/p01v2/wall_vertical.png?v=mr942","./assets/p01v2/wall_corner.png?v=mr942","./assets/p01v2/wall_joint.png?v=mr942","./assets/p01v2/wall_reinforced.png?v=mr942","./assets/p01v2/door_open.png?v=mr942","./assets/p01v2/door_locked.png?v=mr942","./assets/p01v2/door_arena.png?v=mr942","./assets/p01v2/door_frame.png?v=mr942","./assets/p01v2/prop_crate.png?v=mr942","./assets/p01v2/prop_military.png?v=mr942","./assets/p01v2/prop_container.png?v=mr942","./assets/p01v2/prop_generator.png?v=mr942","./assets/p01v2/prop_console.png?v=mr942","./assets/p01v2/prop_machine.png?v=mr942","./assets/p01v2/prop_barrels.png?v=mr942","./assets/p01v2/prop_pipes.png?v=mr942","./assets/p01v2/prop_supply.png?v=mr942","./assets/p01v2/light_amber.png?v=mr942","./assets/p01v2/light_cyan.png?v=mr942","./assets/p01v2/contact_shadow.png?v=mr942","./generator25.js?v=mr942","./game.js?v=sv950","./immersion.js?v=mr942","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('ashfall-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET'||new URL(request.url).origin!==location.origin)return;
 event.respondWith((async()=>{
  try{
   const fresh=await fetch(request,{cache:'no-store'});
   if(fresh.ok){
    const parsed=new URL(request.url);
    if(!parsed.searchParams.has('ashfall_check')&&!parsed.searchParams.has('ashfall_refresh')){
     const copy=fresh.clone();
     const key=request.mode==='navigate'?'./index.html':request;
     event.waitUntil(caches.open(CACHE).then(cache=>cache.put(key,copy)).catch(()=>{}));
    }
   }
   return fresh;
  }catch(err){
   return (await caches.match(request))||(request.mode==='navigate'?await caches.match('./index.html'):null)||Response.error();
  }
 })());
});
