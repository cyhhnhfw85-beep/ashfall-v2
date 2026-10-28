const fs=require('fs'),vm=require('vm'),assert=require('assert');
const dir=__dirname, code=fs.readFileSync(dir+'/game.js','utf8'), ecode=fs.readFileSync(dir+'/equipment2-core.js','utf8');
const ctx={Math,Date,console};ctx.globalThis=ctx;vm.createContext(ctx);vm.runInContext(ecode,ctx);
const E2=ctx.AshEquipment2;assert(E2);ctx.E2=E2;
const getFn=(name)=>{const i=code.indexOf('function '+name+'(');assert(i>=0,name);const b=code.indexOf('{',i);let d=0,quote=null;for(let j=b;j<code.length;j++){let c=code[j];if(quote){if(c==='\\'){j++;continue;}if(c===quote)quote=null;continue;}if(c==='"'||c==="'"||c==='`'){quote=c;continue;}if(c==='{')d++;if(c==='}'&&!--d)return code.slice(i,j+1)}throw Error(name)};
const helpers=`const MERCHANT_RANK={Commun:0,Inhabituel:1,Rare:2,'Épique':3,'Légendaire':4,Mythique:5}; const ECON_RARITY_BASE=[750,1400,2900,6900,13500,24000]; function merchantTier(){return tierValue;}`;
ctx.tierValue=0;vm.runInContext(helpers+['merchantRarityCap','merchantPrice','merchantEquipPrice','merchantEquipSale','merchantGenerateGear'].map(getFn).join('\n'),ctx);
const rar=['Commun','Inhabituel','Rare','Épique','Légendaire','Mythique'];
let rows=[];for(let t=0;t<=4;t++){ctx.tierValue=t;const counts=Object.fromEntries(rar.map(x=>[x,0]));let prices=[];for(let i=0;i<20000;i++){const w=ctx.merchantGenerateGear(['armor','boots','module','bag','artifact'][i%5],t);assert(rar.indexOf(w.rar)<=ctx.merchantRarityCap());const price=ctx.merchantEquipPrice(w);assert(Number.isFinite(price)&&price>=0);counts[w.rar]++;prices.push(price);let sold=ctx.merchantEquipSale({...w,purchasePrice:price});assert(sold<=price*.25);}
 rows.push({tier:t,cap:rar[ctx.merchantRarityCap()],distribution:counts,meanPrice:Math.round(prices.reduce((a,b)=>a+b)/prices.length)});}
const weapons=[{name:'KALDOR',dmg:63,rate:.9,rar:'Épique'},{name:'KORVEX',dmg:35,rate:3,rar:'Mythique'},{name:'VARKEN',dmg:23,rate:1.5,rar:'Commun'}];for(const w of weapons){const price=ctx.merchantPrice(w);assert(price>0);}
const chests=[{price:750,odds:[650,310,38,2]},{price:2400,odds:[200,620,160,20]},{price:6200,odds:[20,230,620,130]}];const chest=[];for(const c of chests){let epic=0,leg=0;for(let i=0;i<50000;i++){let n=Math.floor(Math.random()*1000),sum=0;for(let j=0;j<4;j++){sum+=c.odds[j];if(n<sum){if(j>=2)epic++;if(j===3)leg++;break;}}}chest.push({price:c.price,epicPlus:epic/50000,legendary:leg/50000,avgCostEpicPlus:Math.round(c.price/(epic/50000))});}
// No loss on save: prices are only changed for unsold offers; no currency or inventory schema changes.
assert(code.includes('if(offer.sold)continue;'));
assert(code.includes('function awardEnemyDefeat(room,enemy)'));
assert(code.includes('awardEnemyDefeat(room,e)')&&code.includes('awardEnemyDefeat(room,enemy)'));
assert(code.includes('E2.sell(data,id,salvagePrice,merchantEquipSale)'));
assert(code.includes('m.economyVersion=1'));
// Migration test: no changes to credits, inventory or already sold items.
ctx.tierValue=0;ctx.data={credits:12345,runs:0,eq2:{gear:[{id:'owned-1',slot:'armor',rar:'Mythique',name:'Existing'}]},merchant:{stock:[{slot:'artifact',name:'Old offer',rar:'Mythique',level:1,offerId:'a',price:1000,sold:false,rebornGear:true},{slot:'armor',name:'Sold offer',rar:'Mythique',level:1,offerId:'b',price:1000,sold:true,rebornGear:true}],cycle:2,lastRefreshRun:0,highestTier:0,rebornGearCycle:'gear-cycle-2',paidRefreshes:3}};
ctx.persist=()=>true;ctx.MERCHANT_CATALOG=[];ctx.MERCHANT_REFRESH_COSTS=[150,250,400,600,850];ctx.region=()=>({maxSector:0,bossDefeated:false});ctx.pick=()=>0;
vm.runInContext(getFn('merchantRebornStock'),ctx);
ctx.ensureMerchant=()=>ctx.data.merchant;
const before=JSON.stringify(ctx.data.eq2),soldBefore=JSON.stringify(ctx.data.merchant.stock[1]);
ctx.merchantRebornStock();
assert(ctx.data.credits===12345&&JSON.stringify(ctx.data.eq2)===before);
assert(JSON.stringify(ctx.data.merchant.stock[1])===soldBefore);
assert(ctx.data.merchant.stock[0].rar==='Commun'||ctx.data.merchant.stock[0].rar==='Inhabituel');
assert(ctx.data.merchant.paidRefreshes===3);
const migrated=JSON.stringify(ctx.data.merchant);
ctx.merchantRebornStock();assert(JSON.stringify(ctx.data.merchant)===migrated);
console.log(JSON.stringify({merchant:rows,chests:chest,weaponExamples:weapons.map(w=>({...w,price:ctx.merchantPrice(w)}))},null,2));
