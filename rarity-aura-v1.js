/* ASHFALL Rarity Signature V2 — presentation only, no save or gameplay mutations. */
(function(){'use strict';
const tiers=[['mythic',/mythique/i],['legendary',/l[ée]gendaire/i],['epic',/[ée]pique/i],['rare',/\brare\b/i],['uncommon',/inhabituel/i],['common',/commun/i]];
const selector=['.mr-item','.sv-item','.sv-gear','.ash-ws-tile','.ash-ws-card','[data-eq2-portrait-slot]','.eq2-owned-card','.ash-gear-card','.ash-loot-inventory-cell','.ash-loot-weapon-card','.ash-chest-reward','.ash-end-item','.ash-lr-item','.ash-loot-compare-candidate','.ash-loot-toast-art'].join(',');
const classes=tiers.map(t=>'ash-aura-'+t[0]);
// Presentation adapter: consume item-owned metadata only, never scan visible text.
// Legacy renderers expose an item-specific CSS color; use it as a fallback.
const aliases={commun:'common',inhabituel:'uncommon',rare:'rare',epique:'epic',legendaire:'legendary',mythique:'mythic',common:'common',uncommon:'uncommon',epic:'epic',legendary:'legendary',mythic:'mythic'};
const colors={'#ff4e70':'mythic','#ff536c':'mythic','#ff667c':'mythic','#ff4966':'mythic','#eeb64b':'legendary','#ffbd4c':'legendary','#f3b64c':'legendary','#a56df4':'epic','#c184ff':'epic','#ae66f4':'epic','#5aa9ff':'rare','#4ca5ff':'rare','#60de98':'uncommon','#45c48a':'uncommon','#d9e2e9':'common','#aeb9c4':'common'};
function normalize(raw){return aliases[String(raw||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase()]||null}
function tier(el){
  for(const key of ['rarity','itemRarity','weaponRarity','ashRarity']){
    const value=normalize(el.dataset[key]);if(value)return value;
  }
  const color=['--mr-rarity','--ash-ws-rarity','--eq2-rarity','--item-rarity','--sv-equipped-rarity'].map(k=>el.style.getPropertyValue(k).trim().toLowerCase()).find(Boolean);
  if(color&&colors[color])return colors[color];
  // An equipment illustration has a single unambiguous official rarity suffix.
  const art=el.querySelector('img[src*="equipment_v1/"]');
  if(art){const m=(art.getAttribute('src')||'').match(/_(Commun|Inhabituel|Rare|Epique|Legendaire|Mythique)\.png/i);if(m)return normalize(m[1]);}
  return null;
}

function update(el){
  const name=tier(el),current=el.dataset.ashAuraTier||'';
  if(current===name)return;
  el.classList.remove('ash-aura-item',...classes);
  if(name){el.classList.add('ash-aura-item','ash-aura-'+name);el.dataset.ashAuraTier=name;}
  else delete el.dataset.ashAuraTier;
}
function apply(){document.querySelectorAll(selector).forEach(update)}
let queued=false;
function queue(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;apply()})}
function init(){apply();new MutationObserver(queue).observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['class','style','data-rarity','data-tier','data-item-rarity','data-weapon-rarity','data-ash-rarity']})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
