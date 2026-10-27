/* ASHFALL V9.4.6 — Survivor Reborn. Presentation only: existing transaction handlers remain authoritative. */
(function(){'use strict';
function init(){
 const root=document.getElementById('survivor-panel-equipment');
 if(!root||root.dataset.survivorReborn)return;
 root.dataset.survivorReborn='1';
 const showcase=root.querySelector('.character-showcase');
 if(!showcase)return;
 const heading=document.createElement('div');heading.className='sr-heading';
 heading.innerHTML='<div><small>ÉQUIPEMENT ACTIF</small><strong>MON SURVIVANT</strong></div><span>6 EMPLACEMENTS</span>';
 showcase.before(heading);
 const hint=document.createElement('p');hint.className='sr-hint';hint.textContent='Touchez une case pour consulter et modifier votre équipement.';
 showcase.after(hint);
 const openButton=document.createElement('button');openButton.type='button';openButton.className='sr-manage-button';openButton.textContent='GÉRER MON INVENTAIRE';hint.after(openButton);
 const layer=document.createElement('div');layer.className='sr-layer';layer.hidden=true;layer.setAttribute('aria-hidden','true');
 layer.innerHTML='<div class="sr-backdrop" data-sr-close></div><section class="sr-sheet" role="dialog" aria-modal="true" aria-label="Gestion du survivant"><header class="sr-sheet-head"><div><small>REFUGE · INVENTAIRE</small><strong>ÉQUIPEMENT</strong></div><button type="button" class="sr-close" data-sr-close aria-label="Fermer">×</button></header><nav class="sr-switch"><button type="button" data-sr-tab="gear" class="active">ÉQUIPEMENTS</button><button type="button" data-sr-tab="weapons">ARMES</button></nav><div class="sr-content"><section class="sr-page" data-sr-page="gear"></section><section class="sr-page" data-sr-page="weapons" hidden></section></div></section>';
 document.body.appendChild(layer);
 const gear=layer.querySelector('[data-sr-page="gear"]'), weapons=layer.querySelector('[data-sr-page="weapons"]');
 const gearBox=root.querySelector('#ashGearConfigurator');if(gearBox)gear.appendChild(gearBox);
 const equipped=root.querySelector('.character-equipped-card');if(equipped)weapons.appendChild(equipped);
 for(const selector of ['.section-subhead','.ash-loot-controls','#inventoryPages','#inventorySelection','#stash']){
  const element=root.querySelector(selector);if(element)weapons.appendChild(element);
 }
 const drawer=root.querySelector('.ash-gear-drawer');if(drawer)drawer.remove();
 let lastFocus=null;
 function choose(tab){
  layer.querySelectorAll('[data-sr-tab]').forEach(b=>{const active=b.dataset.srTab===tab;b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active));});
  layer.querySelectorAll('[data-sr-page]').forEach(p=>p.hidden=p.dataset.srPage!==tab);
  const content=layer.querySelector('.sr-content');content.scrollTop=0;
 }
 function open(tab){lastFocus=document.activeElement;choose(tab||'gear');layer.hidden=false;layer.setAttribute('aria-hidden','false');document.body.classList.add('sr-open');layer.querySelector('.sr-close').focus();}
 function close(){layer.hidden=true;layer.setAttribute('aria-hidden','true');document.body.classList.remove('sr-open');if(lastFocus&&lastFocus.isConnected)lastFocus.focus();}
 layer.querySelectorAll('[data-sr-close]').forEach(e=>e.addEventListener('click',close));
 layer.querySelectorAll('[data-sr-tab]').forEach(e=>e.addEventListener('click',()=>choose(e.dataset.srTab)));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!layer.hidden)close();});
 openButton.addEventListener('click',()=>open('gear'));
 showcase.querySelectorAll('[data-eq2-portrait-slot]').forEach(el=>{el.setAttribute('role','button');el.setAttribute('tabindex','0');el.setAttribute('aria-label','Gérer '+el.dataset.eq2PortraitSlot);const activate=()=>open(el.dataset.eq2PortraitSlot==='weapon'?'weapons':'gear');el.addEventListener('click',activate);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate();}});});
 // Preserve the original IDs and delegated click handlers; only move their parent containers.
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
