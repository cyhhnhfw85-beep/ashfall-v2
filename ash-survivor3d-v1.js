/* ASHFALL Survivor 3D experimental V1 — original animated 3D mesh rendered into 2D canvas.
   No remote dependencies; orthographic 3D camera, actual six-face cuboids, articulated joints.
   Visual only: gameplay and collisions remain controlled by game.js. */
(()=>{'use strict';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const rgb=h=>{let v=parseInt(h.slice(1),16);return [(v>>16)&255,(v>>8)&255,v&255]};
const tint=(h,f)=>{let c=rgb(h).map(x=>Math.round(clamp(x*f,0,255)));return `rgb(${c.join(',')})`};
const V=(x,y,z)=>[x,y,z];
const sub=(a,b)=>a.map((x,i)=>x-b[i]);
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
const norm=a=>{let l=Math.hypot(...a)||1;return a.map(x=>x/l)};
const faces=[[0,1,2,3],[4,7,6,5],[0,4,5,1],[3,2,6,7],[0,3,7,4],[1,5,6,2]];
const light=norm([-.5,-.7,1.4]);
let last=null,phase=0,lastTime=0,shots=0;
function draw(ctx,state){if(!state||!Number.isFinite(state.x)||!Number.isFinite(state.y))return false;
try{
 const now=performance.now();let dt=Math.min(.05,Math.max(0,(now-lastTime)/1000));lastTime=now;
 const dx=last?state.x-last.x:0,dy=last?state.y-last.y:0;
 const speed=clamp(Math.hypot(dx,dy)/Math.max(dt,.016),0,170);
 phase+=dt*(speed>8?8.5*clamp(speed/85,.4,1.5):1.2);
 const stride=clamp(speed/90,0,1)*Math.sin(phase),bob=speed>8?Math.abs(Math.sin(phase))*0.65:Math.sin(phase*.7)*.14;
 last={x:state.x,y:state.y};
 // World Y = character front, world Z = height. Orthographic camera looks down at 55 degrees.
 // Local weapon barrel points along +Y. Convert screen aim vector into
 // camera-space world direction, then rotate local +Y onto that vector.
 // Camera up projects world Y with a factor of eye.z (0.82).
 const aimX=Number.isFinite(state.fx)?state.fx:1;
 const aimY=Number.isFinite(state.fy)?state.fy:0;
 const heading=Math.atan2(-aimY/.82,aimX)-Math.PI/2;
 const ca=Math.cos(heading),sa=Math.sin(heading);
 const eye=norm([0,-.57,.82]);const right=[1,0,0],up=norm(cross(eye,right));
 const scale=.89,origin=[state.x,state.y+7];let polys=[];
 function project(v){const w=[v[0]*ca-v[1]*sa,v[0]*sa+v[1]*ca,v[2]];return [origin[0]+dot(w,right)*scale,origin[1]-dot(w,up)*scale,dot(w,eye)]}
 function cube(cx,cy,cz,w,d,h,color,rot=0){let c=Math.cos(rot),s=Math.sin(rot);let pts=[];
  for(let z of [-h/2,h/2])for(let y of [-d/2,d/2])for(let x of [-w/2,w/2])pts.push(project([cx+x*c-y*s,cy+x*s+y*c,cz+z]));
  // reorder to conventional cube corners
  let ix=[0,1,3,2,4,5,7,6],p=ix.map(i=>pts[i]);
  for(let face of faces){let vs=face.map(i=>p[i]);let n=norm(cross(sub(vs[1],vs[0]),sub(vs[2],vs[0])));let intensity=.62+.34*Math.abs(dot(n,light));polys.push({vs,depth:vs.reduce((a,v)=>a+v[2],0)/4,color:tint(color,intensity),edge:tint(color,.47)});}
 }
 function beam(a,b,w,d,color){
  // Proper segment aligned from one articulated joint to the other.
  let delta=sub(b,a),length=Math.hypot(...delta),axis=norm(delta),ref=Math.abs(axis[2])>.9?[0,1,0]:[0,0,1];
  let u=norm(cross(axis,ref)),v=norm(cross(axis,u)),pts=[];
  for(let p of [a,b])for(let i of [-1,1])for(let j of [-1,1])pts.push(project([p[0]+u[0]*i*w/2+v[0]*j*d/2,p[1]+u[1]*i*w/2+v[1]*j*d/2,p[2]+u[2]*i*w/2+v[2]*j*d/2]));
  let faces2=[[0,1,3,2],[4,6,7,5],[0,4,5,1],[2,3,7,6],[0,2,6,4],[1,5,7,3]];
  for(let face of faces2){let vs=face.map(i=>pts[i]);polys.push({vs,depth:vs.reduce((a,p)=>a+p[2],0)/4,color:tint(color,.82),edge:tint(color,.48)})}
 }
 function wedge(cx,cy,cz,lowerW,upperW,depth,h,color){
  // Tapered six-face volume: hood fabric and shaped armor, not a cuboid.
  let pts=[];for(let [z,w] of [[cz-h/2,lowerW],[cz+h/2,upperW]])for(let y of [-depth/2,depth/2])for(let x of [-w/2,w/2])pts.push(project([cx+x,cy+y,z]));
  let ix=[0,1,3,2,4,5,7,6],p=ix.map(i=>pts[i]);for(let face of faces){let vs=face.map(i=>p[i]);polys.push({vs,depth:vs.reduce((a,v)=>a+v[2],0)/4,color:tint(color,.78),edge:tint(color,.51)})}
 }
 // More human proportions: distinct thigh/shin, stance and heel-to-toe movement.
 for(let side of [-1,1]){
  let st=stride*side,hip=[side*5,0,23+bob],knee=[side*5.4,st*3.5,14+bob+Math.max(0,st)*1.6],ankle=[side*5.5,st*6,5+Math.max(0,st)*2.8];
  beam(hip,knee,6.6,7.3,'#282a2e');cube(...knee,7.4,7.8,5.3,'#827d72');
  beam(knee,ankle,5.8,6.2,'#1c2025');cube(ankle[0],ankle[1]+2,ankle[2]-1,7.5,12,5,'#262a30');
  cube(ankle[0],ankle[1]+6.3,ankle[2]-1.5,7.2,4,2.6,'#a2937b');
  cube(side*5.2,1,20+bob,8.2,8.5,5,'#171b20');
  cube(side*5.3,-2,9+bob,6.3,3,2.5,'#a87629');
 }
 // Sculpted jacket with tapered torso and separate vest.
 wedge(0,0,33+bob,18,21,14,19,'#d9922e');
 wedge(0,5,34+bob,18,20,5,15,'#25292d');
 cube(0,9.2,31+bob,17,3,11,'#15191e');
 // Heavy backpack: body, top roll, side packs, lower pockets and straps.
 wedge(0,-11,35+bob,17,19,10,19,'#171a1f');
 cube(0,-13,46+bob,16,10,5,'#303034');
 for(let side of [-1,1]){
  cube(side*10.3,-12,33+bob,6,8,13,'#202126');
  cube(side*10.5,-13,27+bob,6,9,6,'#323237');
  cube(side*7.8,-6,39+bob,2.8,6,17,'#514b40');
  cube(side*8.7,-14,39+bob,2,2,3,'#8a8477');
 }
 cube(0,-14,25+bob,13,9,6,'#27292d');
 // Webbing, front pouches and strap buckles.
 for(let x of [-7,-2.3,2.3,7]){
  cube(x,10.9,27+bob,4,4.5,8,'#292a2b');
  cube(x,13.2,29+bob,2.8,1.2,1.8,'#777770');
 }
 for(let side of [-1,1]){
  cube(side*8.2,8,37+bob,2.4,3.4,14,'#393c3e');
  cube(side*8.2,10.2,36+bob,2.2,1.3,3,'#a69b89');
  cube(side*7,3,24+bob,5,6,7,'#242529');
 }
 // Hood: broad shoulders, tapered top, face recess and rim. Never a simple cube.
 wedge(0,0,48+bob,20,16,16,17,'#e7a339');
 wedge(0,0,55+bob,17,9,14,6,'#d38c2a');
 wedge(0,7,49+bob,14,12,5,11,'#a76a25');
 cube(0,10.2,48+bob,11.8,3,9,'#101319');
 wedge(0,12,48+bob,9.5,8.8,2,7,'#222830');
 cube(0,13.3,47+bob,7,1.5,3,'#454a4c');
 cube(0,13.5,51+bob,8,1.2,1.5,'#090d12');
 // Sleeves and articulated hands holding the rifle.
 for(let side of [-1,1]){
  let shoulder=[side*11.5,2,39+bob],elbow=[side*14,9,33+bob],hand=[side*5.1,17+(side<0?6:-2),33+bob];
  beam(shoulder,elbow,8.2,8.5,'#d89430');
  cube(...elbow,7.3,7.5,6,'#32353a');
  beam(elbow,hand,6.5,6.8,'#bb7d29');
  cube(...hand,6.4,6.6,5.5,'#24272c');
  cube(side*12,3,40+bob,8.6,8.5,6,'#dca03c');
  cube(side*13.3,5.5,40+bob,5,2,4,'#33373d');
 }
 // Distinct stock, receiver, magazine, handguard, scope and muzzle; barrel = local +Y.
 cube(0,8,34+bob,7,16,4.8,'#282b2d');
 cube(0,18,34+bob,7.6,15,5.8,'#33363a');
 cube(0,31,34+bob,5.6,19,4.5,'#25292c');
 cube(0,43,34+bob,2.7,12,2.7,'#13171b');
 cube(0,49.3,34+bob,4.3,3.5,3.7,'#55595a');
 cube(0,17,38.6+bob,4.4,10,2.5,'#4e5256');
 cube(0,21,41+bob,3.7,6,3.5,'#151a1d');
 cube(0,18,28+bob,5,6,10,'#545352');
 cube(0,3.5,35+bob,7.8,10,3.5,'#202326');
 for(let i=0;i<4;i++){
  cube(-2.9,27+i*4.5,36.7+bob,1.3,2,1.2,'#8a806b');
  cube(2.9,27+i*4.5,36.7+bob,1.3,2,1.2,'#8a806b');
 }
 polys.sort((a,b)=>a.depth-b.depth);
 ctx.save();ctx.translate(0,0);
 // contact shadow follows player and stays within existing gameplay coordinate system
 ctx.fillStyle='rgba(0,0,0,.35)';ctx.beginPath();ctx.ellipse(state.x,state.y+12,14,5,0,0,Math.PI*2);ctx.fill();
 for(let p of polys){ctx.beginPath();ctx.moveTo(p.vs[0][0],p.vs[0][1]);for(let i=1;i<4;i++)ctx.lineTo(p.vs[i][0],p.vs[i][1]);ctx.closePath();ctx.fillStyle=p.color;ctx.fill();ctx.strokeStyle=p.edge;ctx.lineWidth=.45;ctx.stroke()}
 ctx.restore();return true;
}catch(e){if(!window.__ash3dErrorLogged){console.warn('ASHFALL 3D fallback',e);window.__ash3dErrorLogged=true;}return false;}}
window.AshSurvivor3D={draw,version:'2.0-human-remodel'};
})();
