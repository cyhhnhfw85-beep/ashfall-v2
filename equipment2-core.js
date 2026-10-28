/* ASHFALL Équipements 2.0 — isolé du moteur historique (aucune dépendance DOM).
   Les règles legacy restent pilotées par game.js tant qu'une ancienne expédition est active. */
(function(root){'use strict';
 const SLOTS=['weapon','armor','boots','module','bag','artifact'];
 const WEIGHTS=[['weapon',54],['armor',13],['boots',10],['module',10],['bag',9],['artifact',4]];
 const LEVEL_BONUS=[0,1,2,3];
 const BAG_CAPACITY=Object.freeze({Commun:6,Inhabituel:8,Rare:10,'Épique':12,'Légendaire':15,Mythique:18});
 function capacity(run){const s=run?.eq2;const extra=Math.max(0,Math.min(8,Number(run?.labLevels?.log01)||0));if(!s)return 8+extra;if(!s.capacityLocked)return 8+extra; if(Number.isSafeInteger(s.capacity))return s.capacity+extra;const bag=(s.startingOwned||[]).find(w=>w.slot==='bag'&&w.id===s.startingSlots?.bag);return (bag?(BAG_CAPACITY[bag.rar]||6):4)+extra;}

 const CATALOG=[
  {id:'armor-fantome',slot:'armor',name:'Fantôme',effect:'resist',base:0.045,desc:'Réduit les dégâts subis'},
  {id:'armor-sentinelle',slot:'armor',name:'Sentinelle',effect:'regen',base:0.28,desc:'Régénération hors pression'},
  {id:'armor-bastion-x',slot:'armor',name:'Bastion-X',effect:'resist',base:0.065,desc:'Protection renforcée'},
  {id:'armor-reactor',slot:'armor',name:'Réactor',effect:'killDamage',base:0.055,desc:'Dégâts accrus après élimination'},
  {id:'boots-velocis',slot:'boots',name:'Vélocis',effect:'speed',base:0.055,desc:'Accélère les déplacements'},
  {id:'boots-ancrage',slot:'boots',name:'Ancrage',effect:'resist',base:0.025,desc:'Stabilité défensive'},
  {id:'boots-impulsion',slot:'boots',name:'Impulsion',effect:'killSpeed',base:0.1,desc:'Accélération après élimination'},
  {id:'bag-scout',slot:'bag',name:'Scout',effect:'credits',base:0.02,desc:'Bonus de crédits extraits'},
  {id:'bag-raven',slot:'bag',name:'Raven',effect:'components',base:1,desc:'Composant bonus à l’extraction longue'},
  {id:'bag-dastion',slot:'bag',name:'Dastion',effect:'secure',base:0,desc:'Sac tactique à grande capacité'},
  {id:'module-cadence',slot:'module',name:'Cadence',effect:'rate',base:0.08,desc:'Cadence de tir améliorée'},
  {id:'module-amplificateur',slot:'module',name:'Amplificateur',effect:'tesla',base:8,desc:'Impulsion électrique automatique'},
  {id:'module-stabilisateur',slot:'module',name:'Stabilisateur',effect:'shield',base:10,desc:'Bouclier périodique automatique'},
  {id:'module-regenerateur',slot:'module',name:'Régénérateur',effect:'medic',base:8,desc:'Soin conditionnel automatique'},
  {id:'artifact-coeur-cendre',slot:'artifact',name:'Cœur de cendre',effect:'healing',base:0.1,desc:'Amplifie les soins'},
  {id:'artifact-oeil-vide',slot:'artifact',name:'Œil du vide',effect:'resonance',base:0.13,desc:'Renforce les impulsions électriques'},
  {id:'artifact-noyau-instable',slot:'artifact',name:'Noyau instable',effect:'frenzy',base:0.045,desc:'Renforce les enchaînements offensifs'},
  {id:'artifact-fragment-ether',slot:'artifact',name:'Fragment d’éther',effect:'xp',base:0.12,desc:'Expérience gagnée améliorée'},
 ];
 const LEGACY=[]; // Legacy loadout migration disabled; no implicit item conversion.
// Compatibility records for restored pre-catalogue items. These are NOT added to loot pools.
// The historical balancing tables are unavailable: effects use the nearest current family
// as an explicit provisional fallback, retaining each item's original model/rarity/level.
 const LEGACY_MODEL_ALIASES=Object.freeze({
  'armor-bastion': 'armor-bastion-x',
  'armor-predator': 'armor-reactor',
  'armor-regenerator': 'armor-sentinelle',
  'boots-scout': 'boots-velocis',
  'boots-spectre': 'boots-impulsion',
  'boots-anchor': 'boots-ancrage',
  'module-tesla': 'module-amplificateur',
  'module-aegis': 'module-stabilisateur',
  'module-medic': 'module-regenerateur',
  'bag-prospector': 'bag-scout',
  'bag-reclaimer': 'bag-raven',
  'bag-securizer': 'bag-dastion',
  'artifact-resonance': 'artifact-oeil-vide',
  'artifact-vitality': 'artifact-coeur-cendre',
  'artifact-frenzy': 'artifact-noyau-instable',
 });
 const LEGACY_COMPAT=Object.freeze(Object.entries(LEGACY_MODEL_ALIASES).map(([id,reference])=>{
  const base=CATALOG.find(m=>m.id===reference);
  return Object.freeze({...base,id,name:id,legacyCompatibility:true});
 }));
 const CATALOG_ALL=[...CATALOG,...LEGACY_COMPAT];
 const RANK={Commun:0,Inhabituel:1,Rare:2,'Épique':3,'Légendaire':4,Mythique:5};
 const SAFE_ID=s=>String(s||'').replace(/[^a-zA-Z0-9-_]/g,'').slice(0,120);
 const copy=x=>JSON.parse(JSON.stringify(x));
 const ids=()=>('e2-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,12));
 const model=x=>CATALOG_ALL.find(m=>m.id===x?.model)||null;
 const rarity=x=>RANK[x?.rar]??0;
 const emptySlots=()=>Object.fromEntries(SLOTS.map(k=>[k,null]));
 const hasStats=x=>x&&typeof x==='object'&&typeof x.id==='string'&&typeof x.slot==='string'&&SLOTS.includes(x.slot);
 const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
 const rarityFactor=x=>1+.12*Math.max(0,rarity(x)-1)+.09*Math.max(0,(x.level||1)-1);
 const buff=x=>{const m=model(x);if(!m)return {};return {[m.effect]:(m.base||0)*(x.origin==='legacy-conversion'?1:rarityFactor(x))*(1+.075*clamp(x.upgrade||0,0,5))*(x.optimized==='efficiency'?1.08:1)*(clamp(Number(x.quality)||100,94,106)/100)};};
 function normalizeWeapon(w){if(!w||typeof w!=='object')return null;return {...w,slot:'weapon',model:w.model||'weapon-legacy',level:clamp(Number(w.level)||1,1,4),upgrade:clamp(Number(w.upgrade)||0,0,5),optimized:w.optimized||null,investedComponents:Number(w.investedComponents)||0};}
 function eq2State(d){return d.eq2&&d.eq2.schema===2?d.eq2:null;}
 function gearItems(d){return eq2State(d)?.gear||[];}
 function owned(d){return [d.equipped,...(d.stash||[]),...gearItems(d)].filter(Boolean).map(w=>(!w.slot||w.slot==='weapon')?normalizeWeapon(w):w);}
 function validate(d){const s=eq2State(d);if(!s)return false;
  const items=owned(d);const allIds=items.map(x=>x.id);
  if(new Set(allIds).size!==allIds.length)return false;
  if(items.some(x=>!hasStats(x)))return false;
  if(Object.keys(s.slots||{}).some(k=>!SLOTS.includes(k)))return false;
  for(const [k,id] of Object.entries(s.slots||{})){if(id&&!items.some(x=>x.id===id&&x.slot===k))return false;}
  return Number.isSafeInteger(s.components)&&s.components>=0;
 }
 // La migration produit un NOUVEL objet; game.js n'écrit le résultat qu'après backup et validation.
 function migrate(d){if(eq2State(d))return copy(d);
  if(d.run)throw Error('legacy run cannot be migrated in place');
  const out=copy(d),legacy=out.loadout&&typeof out.loadout==='object'?out.loadout:{};
  const list=Array.isArray(legacy.owned)?[...new Set(legacy.owned)]:[];
  const gear=[];const keyToId=new Map();
  for(const key of list){const m=LEGACY.find(x=>x.id===key);if(!m)continue;const existing={id:ids(),slot:m.slot,model:m.id,name:m.name,rar:key==='helmet-guard'||key==='module-power'?'Épique':'Rare',level:1,upgrade:0,optimized:null,investedComponents:0,origin:'legacy-conversion',purchasePrice:0};gear.push(existing);keyToId.set(key,existing.id);}
  const slots=emptySlots();slots.weapon=out.equipped?.id||null;
  for(const key of [legacy.helmet,legacy.module]){const obj=gear.find(x=>x.id===keyToId.get(key));if(obj)slots[obj.slot]=obj.id;}
  let insuredComp=0;
  if(out.insured&&out.equipped?.id===out.insured){insuredComp=Math.max(20,Math.ceil((Math.max(20,Math.round((Number(out.equipped.dmg)||0)*17*(out.equipped.rar==='Épique'?2.3:out.equipped.rar==='Rare'?1.5:1))))*.12));out.credits+=insuredComp;}
  out.insured=null;
  out.eq2={schema:2,slots,gear,components:0,insuranceCompensation:{activeItemId:insuredComp?slots.weapon:null,credits:insuredComp,applied:true},migrationId:'eq2-v1',migratedAt:Date.now()};
  if(!validate(out))throw Error('post migration integrity check failed');
  return out;
 }
 // Loot expedition V1: difficulty I is introductory; upper rarities remain reserved for future tiers.
 const EXPEDITION_ODDS=Object.freeze({enemy:[68,25,6.5,.5],chest:[50,34,14,2],arena:[35,40,22,3]});
 function rollExpeditionRarity(source='enemy',difficulty=1,rng=Math.random){
  // Difficulties II-V are not playable yet: never pre-award their prestigious loot.
  const weights=EXPEDITION_ODDS[source]||EXPEDITION_ODDS.enemy;
  const roll=rng()*100;let sum=0;
  for(let i=0;i<weights.length;i++){sum+=weights[i];if(roll<sum)return ['Commun','Inhabituel','Rare','Épique'][i];}
  return 'Commun';
 }
 function generate(slot,sector=0,rng=Math.random,source='enemy',difficulty=1){
  if(!SLOTS.includes(slot))throw Error('unknown equipment slot');
  if(slot==='weapon')throw Error('weapons generated by legacy weapon engine');
  const list=CATALOG.filter(m=>m.slot===slot);const m=list[Math.floor(rng()*list.length)];
  const rar=rollExpeditionRarity(source,difficulty,rng);
  const level=clamp(Math.floor(sector)+1,1,4);
  const statVariance=Math.round((rng()-.5)*12);
  return {id:ids(),slot,model:m.id,name:m.name,rar,level,upgrade:0,optimized:null,investedComponents:0,origin:'expedition',quality:clamp(100+statVariance,94,106),stats:{efficiency:clamp(100+statVariance,94,106),resilience:clamp(2+level+Math.floor(rng()*4),2,10),agility:clamp(1+Math.floor(rng()*4),1,5)}};
 }
 function rollDrop(sector,rng=Math.random,source='enemy',difficulty=1){const n=rng()*100;let sum=0,slot='weapon';for(const [k,w] of WEIGHTS){sum+=w;if(n<sum){slot=k;break}}
  return slot==='weapon'?null:generate(slot,sector,rng,source,difficulty);
 }
 function start(d,run){const s=eq2State(d);if(!s||!validate(d))throw Error('requires valid migrated save');
  const startOwned=SLOTS.map(slot=>owned(d).find(w=>w.id===s.slots[slot]&&w.slot===slot)).filter(Boolean).map(copy);
  const slots=copy(s.slots);run.eq2={version:1,slots,startingSlots:copy(slots),startingOwned:startOwned,loot:[],clearedIds:[],secure:{itemId:null,transfers:0,abandoned:false,activated:false},fx:{shieldReady:true,shieldCooldown:0,healCooldown:0,teslaCooldown:9,killWindow:0,regenCooldown:0},pendingDrop:null,capacity:((bag)=>bag?(BAG_CAPACITY[bag.rar]||6):4)(startOwned.find(w=>w.slot==='bag'&&w.id===slots.bag)),capacityLocked:true};
  if(!validateRun(run))throw Error('invalid run at startup');return run;
 }
 function validateRun(run){if(!run?.eq2)return false;const s=run.eq2;
  if(!Array.isArray(s.loot)||s.loot.length>capacity(run)||new Set(s.loot.map(x=>x.id)).size!==s.loot.length)return false;
  if(s.loot.some(x=>!hasStats(x)))return false;
  const pool=[...s.startingOwned,...s.loot];if(new Set(pool.map(x=>x.id)).size!==pool.length)return false;
  if(SLOTS.some(slot=>s.slots[slot]&&!pool.some(x=>x.id===s.slots[slot]&&x.slot===slot)))return false;
  const id=s.secure.itemId;if(id&&!s.loot.some(x=>x.id===id))return false;
  if(s.secure.transfers>1||s.secure.transfers<0)return false;
  return true;
 }
 function runItem(run,id){const s=run?.eq2;return s?[...s.startingOwned,...s.loot].find(x=>x.id===id):null;}
 function active(run,slot){return runItem(run,run?.eq2?.slots?.[slot]);}
 function current(d,slot){return owned(d).find(x=>x.id===d.eq2?.slots?.[slot]&&x.slot===slot)||null;}
 function profile(run){const out={maxHp:0,speed:0,resist:0,rate:0,damage:0,xp:0,regen:0,killDamage:0,killSpeed:0,slowResist:0,credits:0,components:0,tesla:0,shield:0,medic:0,resonance:0,healing:0,frenzy:0,secure:0};
  for(const slot of SLOTS.slice(1)){const w=active(run,slot);if(!w)continue;for(const [k,v] of Object.entries(buff(w)))out[k]+=(v||0)*(slot==='module'?(1+Math.max(0,Math.min(8,Number(run?.labLevels?.ing01)||0))*.04):1);if(w.stats){out.maxHp+=(Number(w.stats.resilience)||0)*(w.optimized==='resilience'?1.08:1);if(slot==='boots')out.speed+=(Number(w.stats.agility)||0)*(w.optimized==='agility'?1.08:1)*.002;}}
  for(const k of ['damage','resist','rate','speed','credits'])out[k]=Math.min(out[k],.22);
  return out;
 }
 function canEquip(run,itemId){return false;} // Equipement interdit pendant une expédition
 function equip(run,itemId){return false;}
 function canPickup(run,item){return !!(run?.eq2&&hasStats(item)&&!run.eq2.loot.some(x=>x.id===item.id)&&run.eq2.loot.length<capacity(run));}
 function pickup(run,item){if(!canPickup(run,item))return false;run.eq2.loot.push(item.slot==='weapon'?normalizeWeapon(item):copy(item));if(!validateRun(run)){run.eq2.loot.pop();return false;}return true;}
 function clearRoom(run,id){} // L'assurance de butin est retirée
 function secure(run,itemId){return false;}
 function transfer(run,itemId){return false;}
 function renounce(run){return false;}
 function drop(run,itemId){const s=run?.eq2;if(!s||s.secure.itemId===itemId)return null;const i=s.loot.findIndex(x=>x.id===itemId);if(i<0)return null;const previous=copy(s.slots);const [item]=s.loot.splice(i,1);
  if(s.slots[item.slot]===item.id)s.slots[item.slot]=s.startingSlots[item.slot]||null;
  if(!validateRun(run)){s.loot.splice(i,0,item);s.slots=previous;return null;}return item;
 }
 function finalize(d,run,won){if(!run?.eq2)throw Error('missing equipment 2 run');if(!validateRun(run))throw Error('run integrity before finish');
  const s=run.eq2,acquired=won?s.loot.slice():[],lost=won?[]:s.loot.slice();
  const out=copy(d),curr=eq2State(out);if(!curr)throw Error('missing home state');
  if(!out.equipped)out.equipped=copy(s.startingOwned.find(w=>w.slot==='weapon')||null);
  const existingIds=new Set(owned(out).map(w=>w.id));for(const w of acquired){if(existingIds.has(w.id))throw Error('acquired item duplication');existingIds.add(w.id);if(w.slot==='weapon')out.stash.push(copy(w));else curr.gear.push(copy(w));}
  const selected=s.startingSlots; // Le matériel porté reste verrouillé du départ au retour
  const desired=copy(selected);
  for(const slot of SLOTS){if(desired[slot]&&!owned(out).some(w=>w.id===desired[slot]&&w.slot===slot))desired[slot]=s.startingSlots[slot]||null;}
  const activeWeapon=owned(out).find(w=>w.id===desired.weapon)||out.equipped;
  if(activeWeapon&&out.equipped?.id!==activeWeapon.id){out.stash=out.stash.filter(w=>w.id!==activeWeapon.id);if(out.equipped)out.stash.push(out.equipped);out.equipped=activeWeapon;}
  curr.slots=desired;
  const prospector=active(run,'bag')?.model==='bag-scout'&&won;
  const gatherer=active(run,'bag')?.model==='bag-raven'&&won;
  const creditsBonus=prospector?Math.min(80,Math.floor((run.earnedCredits||0)*.02)):0;
  const compsBonus=gatherer&&new Set(run.visited||[]).size>=15?1:0;
  curr.components+=compsBonus;
  if(!validate(out))throw Error('post extraction integrity');
  return {state:out,acquired,lost,creditsBonus,componentsBonus:compsBonus};
 }
 function rarityYield(w){const base={Commun:1,Inhabituel:1,Rare:2,'Épique':3,'Légendaire':5,Mythique:6}[w.rar]||1;return base+Math.max(0,(w.level||1)-1);}
 function upgradeCost(w){const n=w.upgrade||0;if(n>=5)return null;return {credits:70*(n+1)*(w.level||1),components:2+n+Math.max(0,(w.level||1)-1)};}
 function optimizeCost(w){return {credits:120*(w.level||1),components:4+(w.level||1)};}
 function applyUpgrade(d,id){const item=owned(d).find(x=>x.id===id);if(!item||!eq2State(d))return false;const cost=upgradeCost(item);if(!cost||d.credits<cost.credits||d.eq2.components<cost.components)return false;
  d.credits-=cost.credits;d.eq2.components-=cost.components;
  const target=item.slot==='weapon'?[d.equipped,...d.stash].find(x=>x?.id===id):d.eq2.gear.find(x=>x.id===id);
  target.upgrade=(target.upgrade||0)+1;target.investedComponents=(target.investedComponents||0)+cost.components;
  return true;
 }
 function applyOptimize(d,id,stat){const item=owned(d).find(x=>x.id===id);const allowed=item?.slot==='weapon'?['dmg','rate']:['efficiency','resilience','agility'];if(!allowed.includes(stat)||!eq2State(d))return false;const cost=optimizeCost(item);if(d.credits<cost.credits||d.eq2.components<cost.components)return false;
  const target=item.slot==='weapon'?[d.equipped,...d.stash].find(x=>x?.id===id):d.eq2.gear.find(x=>x.id===id);
  d.credits-=cost.credits;d.eq2.components-=cost.components;target.optimized=stat;return true;
 }
 function recycle(d,id){if(!eq2State(d)||id===d.eq2.slots.weapon||Object.values(d.eq2.slots).includes(id))return null;
  let pool,index,w;const idx=(d.stash||[]).findIndex(x=>x.id===id);
  if(idx>=0){pool=d.stash;index=idx;w=pool[idx];}else{pool=d.eq2.gear;index=pool.findIndex(x=>x.id===id);if(index<0)return null;w=pool[index];}
  const gain=rarityYield(w)+Math.floor((Number(w.investedComponents)||0)*.5);
  pool.splice(index,1);d.eq2.components+=gain;return gain;
 }
 function sell(d,id,weaponPrice,gearPrice){if(!eq2State(d)||Object.values(d.eq2.slots).includes(id))return null;
  let pool=(d.stash||[]),index=pool.findIndex(x=>x.id===id);let w;if(index>=0)w=pool[index];else{pool=d.eq2.gear;index=pool.findIndex(x=>x.id===id);if(index<0)return null;w=pool[index]}
  const gain=w.slot==='weapon'?weaponPrice(w):(typeof gearPrice==='function'?gearPrice(w):Math.min(220,Math.max(12,15*rarityYield(w))));
  pool.splice(index,1);d.credits+=gain;return gain;
 }
 root.AshEquipment2=Object.freeze({SLOTS,CATALOG,LEGACY,CATALOG_ALL,WEIGHTS,emptySlots,model,buff,owned,gearItems,current,migrate,validate,start,validateRun,runItem,active,profile,generate,rollDrop,rollExpeditionRarity,canEquip,equip,pickup,canPickup,clearRoom,secure,transfer,renounce,drop,finalize,rarityYield,upgradeCost,optimizeCost,applyUpgrade,applyOptimize,recycle,sell,normalizeWeapon,capacity,BAG_CAPACITY});
})(typeof window!=='undefined'?window:globalThis);
