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
 const inv=document.createElement('section');inv.className='sv-inventory';inv.innerHTML='<div class="sv-bar"><h3>INVENTAIRE</h3><div class="ash-filter-row"><button type="button" class="sv-filter ash-filter-icon active" data-sv-filter="all" aria-label="Tout" title="Tout" aria-pressed="true"><span aria-hidden="true">▦</span></button><button type="button" class="sv-filter ash-filter-icon" data-sv-filter="weapon" aria-label="Armes" title="Armes" aria-pressed="false"><span aria-hidden="true">⚔</span></button><button type="button" class="sv-filter ash-filter-icon" data-sv-filter="armor" aria-label="Armures" title="Armures" aria-pressed="false"><span aria-hidden="true">⬡</span></button><button type="button" class="sv-filter ash-filter-icon" data-sv-filter="boots" aria-label="Bottes" title="Bottes" aria-pressed="false"><span aria-hidden="true">♟</span></button><button type="button" class="sv-filter ash-filter-icon" data-sv-filter="bag" aria-label="Sacs" title="Sacs" aria-pressed="false"><span aria-hidden="true">▣</span></button><button type="button" class="sv-filter ash-filter-icon" data-sv-filter="module" aria-label="Modules" title="Modules" aria-pressed="false"><span aria-hidden="true">⌘</span></button><button type="button" class="sv-filter ash-filter-icon" data-sv-filter="artifact" aria-label="Artéfacts" title="Artéfacts" aria-pressed="false"><span aria-hidden="true">◇</span></button></div></div><div class="sv-grid" id="svGrid"></div>';
 root.insertBefore(inv,legacy);
 const dialog=document.createElement('div');dialog.className='sv-layer';dialog.hidden=true;dialog.innerHTML='<div class="sv-scrim" data-sv-close></div><section class="sv-sheet" role="dialog" aria-modal="true" aria-label="Détails équipement"><header><b id="svDialogTitle">ÉQUIPEMENT</b><button type="button" data-sv-close aria-label="Fermer">×</button></header><div class="sv-detail" id="svDetail"></div></section>';document.body.appendChild(dialog);
 const grid=inv.querySelector('#svGrid'), detail=dialog.querySelector('#svDetail'), title=dialog.querySelector('#svDialogTitle');let filter='all',shown=false;
 function open(name,el){title.textContent=name;detail.replaceChildren();detail.appendChild(el);dialog.hidden=false;document.body.classList.add('sv-dialog-open');}
 function close(){dialog.hidden=true;document.body.classList.remove('sv-dialog-open');if(selection&&detail.contains(selection)){legacy.appendChild(selection);selection.hidden=true;}if(gear&&detail.contains(gear))legacy.appendChild(gear);detail.replaceChildren();shown=false;refresh();}
 dialog.querySelectorAll('[data-sv-close]').forEach(b=>b.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!dialog.hidden)close()});
 const preview=root.querySelector('#characterReservePreview'),selection=root.querySelector('#inventorySelection'),gear=root.querySelector('#ashGearConfigurator');
 function refresh(){if(!dialog.hidden||shown)return;grid.replaceChildren();
  if((filter==='all'||filter==='weapon')&&preview){preview.querySelectorAll('button[data-inventory-index]').forEach((source)=>{
   const clone=source.cloneNode(true);clone.classList.remove('inventory-active');clone.removeAttribute('aria-pressed');clone.classList.add('sv-item');clone.addEventListener('click',()=>{
    source.click(); // Existing engine selection, upgrade, sell and equip handlers remain authoritative.
    requestAnimationFrame(()=>{if(selection){selection.hidden=false;open('ARME',selection);}}
    );});grid.appendChild(clone);
  });}
  if(gear){
   // Reuse the authoritative equipment-engine cards, including the equipped weapon.
   // The equipped weapon is not in the reserve preview, so it needs its own inventory tile.
   const cards=[...gear.querySelectorAll('.eq2-owned-list > .eq2-owned-card')].filter(source=>{
    const weapon=source.closest('.eq2-collection')?.querySelector('summary')?.textContent?.startsWith('Arme équipée');
    if(weapon)return filter==='all'||filter==='weapon'; if(filter==='all')return true; const summary=source.closest('.eq2-collection')?.querySelector('summary')?.textContent?.toLowerCase()||''; const aliases={armor:['armure'],boots:['botte'],bag:['sac'],module:['module'],artifact:['artefact','artéfact']}; return (aliases[filter]||[]).some(word=>summary.includes(word));
   });
   for(const source of cards){
    const equipped=source.classList.contains('is-equipped');
    const card=document.createElement('button');card.type='button';card.className='sv-item sv-gear'+(equipped?' sv-is-equipped':'');
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
  if(!grid.children.length){const empty=document.createElement('p');empty.className='sv-empty';empty.textContent='Aucun objet dans cette catégorie.';grid.appendChild(empty);}
 }
 inv.querySelectorAll('[data-sv-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.svFilter;inv.querySelectorAll('[data-sv-filter]').forEach(x=>x.classList.toggle('active',x===b));refresh()}));
 // Slot tap opens real equipment configurator, and weapon slot uses existing weapon list.
 showcase.querySelectorAll('[data-eq2-portrait-slot]').forEach(slot=>{slot.setAttribute('role','button');slot.tabIndex=0;const handler=()=>{const isWeapon=slot.dataset.eq2PortraitSlot==='weapon';filter=slot.dataset.eq2PortraitSlot||'all';inv.querySelectorAll('[data-sv-filter]').forEach(x=>(x.classList.toggle('active',x.dataset.svFilter===filter),x.setAttribute('aria-pressed',String(x.dataset.svFilter===filter))));if(isWeapon){refresh();inv.scrollIntoView({block:'nearest',behavior:'smooth'})}else if(gear){refresh();inv.scrollIntoView({block:'nearest',behavior:'smooth'});}};slot.addEventListener('click',handler);slot.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();handler()}})});
 // Engine repaints its UI; reflect results after the engine's own render cycle.
 let queued=false;const observer=new MutationObserver(()=>{if(queued||!dialog.hidden)return;queued=true;requestAnimationFrame(()=>{queued=false;refresh()})});
 if(preview)observer.observe(preview,{childList:true});if(gear)observer.observe(gear,{childList:true,subtree:true});
 refresh();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
