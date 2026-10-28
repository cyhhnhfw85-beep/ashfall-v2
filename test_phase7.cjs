const fs=require('fs'),vm=require('vm'),assert=require('assert');
const code=fs.readFileSync(__dirname+'/game.js','utf8');
const extract=name=>{let i=code.indexOf('function '+name+'(');assert(i>=0);let b=code.indexOf('{',i),depth=0;for(let j=b;j<code.length;j++){if(code[j]==='{')depth++;if(code[j]==='}'&&!--depth)return code.slice(i,j+1)}throw Error(name)};
const ctx={Math,Number,console};vm.createContext(ctx);vm.runInContext('let merchantTier=()=>4;'+extract('merchantRarityCap'),ctx);
for(let t=0;t<=4;t++)assert.strictEqual(vm.runInContext('merchantRarityCap('+t+')',ctx),t+1);
assert.strictEqual(vm.runInContext('merchantRarityCap(-4)',ctx),1);
assert.strictEqual(vm.runInContext('merchantRarityCap(999)',ctx),5);
assert.strictEqual(vm.runInContext('merchantRarityCap()',ctx),5);
const tiers=[{price:750,odds:[650,310,38,2]},{price:2400,odds:[200,620,160,20]},{price:6200,odds:[20,230,620,130]}];
for(const t of tiers){assert.strictEqual(t.odds.reduce((a,b)=>a+b,0),1000);assert(t.odds.every(n=>n>=0));}
console.log('PASS: 8 rarity-cap cases and 3 chest probability tables');
