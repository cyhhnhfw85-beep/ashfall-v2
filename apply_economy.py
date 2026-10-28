from pathlib import Path
import re
p=Path('/mnt/data/ashfall_econ_work')
g=(p/'game.js').read_text(); e=(p/'equipment2-core.js').read_text()
def replace_once(s,a,b,label):
 n=s.count(a)
 if n!=1: raise ValueError(f'{label}: expected 1 found {n}')
 return s.replace(a,b,1)
# Economy pricing model: rare items priced according to value and chest risk.
g=replace_once(g,"function merchantPrice(w){let rk=MERCHANT_RANK[w.rar]||0;return Math.max(100,Math.round((Number(w.dmg)*10+Number(w.rate)*60)*(1+rk*.58)/10)*10)}",'''// Économie 0.9.8.0 — valeur garantie vs coffres aléatoires.
const ECON_RARITY_BASE=[750,1400,2900,6900,13500,24000];
function merchantRarityCap(){return Math.min(5,1+merchantTier());}
function merchantPrice(w){
 const rk=MERCHANT_RANK[w.rar]??0;
 // Le modèle de l'arme compte, sans rendre les armes rapides artificiellement bon marché.
 const power=Math.max(1,(Math.max(0,Number(w.dmg)||0)*Math.max(.35,Number(w.rate)||1)));
 const factor=Math.max(.88,Math.min(1.22,.94+power/360));
 return Math.round(ECON_RARITY_BASE[rk]*factor/10)*10;
}''','merchantPrice')
g=replace_once(g,'Math.min(4,1+tier)','Math.min(5,1+tier)','weapon tier cap')
g=replace_once(g,'''function merchantEquipPrice(w){
 if((w.slot||'weapon')==='weapon')return merchantPrice(w);
 const rank=MERCHANT_RANK[w.rar]||0;
 return Math.round((210+Math.max(1,Number(w.level)||1)*65)*(1+rank*.65)/10)*10;
}
function merchantEquipSale(w){
 if((w.slot||'weapon')==='weapon')return salvagePrice(w);
 return Math.min(220,Math.max(12,15*E2.rarityYield(w)));
}''','''function merchantEquipPrice(w){
 if((w.slot||'weapon')==='weapon')return merchantPrice(w);
 const rank=MERCHANT_RANK[w.rar]??0;
 const level=Math.max(1,Math.min(4,Math.floor(Number(w.level)||1)));
 const model=E2.model(w);
 // Les artefacts et les modèles ont une valeur d'usage différente.
 const categoryFactor={armor:1,boots:.94,module:1.06,bag:1.04,artifact:1.13}[w.slot]||1;
 const modelFactor=model?Math.max(.94,Math.min(1.12,1+(Number(model.base)||0)*.12)):1;
 return Math.round(ECON_RARITY_BASE[rank]*categoryFactor*modelFactor*(1+.16*(level-1))/10)*10;
}
function merchantEquipSale(w){
 if((w.slot||'weapon')==='weapon')return salvagePrice(w);
 const rank=MERCHANT_RANK[w.rar]??0;
 const level=Math.max(1,Math.min(4,Math.floor(Number(w.level)||1)));
 // Revente du loot utile, mais jamais plus de 25 % d'un achat documenté.
 let amount=Math.round(([35,65,140,300,550,900][rank])*(1+.15*(level-1))/5)*5;
 if(Number.isFinite(Number(w.purchasePrice))&&Number(w.purchasePrice)>0)
  amount=Math.min(amount,Math.floor(Number(w.purchasePrice)*.25));
 return Math.max(0,amount);
}
function merchantGenerateGear(slot,tier){
 const cap=merchantRarityCap();
 // Rejet borné pour préserver les probabilités relatives sous le plafond.
 let w;
 for(let attempt=0;attempt<100;attempt++){
  w=E2.generate(slot,tier);
  if((MERCHANT_RANK[w.rar]??0)<=cap)return w;
 }
 // Secours extrêmement improbable : pas d'objet hors progression.
 w.rar=Object.keys(MERCHANT_RANK).find(k=>MERCHANT_RANK[k]===cap)||'Commun';
 return w;
}''','equip price and sale')
g=replace_once(g,'const w=E2.generate(slot,merchantTier());','const w=merchantGenerateGear(slot,merchantTier());','gear generator')
# Preserve already owned items; migrate only active offers, once per save. No reroll counter changes.
needle='''  m.rebornGearCycle=tag;
  if(save)persist();
 }
 return m;
}'''
repl='''  m.rebornGearCycle=tag;
  if(save)persist();
 }
 // Les stocks historiques sont conservés, mais leurs offres non vendues sont
 // recalculées et les raretés illégales remplacées une seule fois.
 if(m.economyVersion!==1){
  const cap=merchantRarityCap();
  for(const offer of m.stock){
   if(offer.sold)continue;
   if((MERCHANT_RANK[offer.rar]??0)>cap){
    const slot=offer.slot||'weapon';
    if(slot==='weapon'){
     const pool=MERCHANT_CATALOG.filter(x=>(MERCHANT_RANK[x.rar]??0)<=cap);
     const replacement=pool[Math.floor(Math.random()*pool.length)];
     if(replacement)Object.assign(offer,replacement);
    }else{
     const replacement=merchantGenerateGear(slot,merchantTier());
     const preservedId=offer.offerId;
     Object.assign(offer,replacement,{offerId:preservedId,rebornGear:true,origin:'merchant'});
     delete offer.id;
    }
   }
   offer.price=merchantEquipPrice(offer);
  }
  m.economyVersion=1;
  if(save)persist();
 }
 return m;
}'''
g=replace_once(g,needle,repl,'stock migration')
# On every natural or paid rotation, prices already use new formulas; mark migrated to avoid redundant work.
g=replace_once(g,'m.stock=selected;m.lastRefreshRun=data.runs;m.highestTier=tier;m.cycle++;','m.stock=selected;m.lastRefreshRun=data.runs;m.highestTier=tier;m.cycle++;m.economyVersion=1;','stock rotation')
# on old stock migration if new gear generated while marker is 1, fine.
# Unify enemy kill drops regardless of damage source.
anchor="function runnableKill(run){if(Number.isFinite(run.kills))run.kills++;ashRefreshContractHud(run);}"
replacement=anchor+'''
function awardEnemyDefeat(room,enemy){
 if(!enemy||enemy.lootDropped)return false;
 enemy.lootDropped=true;
 e2OnKill();
 if(data.run)runnableKill(data.run);
 lootSpawn(room,'xp',enemy.x,enemy.y,null,pick(2,5));
 lootSpawn(room,'credits',enemy.x,enemy.y,null,pick(4,10));
 if(Math.random()<.055)lootSpawn(room,'weapon',enemy.x,enemy.y,makeWeapon(sectorOf(room)));
 return true;
}'''
g=replace_once(g,anchor,replacement,'enemy shared function')
g=replace_once(g,'''     enemy.lootDropped=true;
     if(data.run)runnableKill(data.run);
     lootSpawn(room,'xp',enemy.x,enemy.y,null,pick(2,5));
     lootSpawn(room,'credits',enemy.x,enemy.y,null,pick(4,10));''','''     awardEnemyDefeat(room,enemy);''','explosion death')
