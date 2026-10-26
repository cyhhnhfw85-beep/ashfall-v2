/* ASHFALL Graphics P2.5 — modular Nomade fragment clean-up. All operations are visual/read-only. */
(function(root){'use strict';
const VERSION='survivor-paperdoll-v1-pilot-p25';
const BASE='assets/skins/nomad-v2/';
const VIEWS=['front','front-quarter','side','back-quarter','back'];
const CORE=['head','torso','hips','arm-far','arm-near','leg-left','leg-right'];
const WEAPONS=['carbine_k17','cendre','impulse','ion','nomade9','pistol_reinforced','pistol_rescue','pistol_used','precision','prototype','reliquat','rifle_industrial','rifle_recovery','smg_sector','spectre','vektor'];
const imgMap=Object.create(null), assetState=Object.create(null);
const assetPath=(key)=>key.startsWith('weapon:')?'assets/weapons_framed/'+key.slice(7)+'.png':BASE+key+'.png';
function load(key){
 if(imgMap[key])return imgMap[key];
 const image=new Image(); imgMap[key]=image;assetState[key]='loading';
 image.decoding='async';
 image.onload=()=>assetState[key]='ready';
 image.onerror=()=>assetState[key]='error';
 image.src=root.__ASH_PILOT_TEST_ASSETS?.[assetPath(key)] || assetPath(key);
 return image;
}
for(const view of VIEWS){for(const part of CORE)load(view+'__'+part);load(view+'__bag');}
for(const id of WEAPONS)load('weapon:'+id);
const ready=key=>assetState[key]==='ready'&&imgMap[key]?.naturalWidth>0;
const palette=r=>r==='Légendaire'?'#dda95e':r==='Épique'?'#ba8aeb':r==='Rare'?'#69accd':r==='Inhabituel'?'#86baa2':'#778a8f';
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const dirName=ang=>{const i=((Math.round(ang/(Math.PI/4))%8)+8)%8;return ['right','down-right','down','down-left','left','up-left','up','up-right'][i];};
const directionMap=Object.freeze({
 'right':['side',false],'down-right':['front-quarter',false],'down':['front',false],
 'down-left':['front-quarter',true],'left':['side',true],
 'up-left':['back-quarter',true],'up':['back',false],'up-right':['back-quarter',false]
});
function visualPose(o){
 const fx=Number.isFinite(o.fx)?o.fx:1,fy=Number.isFinite(o.fy)?o.fy:0;
 const dx=Number(o.dx)||0,dy=Number(o.dy)||0;
 const moving=Math.hypot(dx,dy)>.15;
 const aim=Math.atan2(fy,fx);
 const locomotion=moving?Math.atan2(dy,dx):aim;
 const viewName=dirName(aim),legName=dirName(locomotion);
 const [view,mirror]=directionMap[viewName];
 const [legView,legMirror]=directionMap[legName];
 return {fx,fy,aim,view,mirror,legView,legMirror,moving,dir:viewName,legDir:legName};
}
// Same source canvas and anchor for EVERY part and master view.
const SRC_W=112,SRC_H=230,WIDTH=53,HEIGHT=74,ROOT_Y=-46;
function drawPart(ctx,view,part,mirror,xShift=0,yShift=0,rotation=0,alpha=1){
 const key=view+'__'+part;
 if(!ready(key))return false;
 ctx.save();
 ctx.translate(xShift,yShift);
 if(rotation)ctx.rotate(rotation);
 if(mirror)ctx.scale(-1,1);
 ctx.globalAlpha=alpha;
 ctx.drawImage(imgMap[key],-WIDTH/2,ROOT_Y,WIDTH,HEIGHT);
 ctx.restore();
 return true;
}
function genericSilhouette(ctx,o){
 // A deliberately in-family fallback, NOT drawNomadGameplay(): can be used on cold/offline startup.
 ctx.save();
 ctx.fillStyle='#171d27';ctx.strokeStyle='#7899a4';ctx.lineWidth=1.2;
 ctx.beginPath();ctx.ellipse(0,21,15,5,0,0,Math.PI*2);ctx.fill();
 ctx.fillStyle='#293844';ctx.strokeStyle='#1b2830';
 for(const dx of [-6,6]){ctx.beginPath();ctx.roundRect(dx-4,1,8,24,2);ctx.fill();ctx.stroke();}
 ctx.fillStyle='#3a4656';ctx.beginPath();ctx.roundRect(-11,-21,22,26,4);ctx.fill();ctx.stroke();
 ctx.fillStyle='#333949';ctx.beginPath();ctx.moveTo(-13,-27);ctx.lineTo(-9,-37);ctx.lineTo(0,-42);ctx.lineTo(10,-37);ctx.lineTo(13,-27);ctx.lineTo(9,-17);ctx.lineTo(-9,-17);ctx.closePath();ctx.fill();ctx.stroke();
 ctx.fillStyle='#10161d';ctx.fillRect(-8,-27,16,6);ctx.fillStyle='#d79e62';ctx.fillRect(-5,-26,3,1);ctx.fillRect(2,-26,3,1);
 if(o.bag){ctx.fillStyle='#344c54';ctx.fillRect(-14,-13,5,14);}
 ctx.restore();
}
function genericWeapon(ctx,weaponClass){
 const pistol=weaponClass==='pistol';
 ctx.fillStyle='#475966';ctx.strokeStyle='#0b1820';ctx.lineWidth=1.4;
 const length=pistol?19:33;
 ctx.fillRect(-length*.3,-2.5,length,5);ctx.strokeRect(-length*.3,-2.5,length,5);
 ctx.fillStyle='#c4a16d';ctx.fillRect(2,-3,2,3);
 ctx.fillStyle='#2a3037';ctx.beginPath();ctx.moveTo(-3,2);ctx.lineTo(3,2);ctx.lineTo(5,9);ctx.lineTo(1,9);ctx.closePath();ctx.fill();
}
function weapon(ctx,id,weaponClass,aim){
 ctx.save();ctx.translate(3,-13);ctx.rotate(aim*.72); // project world-plane aim to isometric sprite plane
 const k='weapon:'+id;
 const has=!!id&&ready(k);
 const short=weaponClass==='pistol'||weaponClass==='smg';
 const w=short?24:35,h=short?12:17;
 if(has){
  ctx.shadowColor='rgba(8,14,20,.55)';ctx.shadowBlur=2;
  ctx.drawImage(imgMap[k],-w*.29,-h*.52,w,h);
 }else genericWeapon(ctx,weaponClass);
 // Glove contacts drawn AFTER weapon, ensuring both hands appear to hold it.
 ctx.fillStyle='#313c44';ctx.strokeStyle='#0d1720';ctx.lineWidth=1;
 for(const [x,y] of [[1,4],[short?8:12,1]]){
  ctx.beginPath();ctx.ellipse(x,y,2.6,2.2,0,0,Math.PI*2);ctx.fill();ctx.stroke();
 }
 ctx.restore();
}
function drawOptionalGear(ctx,o,pose){
 const hasBag=!!o.bag;
 if(hasBag){
  const part=pose.view+'__bag';
  // Each angle relies only on its OWN bag image. Failure never blocks body render.
  if(!drawPart(ctx,pose.view,'bag',pose.mirror,-2,-1,0,.96)){
   // Stable small fallback satchel, in same style; no return to legacy skin.
   ctx.save();ctx.fillStyle='#3c4547';ctx.strokeStyle='#788b8c';ctx.lineWidth=1;
   ctx.beginPath();ctx.roundRect(pose.mirror?11:-18,-20,9,15,2);ctx.fill();ctx.stroke();ctx.restore();
  }
 }
 const armor=o.armor||null,boots=o.boots||null;
 if(armor){ctx.strokeStyle=palette(armor.rar);ctx.lineWidth=1.1;ctx.globalAlpha=.78;ctx.beginPath();ctx.moveTo(-9,-14);ctx.lineTo(-6,-8);ctx.moveTo(9,-14);ctx.lineTo(6,-8);ctx.stroke();ctx.globalAlpha=1;}
 if(boots){ctx.fillStyle=palette(boots.rar);ctx.globalAlpha=.78;ctx.fillRect(-11,24,5,2);ctx.fillRect(6,24,5,2);ctx.globalAlpha=1;}
 if(o.module?.model==='module-tesla'){ctx.fillStyle='#79bfc5';ctx.fillRect(-10,-17,2,3);}
 if(o.artifact){ctx.fillStyle=palette(o.artifact.rar);ctx.fillRect(7,-9,2,2);}
}
function draw(ctx,o){
 if(!ctx||!o)return false;
 const pose=visualPose(o);
 const eq=o.weaponVisual||root.AshSurvivorVisualResolver?.resolveWeapon(o.weapon)||{id:null,weaponClass:'rifle'};
 const step=pose.moving?Math.sin((Number(o.time)||0)*10.8):0;
 const bounce=pose.moving?Math.abs(step)*.8:0;
 ctx.save();
 try{
  ctx.fillStyle='rgba(3,12,18,.4)';ctx.beginPath();ctx.ellipse(o.x,o.y+19,15,5,0,0,Math.PI*2);ctx.fill();
  ctx.translate(o.x,o.y-bounce);
  const essentials=[pose.view+'__head',pose.view+'__torso',pose.legView+'__leg-left',pose.legView+'__leg-right'];
  if(essentials.some(k=>!ready(k))){genericSilhouette(ctx,o);if(!o.previewUnarmed)weapon(ctx,eq.id,eq.weaponClass,pose.aim);return true;}
  // Side/back bags go behind torso, but front facing packs are hidden by shoulder except edge.
  if(o.bag && pose.view!=='back' && pose.view!=='back-quarter'){
   drawOptionalBagBehind(ctx,o,pose);
  }
  const vx=Math.cos(pose.moving?Math.atan2(o.dy||0,o.dx||1):pose.aim);
  const vy=Math.sin(pose.moving?Math.atan2(o.dy||0,o.dx||1):pose.aim);
  drawPart(ctx,pose.legView,'leg-left',pose.legMirror, step*vx*2,step*vy*1.6,step*.017);
  drawPart(ctx,pose.legView,'leg-right',pose.legMirror,-step*vx*2,-step*vy*1.6,-step*.017);
  drawPart(ctx,pose.view,'hips',pose.mirror);
  drawPart(ctx,pose.view,'arm-far',pose.mirror,0,0,-pose.fy*.08);
  drawPart(ctx,pose.view,'torso',pose.mirror);
  if(o.bag && (pose.view==='back'||pose.view==='back-quarter')){
   drawOptionalGear(ctx,{bag:o.bag},pose); // back bag overlays jacket
  }
  drawPart(ctx,pose.view,'head',pose.mirror);
  // Near arm follows aim in restrained, natural 2D projection; independent of leg motion.
  drawPart(ctx,pose.view,'arm-near',pose.mirror,0,0,pose.fx*.045);
  if(!o.previewUnarmed)weapon(ctx,eq.id,eq.weaponClass,pose.aim);
  drawOptionalGear(ctx,{...o,bag:null},pose); // Armor/boots/module, bag not duplicated
  return true;
 }catch(err){
  try{ctx.restore();ctx.save();ctx.translate(o.x,o.y);genericSilhouette(ctx,o);return true;}catch(_){return false;}
 }finally{ctx.restore();}
}
function drawOptionalBagBehind(ctx,o,pose){
 if(!o.bag)return;
 if(!drawPart(ctx,pose.view,'bag',pose.mirror,-2,0,0,.92)){
  ctx.save();ctx.fillStyle='#394d54';ctx.beginPath();ctx.roundRect(pose.mirror?13:-19,-24,9,19,2);ctx.fill();ctx.restore();
 }
}
root.AshPaperDollV1=Object.freeze({version:VERSION,draw,visualPose,status:()=>({...assetState}),required:CORE,views:VIEWS,directions:directionMap});
})(window);
