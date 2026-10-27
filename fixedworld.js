(()=>{'use strict';
const RURL='assets/fixedworld/';let collisionDebug=new URLSearchParams(location.search).has('collisionDebug');let heroFacing={x:0,y:-1};let rooms={},backs={},active=false,room='01',hero,foes=[],shots=[],drops=[],chests={},clear={},triggered={},power='idle',bossDead=false,phase2=false,extract=0,extractFill=0,extractCountdown=0,visited={},credits=0,components=0,bags=[],last=0,joystick=null,held=new Set(),ui={};
const connections={'01':{N:'02'},'02':{S:'01',N:'05',W:'03',E:'04'},'03':{E:'02'},'04':{W:'02'},'05':{S:'02',N:'06'},'06':{S:'05',N:'09',W:'07',E:'08'},'07':{E:'06'},'08':{W:'06'},'09':{S:'06',N:'10'},'10':{S:'09',N:'11'},'11':{S:'10',N:'12'},'12':{S:'11'}};
const spawnEnemy=(x,y,type)=>{let cfg=({scav:[50,0.85,15],scav2:[85,1,13],heavy:[140,.7,24],drone:[38,1.4,11],mech:[950,.55,24]})[type];foes.push({x,y,type,hp:cfg[0],max:cfg[0],speed:cfg[1],damage:cfg[2],cool:Math.random()*1.5,alert:0});};
function enemiesFor(r){foes=[];if(clear[r])return; if(r==='02'){spawnEnemy(138,255,'scav');spawnEnemy(220,467,'scav');} if(r==='05'&&power!=='done'){if(power==='idle'){spawnEnemy(340,220,'drone');spawnEnemy(405,620,'drone');}if(power==='activated')spawnEnemy(350,260,'drone');} if(r==='07'){if(!triggered.r07){spawnEnemy(338,220,'scav');spawnEnemy(312,506,'scav');}else spawnEnemy(366,360,'scav2');}if(r==='09'){if(!triggered.r09){spawnEnemy(368,322,'drone');spawnEnemy(360,746,'drone');}else {spawnEnemy(330,210,'scav2');spawnEnemy(424,640,'scav2');}}if(r==='10'){spawnEnemy(182,270,'heavy');spawnEnemy(205,485,'drone');}if(r==='11'&&!bossDead)spawnEnemy(540,520,'mech');}
const fixedChests={'03':[{x:360,y:165,t:'militaire'},{x:475,y:670,t:'logistique'}],'07':[{x:340,y:700,t:'rare'}],'08':[{x:90,y:594,t:'ravitaillement'}],'09':[{x:335,y:1020,t:'defense'}],'11':[{x:540,y:510,t:'boss'}]};
const safe=(n,a,b)=>Math.max(a,Math.min(b,n)),rand=(a,b)=>a+Math.random()*(b-a);
let message='',msgSec=0;
function notify(t){message=t;msgSec=3;}
function data(r){return rooms[r]}
// V6.3: contours individuels resserrés + empreinte circulaire du Survivant.
function withinPoly(x,y,poly){let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){
  const a=poly[i],b=poly[j];if(((a[1]>y)!==(b[1]>y)) &&
  x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])inside=!inside;
 }return inside;}
