/* ASHFALL modular pilot: read-only equipment->visual resolver. No persistence or combat mutations. */
(function(root){'use strict';
const NAMED=Object.freeze({
 'pistolet usé':'pistol_used','pistolet de secours':'pistol_rescue','pistolet renforcé':'pistol_reinforced',
 'smg de secteur':'smg_sector','carabine k-17':'carbine_k17','fusil de récupération':'rifle_recovery',
 'fusil industriel':'rifle_industrial','viseur de précision':'precision','lanceur à impulsion':'impulse',
 'prototype balistique':'prototype','reliquat de citadelle':'reliquat','nomade-9':'nomade9',
 'vektor-9':'vektor','spectre-9':'spectre','ion-9':'ion','cendre-9':'cendre'
});
const VARIANTS=Object.freeze({nomade:'nomade9',vektor:'vektor',spectre:'spectre',ion:'ion',cendre:'cendre'});
function asText(value){return typeof value==='string'?value.trim().toLowerCase():'';}
function getWeaponClass(weapon){
 const name=asText(weapon?.name);
 // Strictly visual labels inferred from actual name, not stats/ballistics.
 if(/pistolet|\bpistol\b/.test(name))return 'pistol';
 if(/\bsmg\b|vektor|mitraillette|spectre/.test(name))return 'smg';
 if(/précision|precision|viseur|nomade/.test(name))return 'precision';
 if(/impulsion|impulse|prototype|reliquat|ion|cendre/.test(name))return 'energy';
 return 'rifle';
}
function resolveWeapon(weapon){
 const name=asText(weapon?.name);
 let id=NAMED[name]||null;
 if(!id){
  const m=name.match(/^(nomade|vektor|spectre|ion|cendre)[-\s]*(\d+)$/);
  if(m)id=VARIANTS[m[1]];
 }
 if(!id&&name){
  if(/^carabine k[-\s]*17$/.test(name)) id='carbine_k17';
  else if(/^pistolet/.test(name)) id='pistol_used';
  else if(/\bsmg\b/.test(name)) id='smg_sector';
  else if(/fusil/.test(name))id='rifle_recovery';
 }
 return {id,name,weaponClass:getWeaponClass(weapon),generic:!id};
}
function readEquipment(run,E2){
 let active={};
 if(run?.eq2&&E2?.active){
  for(const slot of ['weapon','armor','boots','bag','module','artifact']){
   try{active[slot]=E2.active(run,slot)||null;}catch(_){active[slot]=null;}
  }
 }
 return active;
}
function snapshot(run,E2){
 const slots=readEquipment(run,E2);
 const weapon=slots.weapon||run?.equipped||null;
 return {...slots,weapon,weaponVisual:resolveWeapon(weapon)};
}
root.AshSurvivorVisualResolver=Object.freeze({resolveWeapon,readEquipment,snapshot});
})(window);
