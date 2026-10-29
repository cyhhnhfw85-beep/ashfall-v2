/* ASHFALL Rarity Signature V2 — presentation only, no save or gameplay mutations. */
(function(){'use strict';
const tiers=[['mythic',/mythique/i],['legendary',/l[ée]gendaire/i],['epic',/[ée]pique/i],['rare',/\brare\b/i],['uncommon',/inhabituel/i],['common',/commun/i]];
const selector=['.mr-item','.sv-item','.sv-gear','.ash-ws-tile','.ash-ws-card','[data-eq2-portrait-slot]','.eq2-owned-card','.ash-gear-card','.ash-loot-inventory-cell','.ash-loot-weapon-card','.ash-chest-reward','.ash-end-item','.ash-lr-item','.ash-loot-compare-candidate','.ash-loot-toast-art'].join(',');
const classes=tiers.map(t=>'ash-aura-'+t[0]);
function tier(el){
  const raw=[el.dataset.rarity,el.dataset.tier,el.getAttribute('data-item-rarity'),el.getAttribute('data-weapon-rarity'),el.getAttribute('aria-label'),el.getAttribute('title')].filter(Boolean).join(' ');
  const color=['--mr-rarity','--ash-ws-rarity','--eq2-rarity'].map(k=>el.style.getPropertyValue(k).trim().toLowerCase()).find(Boolean);
  const colors={'#ff4e70':'mythic','#ff536c':'mythic','#eeb64b':'legendary','#a56df4':'epic'};
  if(color&&colors[color])return colors[color];
  // Limit text scanning to the current item; never infer rarity from a whole menu.
  const text=raw+' '+(el.textContent||'').slice(0,900);
  for(const [name,rx] of tiers)if(rx.test(text))return name;
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
function init(){apply();new MutationObserver(queue).observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['class','style','data-rarity','data-tier','data-item-rarity','data-weapon-rarity','title','aria-label']})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