function circlePolygon(x,y,radius,poly){
 if(withinPoly(x,y,poly))return true;
 for(let i=0;i<poly.length;i++){
  const a=poly[i],b=poly[(i+1)%poly.length],dx=b[0]-a[0],dy=b[1]-a[1];
  const t=safe(((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy||1),0,1);
  const px=a[0]+t*dx,py=a[1]+t*dy;
  if((x-px)*(x-px)+(y-py)*(y-py)<radius*radius)return true;
 }return false;
}
function blocked(x,y,radius=12){
 const r=data(room);if(!r||!Number.isFinite(x)||!Number.isFinite(y))return true;
 const margin=22;
 if(x-radius<margin||y-radius<margin||x+radius>r.w-margin||y+radius>r.h-margin)return true;
 // V6.3 : seuls les polygones de l’empreinte réelle sont physiques.
 // Les anciens rectangles r.obs NE doivent PAS doubler la collision.
 return (r.solids||[]).some(poly=>circlePolygon(x,y,radius,poly));
}
function move(obj,dx,dy,rad=12){
 // Sous-pas : interdit de sauter au travers d'un mur entre deux frames.
 const steps=Math.max(1,Math.ceil(Math.max(Math.abs(dx),Math.abs(dy))/Math.max(4,rad*.6)));
 for(let i=0;i<steps;i++){
  const sx=dx/steps,sy=dy/steps;
  if(!blocked(obj.x+sx,obj.y,rad))obj.x+=sx;
  if(!blocked(obj.x,obj.y+sy,rad))obj.y+=sy;
 }
}
function isCombat(){return ['02','05','07','09','10','11'].includes(room)&&!clear[room]}
function initRun(){heroFacing={x:0,y:-1};room='01';hero={x:180,y:620,hp:150,max:150,fire:0,dash:0};shots=[];drops=[];chests={};clear={};triggered={};power='idle';bossDead=false;phase2=false;extract=0;extractFill=0;extractCountdown=0;visited={};credits=0;components=0;bags=[];loadRoom('01',null);notify('Expédition K-17 — Monde fixe alpha');}
function loadRoom(next,coming){room=next;const r=data(room);if(coming){const opposite={N:'S',S:'N',W:'E',E:'W'}[coming];const dest=r.doors[opposite];const entry=dest?dest[1]:(coming==='N'||coming==='S'?r.w/2:r.h/2);if(coming==='N'){hero.x=entry;hero.y=r.h-72;}else if(coming==='S'){hero.x=entry;hero.y=72;}else if(coming==='W'){hero.x=r.w-75;hero.y=entry;}else {hero.x=75;hero.y=entry;}}hero.x=safe(hero.x,55,r.w-55);hero.y=safe(hero.y,55,r.h-55);
if(blocked(hero.x,hero.y,12)){
 let found=false;for(let dist=12;dist<=210&&!found;dist+=12){for(let a=0;a<24;a++){
  let xx=safe(hero.x+Math.cos(a*Math.PI/12)*dist,55,r.w-55),yy=safe(hero.y+Math.sin(a*Math.PI/12)*dist,55,r.h-55);
  if(!blocked(xx,yy,12)){hero.x=xx;hero.y=yy;found=true;break;}
 }}
}
shots=[];drops=[];visited[room]=true;enemiesFor(room);extract=0;extractFill=0;extractCountdown=0;notify(room+' · '+r.name);}
function nextWave(){if(room==='05'){if(power==='idle'){power='console';notify('Défenses neutralisées : active la console centrale');return;}if(power==='activated'){power='done';clear[room]=true;credits+=45;components+=3;notify('Centrale rétablie · +45 crédits · +3 composants');return;}}if(room==='07'&&!triggered.r07){triggered.r07=true;spawnEnemy(366,360,'scav2');notify('Renfort récupérateur !');return;}if(room==='09'&&!triggered.r09){triggered.r09=true;spawnEnemy(330,210,'scav2');spawnEnemy(424,640,'scav2');notify('Deux récupérateurs arrivent !');return;}clear[room]=true;if(room==='11'){bossDead=true;notify('Mécha détruit — coffre de boss disponible');}else notify('Salle sécurisée · portes ouvertes');}
function atDoor(){let r=data(room);for(let [dir,p] of Object.entries(r.doors)){let v=p[1],near=dir==='N'?hero.y<63&&Math.abs(hero.x-v)<49:dir==='S'?hero.y>r.h-63&&Math.abs(hero.x-v)<49:dir==='W'?hero.x<63&&Math.abs(hero.y-v)<53:hero.x>r.w-63&&Math.abs(hero.y-v)<53;if(!near)continue;if(isCombat()){if(room==='05'&&power==='console')notify('Active la console avant de sortir');else notify('Portes verrouillées : termine le combat');return;}if(dir==='N'&&room==='11'&&!bossDead)return;loadRoom(p[0],dir);return;}}
function loot(t,i){let key=room+':'+i;if(chests[key])return;chests[key]=true;let cr=t==='boss'?Math.floor(rand(140,245)):t==='rare'?Math.floor(rand(75,150)):Math.floor(rand(20,70)),co=t==='boss'?7:t==='rare'?4:Math.floor(rand(1,4));credits+=cr;components+=co;bags.push(t+' : '+cr+' crédits, '+co+' composants');notify('Coffre '+t+' · +'+cr+' crédits · +'+co+' composants');}
function close(){active=false;ui.modal.hidden=true;document.body.style.overflow='';held.clear();}
function finish(final){let record=JSON.parse(localStorage.getItem('ashfall_fixed_m1_alpha')||'{"world2Unlocked":false,"successfulRuns":0}');if(final){record.world2Unlocked=true;record.successfulRuns=(record.successfulRuns||0)+1;}localStorage.setItem('ashfall_fixed_m1_alpha',JSON.stringify(record));let summary=(final?'VICTOIRE — MÉCHA VAINCU · MONDE 2 DÉBLOQUÉ':'EXTRACTION INTERMÉDIAIRE')+'\n\n'+credits+' crédits · '+components+' composants\n'+bags.length+' coffres ouverts\n\nALPHA INDÉPENDANTE : les ressources et le déblocage ne sont PAS transférés à la sauvegarde principale du jeu.';close();window.alert(summary);}
function tick(dt){if(!active)return;let mx=0,my=0;if(held.has('ArrowUp')||held.has('KeyW'))my--;if(held.has('ArrowDown')||held.has('KeyS'))my++;if(held.has('ArrowLeft')||held.has('KeyA'))mx--;if(held.has('ArrowRight')||held.has('KeyD'))mx++;if(joystick){mx+=joystick.dx;my+=joystick.dy;}let len=Math.hypot(mx,my)||1;if(Math.hypot(mx,my)>.1)heroFacing={x:mx/len,y:my/len};move(hero,mx/len*155*dt,my/len*155*dt);atDoor();if(!active)return;
if(room==='05'&&power==='console'&&Math.hypot(hero.x-360,hero.y-605)<60){power='activated';spawnEnemy(350,260,'drone');notify('Alimentation réactivée — drone de réserve !');}
for(let [i,c] of (fixedChests[room]||[]).entries()){if((room==='07'||room==='09'||room==='11')&&!clear[room])continue;if(Math.hypot(hero.x-c.x,hero.y-c.y)<54)loot(c.t,i);}
if((room==='08'||room==='12')&& (room!=='12'||bossDead)){let x=180,y=room==='08'?275:330,near=Math.hypot(hero.x-x,hero.y-y)<78;if(extractCountdown>0){extractCountdown-=dt;if(extractCountdown<=0){finish(room==='12');return;}}else{extractFill=safe(extractFill+(near?dt*0.46:-dt*.8),0,1);if(extractFill===1){extractCountdown=8;notify('Extraction activée : 8 secondes');}}}
let nearest=null,dist=400;for(let e of foes){let d=Math.hypot(e.x-hero.x,e.y-hero.y);if(d<dist){dist=d;nearest=e;}}if(nearest){let d=Math.hypot(nearest.x-hero.x,nearest.y-hero.y)||1;heroFacing={x:(nearest.x-hero.x)/d,y:(nearest.y-hero.y)/d};}hero.fire-=dt;if(nearest&&hero.fire<=0){hero.fire=.33;let d=Math.hypot(nearest.x-hero.x,nearest.y-hero.y)||1;shots.push({x:hero.x,y:hero.y,vx:(nearest.x-hero.x)/d*350,vy:(nearest.y-hero.y)/d*350,from:'hero',ttl:1.6,damage:24});}
for(let e of foes){e.cool-=dt;let dx=hero.x-e.x,dy=hero.y-e.y,d=Math.hypot(dx,dy)||1;if(e.type==='mech'&&!phase2&&e.hp<e.max*.5){phase2=true;notify('PHASE 2 — Surcharge du Mécha !');}
if(d>(e.type==='mech'?190:105)){move(e,dx/d*e.speed*55*dt,dy/d*e.speed*55*dt,e.type==='mech'?24:13);}if(e.cool<=0){e.cool=e.type==='mech'?(phase2?1.05:1.5):e.type==='heavy'?1.8:rand(1.5,2.5);let speed=e.type==='mech'?225:155;shots.push({x:e.x,y:e.y,vx:dx/d*speed,vy:dy/d*speed,from:'enemy',ttl:2.7,damage:e.damage});if(e.type==='mech')e.alert=.36;}}for(let s of shots){s.x+=s.vx*dt;s.y+=s.vy*dt;s.ttl-=dt;if(s.from==='hero'){for(let e of foes){if(Math.hypot(s.x-e.x,s.y-e.y)<(e.type==='mech'?34:18)){e.hp-=s.damage;s.ttl=0;break;}}}else if(Math.hypot(s.x-hero.x,s.y-hero.y)<14){hero.hp-=s.damage;s.ttl=0;}}shots=shots.filter(s=>s.ttl>0&&s.x>=0&&s.y>=0&&s.x<data(room).w&&s.y<data(room).h);foes=foes.filter(e=>e.hp>0);if(hero.hp<=0){close();window.alert('EXPÉDITION ÉCHOUÉE — ceci est le mode alpha indépendant ; la sauvegarde principale est intacte.');return;}if(isCombat()&&foes.length===0&&!(room==='05'&&power==='console'))nextWave();if(msgSec>0)msgSec-=dt;}
function render(){const c=ui.canvas,ctx=c.getContext('2d'),r=data(room);if(!r)return;let cw=c.width,ch=c.height;ctx.fillStyle='#121c23';ctx.fillRect(0,0,cw,ch);let zoom=Math.min(cw/360,ch/650)*.96,camX=safe(hero.x-cw/(2*zoom),0,Math.max(0,r.w-cw/zoom)),camY=safe(hero.y-ch/(2*zoom),0,Math.max(0,r.h-ch/zoom));ctx.save();ctx.scale(zoom,zoom);ctx.translate(-camX,-camY);let bg=backs[room];if(bg?.complete&&bg.naturalWidth)ctx.drawImage(bg,0,0,r.w,r.h);else {ctx.fillStyle='#36454c';ctx.fillRect(0,0,r.w,r.h);}for(let [dir,p] of Object.entries(r.doors)){let v=p[1],locked=isCombat(),x=dir==='N'?v-35:dir==='S'?v-35:dir==='W'?0:r.w-20,y=dir==='N'?0:dir==='S'?r.h-20:v-38;ctx.fillStyle=locked?'#a94443':'#40d5c8';ctx.fillRect(x,y,dir==='N'||dir==='S'?70:20,dir==='N'||dir==='S'?20:76);}
if(collisionDebug){ctx.save();ctx.strokeStyle='#29a9ff';ctx.fillStyle='rgba(16,134,255,.16)';ctx.lineWidth=2;for(const poly of (r.solids||[])){ctx.beginPath();poly.forEach(([px,py],i)=>i?ctx.lineTo(px,py):ctx.moveTo(px,py));ctx.closePath();ctx.fill();ctx.stroke();}ctx.restore();}
if(room==='08'||room==='12'){ctx.beginPath();ctx.arc(180,room==='08'?275:330,78,0,Math.PI*2);ctx.strokeStyle=room==='08'?'#66ebdf':'#ffd074';ctx.lineWidth=5;ctx.stroke();ctx.fillStyle='#dbe7e4';ctx.font='16px sans-serif';ctx.textAlign='center';ctx.fillText(extractCountdown>0?'EXTRACTION '+Math.ceil(extractCountdown)+'s':'EXTRACTION',180,(room==='08'?275:330)-4);if(extractFill>0){ctx.beginPath();ctx.arc(180,room==='08'?275:330,69,-Math.PI/2,-Math.PI/2+extractFill*2*Math.PI);ctx.strokeStyle='#fff';ctx.stroke();}}
if(room==='05'&&power==='console'){ctx.fillStyle='#9ff5d8';ctx.beginPath();ctx.arc(360,605,23,0,Math.PI*2);ctx.fill();ctx.fillStyle='#22343b';ctx.font='14px sans-serif';ctx.textAlign='center';ctx.fillText('ON',360,610);}
for(let [i,chest] of (fixedChests[room]||[]).entries()){if((room==='07'||room==='09'||room==='11')&&!clear[room])continue;const open=chests[room+':'+i];ctx.fillStyle=open?'#576369':'#b68d4d';ctx.fillRect(chest.x-17,chest.y-13,34,26);ctx.strokeStyle='#fae0a3';ctx.strokeRect(chest.x-17,chest.y-13,34,26);}
for(let e of foes){ctx.fillStyle=e.type==='drone'?'#e6b56e':e.type==='mech'?'#bc8267':'#d27669';ctx.beginPath();ctx.arc(e.x,e.y,e.type==='mech'?32:14,0,Math.PI*2);ctx.fill();ctx.fillStyle='#20252a';ctx.fillRect(e.x-25,e.y-(e.type==='mech'?47:28),50,5);ctx.fillStyle='#f39b88';ctx.fillRect(e.x-25,e.y-(e.type==='mech'?47:28),50*e.hp/e.max,5);}
for(let s of shots){ctx.fillStyle=s.from==='hero'?'#87f0dd':'#ffbd76';ctx.beginPath();ctx.arc(s.x,s.y,5,0,Math.PI*2);ctx.fill();}
// Réutilise le vrai Survivant 3.0 de la base 0.9.3.
ctx.save();ctx.fillStyle='rgba(3,10,14,0.45)';ctx.beginPath();ctx.ellipse(hero.x,hero.y+21,14,6,0,0,Math.PI*2);ctx.fill();ctx.restore();
let survivorRendered=false;
try{survivorRendered=!!(window.AshTopDownSurvivor&&window.AshTopDownSurvivor.draw(ctx,{x:hero.x,y:hero.y,fx:heroFacing.x,fy:heroFacing.y}));}catch(e){if(!window.__ashFixedHeroError){console.warn('Survivant 3.0: rendu indisponible, fallback utilisé',e);window.__ashFixedHeroError=true;}}
if(!survivorRendered){ctx.fillStyle='#78d9ea';ctx.beginPath();ctx.arc(hero.x,hero.y,13,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#efffff';ctx.lineWidth=2;ctx.stroke();}ctx.restore();ui.label.textContent=`${room} · ${r.name} | Vie ${Math.max(0,Math.ceil(hero.hp))}/${hero.max} | ${credits} crédits · ${components} composants`;ui.notice.textContent=msgSec>0?message:'';}
function frame(t){if(!active)return;let dt=Math.min(.035,(t-last)/1000||.016);last=t;tick(dt);if(active)render();requestAnimationFrame(frame);}
function setup(){let b=document.createElement('button');b.id='ashFixedLaunch';b.textContent='🧭 TEST MONDE 1 FIXE · 12 SALLES (ALPHA)';b.title='Mode expérimental indépendant de la sauvegarde principale';const anchor=document.querySelector('#saveBtn');let host=document.querySelector('#refuge-page-progress')||anchor?.parentElement||document.body;host.appendChild(b);
let el=document.createElement('div');el.id='ashFixedModal';el.hidden=true;el.innerHTML='<div class="af-fixed-top"><strong id="afFixedLabel">ASHFALL · MODE FIXE</strong><button id="afFixedQuit">Quitter le test</button></div><canvas id="afFixedCanvas" width="430" height="690"></canvas><div id="afFixedNotice"></div><div class="af-fixed-info">Joystick tactile : glisser sur le terrain · PC : WASD/flèches · tir automatique · coffres automatiques. Ce prototype possède une sauvegarde indépendante.</div><div class="af-fixed-bottom"><button id="afFixedRestart">Nouvelle expédition</button><button id="afFixedExit">Retour au refuge</button></div>';document.body.appendChild(el);ui={modal:el,canvas:el.querySelector('canvas'),label:el.querySelector('#afFixedLabel'),notice:el.querySelector('#afFixedNotice')};const c=ui.canvas;
const open=()=>{if(active)return;active=true;el.hidden=false;document.body.style.overflow='hidden';initRun();last=performance.now();requestAnimationFrame(frame)};b.onclick=open;el.querySelector('#afFixedQuit').onclick=close;el.querySelector('#afFixedExit').onclick=close;el.querySelector('#afFixedRestart').onclick=initRun;
window.addEventListener('keydown',e=>{if(!active)return;if(e.code==='KeyC'){collisionDebug=!collisionDebug;return;}held.add(e.code);if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code))e.preventDefault()});window.addEventListener('keyup',e=>held.delete(e.code));
let start=null;c.addEventListener('pointerdown',e=>{c.setPointerCapture(e.pointerId);let rect=c.getBoundingClientRect();start={x:e.clientX,y:e.clientY};joystick={dx:0,dy:0};});c.addEventListener('pointermove',e=>{if(!start||!joystick)return;let dx=e.clientX-start.x,dy=e.clientY-start.y,d=Math.hypot(dx,dy)||1;joystick.dx=dx/Math.max(35,d);joystick.dy=dy/Math.max(35,d);});const end=()=>{start=null;joystick=null};c.addEventListener('pointerup',end);c.addEventListener('pointercancel',end);
}
fetch(RURL+'rooms.json').then(x=>x.json()).then(v=>{rooms=v;for(const k of Object.keys(v)){let im=new Image();im.src=RURL+k+'.webp?v=room06-v63';backs[k]=im;}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();}).catch(e=>console.error('Fixed world alpha failed:',e));
})();
