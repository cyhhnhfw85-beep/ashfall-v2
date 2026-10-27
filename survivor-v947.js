/* Survivor Reborn V2: one visible interface; original engine containers remain hidden as adapters. */
(function(){'use strict';
function init(){
 const root=document.getElementById('survivor-panel-equipment');if(!root||root.dataset.sv947)return;root.dataset.sv947='1';
 const showcase=root.querySelector('.character-showcase');if(!showcase)return;
 const legacy=document.createElement('div');legacy.className='sv-legacy';legacy.setAttribute('aria-hidden','true');
 // Move existing, ID-addressable engine nodes, without duplicating IDs or touching saves.
 const original=[...root.children].filter(el=>el!==showcase);
 for(const el of original)legacy.appendChild(el);
 root.appendChild(legacy);
 const hero=document.createElement('section');hero.className='sv-hero';hero.innerHTML='<h3>MON SURVIVANT</h3>';
 root.insertBefore(hero,legacy);hero.appendChild(showcase);
 const inv=document.createElement('section');inv.className='sv-inventory';inv.innerHTML='<div class="sv-bar"><h3>INVENTAIRE</h3><button type="button" class="sv-filter active" data-sv-filter="all">TOUT</button><button type="button" class="sv-filter" data-sv-filter="weapons">ARMES</button><button type="button" class="sv-filter" data-sv-filter="gear">ÉQUIPEMENTS</button></div><div class="sv-grid" id="svGrid"></div>';
 root.insertBefore(inv,legacy);
 const dialog=document.createElement('div');dialog.className='sv-layer';dialog.hidden=true;dialog.innerHTML='<div class="sv-scrim" data-sv-close></div><section class="sv-sheet" role="dialog" aria-modal="true" aria-label="Détails équipement"><header><b id="svDialogTitle">ÉQUIPEMENT</b><button type="button" data-sv-close aria-label="Fermer">×</button></header><div class="sv-detail" id="svDetail"></div></section>';document.body.appendChild(dialog);
 const grid=inv.querySelector('#svGrid'), detail=dialog.querySelector('#svDetail'), title=dialog.querySelector('#svDialogTitle');let filter='all',shown=false;
 function open(name,el){title.textContent=name;detail.replaceChildren();detail.appendChild(el);dialog.hidden=false;document.body.classList.add('sv-dialog-open');}
 function close(){dialog.hidden=true;document.body.classList.remove('sv-dialog-open');if(selection&&detail.contains(selection)){legacy.appendChild(selection);selection.hidden=true;}if(gear&&detail.contains(gear))legacy.appendChild(gear);detail.replaceChildren();shown=false;refresh();}
 dialog.querySelectorAll('[data-sv-close]').forEach(b=>b.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!dialog.hidden)close()});
 const preview=root.querySelector('#characterReservePreview'),selection=root.querySelector('#inventorySelection'),gear=root.querySelector('#ashGearConfigurator');
 function refresh(){if(!dialog.hidden||shown)return;grid.replaceChildren();
  if(filter!=='gear'&&preview){preview.querySelectorAll('button[data-inventory-index]').forEach((source)=>{
   const clone=source.cloneNode(true);clone.classList.remove('inventory-active');clone.removeAttribute('aria-pressed');clone.classList.add('sv-item');clone.addEventListener('click',()=>{
    source.click(); // Existing engine selection, upgrade, sell and equip handlers remain authoritative.
    requestAnimationFrame(()=>{if(selection){selection.hidden=false;open('ARME',selection);}}
    );});grid.appendChild(clone);
  });}
  if(filter!=='weapons'&&gear){
   // Reuse actual equipment2 item nodes, preserving engine's own interactions.
   const candidates=[...gear.querySelectorAll('[data-eq2-item],[data-e2-select],[data-eq2-id],[data-eq2-select]')].filter(el=>!el.closest('.sv-item'));
   const distinct=candidates.filter(el=>!candidates.some(other=>other!==el&&other.contains(el))).slice(0,120);
   for(const source of distinct){const clone=source.cloneNode(true);clone.classList.add('sv-item','sv-gear');clone.addEventListener('click',()=>open('ÉQUIPEMENT',gear));grid.appendChild(clone);}
  }
  if(!grid.children.length){const empty=document.createElement('p');empty.className='sv-empty';empty.textContent='Aucun objet dans cette catégorie.';grid.appendChild(empty);}
 }
 inv.querySelectorAll('[data-sv-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.svFilter;inv.querySelectorAll('[data-sv-filter]').forEach(x=>x.classList.toggle('active',x===b));refresh()}));
 // Slot tap opens real equipment configurator, and weapon slot uses existing weapon list.
 showcase.querySelectorAll('[data-eq2-portrait-slot]').forEach(slot=>{slot.setAttribute('role','button');slot.tabIndex=0;const handler=()=>{const isWeapon=slot.dataset.eq2PortraitSlot==='weapon';filter=isWeapon?'weapons':'gear';inv.querySelectorAll('[data-sv-filter]').forEach(x=>x.classList.toggle('active',x.dataset.svFilter===filter));if(isWeapon){refresh();inv.scrollIntoView({block:'nearest',behavior:'smooth'})}else if(gear){open('ÉQUIPEMENT',gear);}};slot.addEventListener('click',handler);slot.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();handler()}})});
 // Engine repaints its UI; reflect results after the engine's own render cycle.
 let queued=false;const observer=new MutationObserver(()=>{if(queued||!dialog.hidden)return;queued=true;requestAnimationFrame(()=>{queued=false;refresh()})});
 if(preview)observer.observe(preview,{childList:true});if(gear)observer.observe(gear,{childList:true});
 refresh();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
