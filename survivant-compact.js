/* UI-only: no save, economy, inventory or game state changes. */
(function(){'use strict';
 function init(){
  const panel=document.getElementById('survivor-panel-equipment');if(!panel||panel.dataset.compactReady)return;
  panel.dataset.compactReady='1';
  const showcase=panel.querySelector('.character-showcase');
  const stats=document.createElement('div');stats.className='survivor-quickstats';stats.setAttribute('aria-label','Résumé de l’équipement');
  stats.innerHTML='<div class="survivor-quickstat"><small>ARME</small><strong id="surv-quick-weapon">—</strong></div><div class="survivor-quickstat"><small>ÉQUIPEMENT</small><strong id="surv-quick-gear">—</strong></div><div class="survivor-quickstat"><small>SAC</small><strong id="surv-quick-bag">—</strong></div>';
  if(showcase)showcase.after(stats);
  const tip=document.createElement('p');tip.className='survivor-tip';tip.textContent='Touchez un emplacement pour gérer son équipement.';stats.after(tip);
  function manager(title){const details=document.createElement('details');details.className='survivor-manager';details.innerHTML='<summary>'+title+'</summary><div class="survivor-manager-inner"></div>';panel.appendChild(details);return {details,inner:details.lastElementChild};}
  const gear=manager('Équipement tactique · Armure, bottes, modules, sacs');
  const weapon=manager('Arsenal · Choisir ou améliorer une arme');
  const drawer=panel.querySelector('.ash-gear-drawer');if(drawer){drawer.open=true;const gearBox=drawer.querySelector('#ashGearConfigurator');if(gearBox)gear.inner.appendChild(gearBox);}
  ['.section-subhead','.ash-loot-controls','#inventoryPages','#inventorySelection','#stash'].forEach(sel=>{const el=panel.querySelector(sel);if(el)weapon.inner.appendChild(el);});
  const equipped=panel.querySelector('.character-equipped-card');if(equipped)weapon.inner.insertBefore(equipped,weapon.inner.firstChild);
  // Keep legacy content and actions in DOM; only relocate their containers.
  panel.querySelectorAll('[data-eq2-portrait-slot]').forEach(el=>{el.setAttribute('role','button');el.setAttribute('tabindex','0');function activate(){
    const slot=el.dataset.eq2PortraitSlot,open=slot==='weapon'?weapon:gear;
    gear.details.open=open===gear;weapon.details.open=open===weapon;
    open.details.scrollIntoView({behavior:'smooth',block:'start'});
   }el.addEventListener('click',activate);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate();}});});
  [gear.details,weapon.details].forEach(d=>d.addEventListener('toggle',()=>{if(d.open){(d===gear.details?weapon.details:gear.details).open=false;}}));
  function updateSummary(){
   const source=panel.querySelector('#characterEquippedSlotArt');
   const bag=panel.querySelector('[data-eq2-portrait-slot="bag"]');
   const count=panel.querySelectorAll('[data-eq2-portrait-slot].eq2-filled').length;
   const w=document.getElementById('surv-quick-weapon'),g=document.getElementById('surv-quick-gear'),b=document.getElementById('surv-quick-bag');
   if(w)w.textContent=source?.closest('[data-eq2-portrait-slot]')?.title?.split(':').slice(1).join(':').trim().slice(0,16)||'Équipée';
   if(g)g.textContent=count+' / 6';
   if(b)b.textContent=bag?.title?.split(':').slice(1).join(':').trim().slice(0,13)||'—';
  }
  updateSummary();
  const observer=new MutationObserver(()=>{if(!panel.isConnected){observer.disconnect();return;}updateSummary();});
  const showcaseSlots=panel.querySelector('.character-showcase');if(showcaseSlots)observer.observe(showcaseSlots,{attributes:true,attributeFilter:['title','class'],subtree:true});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
