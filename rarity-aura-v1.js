(function(){'use strict';
var levels=[['mythic',/mythique/i],['legendary',/l[ée]gendaire/i],['epic',/[ée]pique/i],['rare',/\brare\b/i],['uncommon',/inhabituel/i],['common',/commun/i]];
var selector='.mr-item,.sv-item,.sv-gear,.ash-ws-tile,[data-eq2-portrait-slot],.eq2-owned-card';
function rank(el){var text=(el.textContent||'')+' '+(el.getAttribute('aria-label')||'')+' '+(el.getAttribute('title')||'');
for(var i=0;i<levels.length;i++)if(levels[i][1].test(text))return levels[i][0];
var c=el.style.getPropertyValue('--mr-rarity')||el.style.getPropertyValue('--ash-ws-rarity')||el.style.getPropertyValue('--eq2-rarity');
if(c){var v=c.trim().toLowerCase();var colors={'#ff4e70':'mythic','#ff536c':'mythic','#eeb64b':'legendary','#a56df4':'epic'};if(colors[v])return colors[v]}
return null}
function apply(){document.querySelectorAll(selector).forEach(function(el){var r=rank(el);if(!r)return;var target='ash-aura-'+r;if(el.classList.contains(target))return;el.classList.remove('ash-aura-common','ash-aura-uncommon','ash-aura-rare','ash-aura-epic','ash-aura-legendary','ash-aura-mythic');el.classList.add('ash-aura-item',target)})}
var pending=false;function queue(){if(pending)return;pending=true;requestAnimationFrame(function(){pending=false;apply()})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){apply();new MutationObserver(queue).observe(document.body,{childList:true,subtree:true,characterData:true})});else{apply();new MutationObserver(queue).observe(document.body,{childList:true,subtree:true,characterData:true})}
})();