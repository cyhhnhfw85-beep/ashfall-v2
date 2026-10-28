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
 const inv=document.createElement('section');inv.className='sv-inventory';inv.innerHTML='<div class="sv-bar"><h3>INVENTAIRE</h3><div class="ash-filter-row"><button type="button" class="sv-filter ash-filter-icon active" data-sv-filter="all" aria-label="Tout" title="Tout" aria-pressed="true"><span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg></span></button><button type="button" class="sv-filter ash-filter-icon" data-sv-filter="weapon" aria-label="Armes" title="Armes" aria-pressed="false"><span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m5 19 14-14M13 5l6 6M4 20l4-1-3-3-1 4Z"/></svg></span></button><button type="button" class="sv-filter ash-filter-icon" data-sv-filter="armor" aria-label="Armures" title="Armures" aria-pressed="false"><span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 6v6c0 5 3 8 8 10 5-2 8-5 8-10V6l-8-4Z"/><path d="M9 10h6m-3-3v9"/></svg></span></button><button type="button" class="sv-filter ash-filter-icon" data-sv-filter="boots" aria-label="Bottes" title="Bottes" aria-pressed="false"><span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h7v9l3 3h3a2 2 0 0 1 2 2v3H3v-5l4-3V3Z"/><path d="M7 8h7M3 17h19"/></svg></span></button><button type="button" class="sv-filter ash-filter-icon" data-sv-filter="bag" aria-label="Sacs" title="Sacs" aria-pressed="false"><span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="7" width="16" height="15" rx="3"/><path d="M9 7V5a3 3 0 0 1 6 0v2M4 13h16M10 13v3h4v-3"/></svg></span></button><button type="button" class="sv-filter ash-filter-icon" data-sv-filter="module" aria-label="Modules" title="Modules" aria-pressed="false"><span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/></svg></span></button><button type="button" class="sv-filter ash-filter-icon" data-sv-filter="artifact" aria-label="Artéfacts" title="Artéfacts" aria-pressed="false"><span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 8 8-8 12L4 10l8-8Z"/><path d="M4 10h16M12 2v20"/></svg></span></button></div></div><div class="sv-grid" id="svGrid"></div>';
 root.insertBefore(inv,legacy);
 const dialog=document.createElement('div');dialog.className='sv-layer';dialog.hidden=true;dialog.innerHTML='<div class="sv-scrim" data-sv-close></div><section class="sv-sheet" role="dialog" aria-modal="true" aria-label="Détails équipement"><header><b id="svDialogTitle">ÉQUIPEMENT</b><button type="button" data-sv-close aria-label="Fermer">×</button></header><div class="sv-detail" id="svDetail"></div></section>';document.body.appendChild(dialog);
 const grid=inv.querySelector('#svGrid'), detail=dialog.querySelector('#svDetail'), title=dialog.querySelector('#svDialogTitle');let filter='all',shown=false;
 function open(name,el){title.textContent=name;detail.replaceChildren();detail.appendChild(el);dialog.hidden=false;document.body.classList.add('sv-dialog-open');}
 function close(){dialog.hidden=true;document.body.classList.remove('sv-dialog-open');if(selection&&detail.contains(selection)){legacy.appendChild(selection);selection.hidden=true;}if(gear&&detail.contains(gear))legacy.appendChild(gear);detail.replaceChildren();shown=false;refresh();}
 dialog.querySelectorAll('[data-sv-close]').forEach(b=>b.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!dialog.hidden)close()});
 const preview=root.querySelector('#characterReservePreview'),selection=root.querySelector('#inventorySelection'),gear=root.querySelector('#ashGearConfigurator');
 function refresh(){if(!dialog.hidden||shown)return;grid.replaceChildren();
  if((filter==='all'||filter==='weapon')&&preview){preview.querySelectorAll('button[data-inventory-index]').forEach((source)=>{
   const clone=source.cloneNode(true);clone.classList.remove('inventory-active');clone.removeAttribute('aria-pressed');clone.classList.add('sv-item');clone.dataset.svSlot='weapon';clone.dataset.svRarity=(source.getAttribute('aria-label')||source.textContent||'');clone.addEventListener('click',()=>{
    source.click(); // Existing engine selection, upgrade, sell and equip handlers remain authoritative.
    requestAnimationFrame(()=>{if(selection){selection.hidden=false;open('ARME',selection);}}
    );});grid.appendChild(clone);
  });}
  if(gear){
   // Reuse the authoritative equipment-engine cards, including the equipped weapon.
   // The equipped weapon is not in the reserve preview, so it needs its own inventory tile.
   const cards=[...gear.querySelectorAll('.eq2-owned-list .eq2-owned-card')].filter(source=>{
    const weapon=source.closest('.eq2-collection')?.querySelector('summary')?.textContent?.startsWith('Arme équipée');
    if(weapon)return filter==='all'||filter==='weapon'; if(filter==='all')return true; return source.dataset.eq2Slot===filter;
   });
   for(const source of cards){
    const equipped=source.classList.contains('is-equipped');
    const card=document.createElement('button');card.type='button';card.className='sv-item sv-gear'+(equipped?' sv-is-equipped':'');card.dataset.svSlot=source.dataset.eq2Slot||'weapon';card.dataset.svRarity=source.querySelector('.eq2-item-copy small')?.textContent||'';card.dataset.svLevel=(card.dataset.svRarity.match(/Nv\s*(\d+)/i)||[])[1]||'0';
    if(equipped){const badge=document.createElement('span');badge.className='sv-equipped-badge';badge.textContent='✓ ÉQUIPÉ';card.appendChild(badge);card.setAttribute('aria-label','Équipé · '+(source.querySelector('.eq2-item-copy strong')?.textContent||'Équipement'));}
    const tone=source.style.getPropertyValue('--eq2-rarity').trim()||'#d9e2e9';card.style.setProperty('--eq2-rarity',tone);
    const art=source.querySelector('.eq2-mini-art'),copy=source.querySelector('.eq2-item-copy');
    const name=copy?.querySelector('strong')?.textContent||'Équipement';
    card.insertAdjacentHTML('beforeend','<span class="sv-gear-art"></span><span class="sv-gear-name"></span>');
    if(art)card.querySelector('.sv-gear-art').innerHTML=art.innerHTML;
    card.querySelector('.sv-gear-name').textContent=name;
    card.addEventListener('click',()=>{
     const panel=document.createElement('article');panel.className='sv-gear-detail';panel.style.setProperty('--eq2-rarity',tone);
     const item=source.cloneNode(true);item.querySelectorAll('button').forEach(button=>{
      const attr=button.hasAttribute('data-e2-home-equip')?'data-e2-home-equip':button.hasAttribute('data-e2-sell')?'data-e2-sell':null;
      if(!attr)return;
      const id=button.getAttribute(attr);
      button.addEventListener('click',event=>{
       event.preventDefault();event.stopPropagation();
       const original=[...gear.querySelectorAll('['+attr+']')].find(b=>b.getAttribute(attr)===id);
       if(original){original.click();close();}
      });
     });
     panel.appendChild(item);open('ÉQUIPEMENT',panel);
    });grid.appendChild(card);
   }
  }
  // Equipped items always lead; then rarity descending, level descending, name.
  const rarityOrder=['mythique','légendaire','legendaire','épique','epique','rare','inhabituel','commun'];
  const rarityRank=el=>{const t=(el.dataset.svRarity||el.getAttribute('aria-label')||el.textContent||'').toLowerCase();const i=rarityOrder.findIndex(x=>t.includes(x));return i<0?99:i;};
  const tiles=[...grid.querySelectorAll('.sv-item')];
  tiles.sort((a,b)=>Number(b.classList.contains('sv-is-equipped'))-Number(a.classList.contains('sv-is-equipped'))||rarityRank(a)-rarityRank(b)||Number(b.dataset.svLevel||0)-Number(a.dataset.svLevel||0)||(a.textContent||'').localeCompare(b.textContent||'','fr'));
  tiles.forEach(tile=>grid.appendChild(tile));
  if(!grid.children.length){const empty=document.createElement('p');empty.className='sv-empty';empty.textContent='Aucun objet dans cette catégorie.';grid.appendChild(empty);}
 }
 inv.querySelectorAll('[data-sv-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.svFilter;inv.querySelectorAll('[data-sv-filter]').forEach(x=>x.classList.toggle('active',x===b));refresh()}));
 // Slot tap opens real equipment configurator, and weapon slot uses existing weapon list.
 showcase.querySelectorAll('[data-eq2-portrait-slot]').forEach(slot=>{slot.setAttribute('role','button');slot.tabIndex=0;const handler=()=>{const target=slot.dataset.eq2PortraitSlot||'all';filter=target;inv.querySelectorAll('[data-sv-filter]').forEach(x=>(x.classList.toggle('active',x.dataset.svFilter===filter),x.setAttribute('aria-pressed',String(x.dataset.svFilter===filter))));refresh();const equipped=[...grid.querySelectorAll('.sv-item.sv-is-equipped')].find(x=>x.dataset.svSlot===target);if(equipped){equipped.click();return;}inv.scrollIntoView({block:'nearest',behavior:'smooth'});} ;slot.addEventListener('click',handler);slot.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();handler()}})});
 // Engine repaints its UI; reflect results after the engine's own render cycle.
 let queued=false;const observer=new MutationObserver(()=>{if(queued||!dialog.hidden)return;queued=true;requestAnimationFrame(()=>{queued=false;refresh()})});
 if(preview)observer.observe(preview,{childList:true});if(gear)observer.observe(gear,{childList:true,subtree:true});
 refresh();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