g=replace_once(g,"e2OnKill();e.lootDropped=true;if(data.run)runnableKill(data.run);lootSpawn(room,'xp',e.x,e.y,null,pick(2,5));lootSpawn(room,'credits',e.x,e.y,null,pick(4,10));if(Math.random()<.055){lootSpawn(room,'weapon',e.x,e.y,makeWeapon(sectorOf(room)))}","awardEnemyDefeat(room,e)",'projectile death')
# sale parity across both UIs
g=g.replace('E2.sell(data,id,salvagePrice)','E2.sell(data,id,salvagePrice,merchantEquipSale)')
e=replace_once(e,'function sell(d,id,weaponPrice){','function sell(d,id,weaponPrice,gearPrice){','sell signature')
e=replace_once(e,"const gain=w.slot==='weapon'?weaponPrice(w):Math.min(220,Math.max(12,15*rarityYield(w)));","const gain=w.slot==='weapon'?weaponPrice(w):(typeof gearPrice==='function'?gearPrice(w):Math.min(220,Math.max(12,15*rarityYield(w))));",'sell gear')
# version / cache
old='0.9.7.3-marchand-actualisation';new='0.9.8.0-equilibrage-economique'
g=g.replace(old,new)
(p/'game.js').write_text(g);(p/'equipment2-core.js').write_text(e)
idx=(p/'index.html').read_text().replace(old,new).replace('game.js?v=973','game.js?v=980').replace('equipment2-core.js?v=lab970a','equipment2-core.js?v=eco980');(p/'index.html').write_text(idx)
sw=(p/'service-worker.js').read_text().replace('ashfall-marchand-refresh-973a','ashfall-economy-980a').replace('game.js?v=973','game.js?v=980').replace('equipment2-core.js?v=lab970a','equipment2-core.js?v=eco980');(p/'service-worker.js').write_text(sw)
(p/'README.md').write_text('ASHFALL 0.9.8.0 — Rééquilibrage économique. Voir CHANGELOG_ASHFALL_0_9_8_0.md.\n')
print('Patched',len(g),len(e))
