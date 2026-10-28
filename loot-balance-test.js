const fs=require('fs'),vm=require('vm'),assert=require('assert');
const context={Math,Date,JSON};context.window=context;vm.createContext(context);
vm.runInContext(fs.readFileSync(__dirname+'/equipment2-core.js','utf8'),context);
const E=context.AshEquipment2;
for(const source of ['enemy','chest','arena']){
 const results={};for(let i=0;i<100000;i++){const r=E.rollExpeditionRarity(source,1);results[r]=(results[r]||0)+1;}
 assert(!results.Mythique&&!results['Légendaire']);
 console.log(source,results);
}
for(const source of ['enemy','chest','arena']){
 for(let i=0;i<10000;i++){const e=E.rollDrop(3,Math.random,source,1);if(e)assert(!['Mythique','Légendaire'].includes(e.rar));}
}
console.log('PASS: 330000 loot rolls; no Legendary or Mythic in difficulty I');
