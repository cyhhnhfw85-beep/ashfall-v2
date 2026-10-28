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
 function part(a,b,width,depth,color){let mid=a.map((v,i)=>(v+b[i])/2),len=Math.hypot(...sub(b,a));
 // Beam along vertical by default; joint placement is animated, with small rotations around X/Y.
 cube(mid[0],mid[1],mid[2],width,depth,Math.max(1,len),color);
 }
 // Legs (independent animation, visible boots and knee armor)
 for(let side of [-1,1]){
  let st=stride*side,hip=[side*5.1,0,21+bob],knee=[side*5.5,st*3.3,13+bob+Math.max(0,st)*1.4],foot=[side*5.7,st*6,3.4+Math.max(0,st)*2.5];
  part(hip,knee,7.6,8.2,'#25282c');cube(...knee,8.2,7,5.5,'#67645d');part(knee,foot,6.5,7.2,'#171d22');cube(foot[0],foot[1]+2.1,foot[2],8,12,5.4,'#30343a');cube(foot[0],foot[1]+5.6,foot[2]+.4,7.5,3,3,'#9b8b71');
 }
 // Jacket, hood, armor and black tactical backpack
 cube(0,0,31+bob,19,12,19,'#df942f');cube(0,3.8,33+bob,19,4,14,'#20252a');
 cube(0,-9,32+bob,17,11,20,'#161a20');
 for(let side of [-1,1]){cube(side*7.5,-12,32+bob,5,7,8,'#292e33');cube(side*6,7,26+bob,5,5,6,'#171b21');}
 for(let x of [-7,-2.5,2.5,7])cube(x,8.3,26+bob,4,4,8,'#24272a');
 cube(0,0,46+bob,15,13,15,'#e8a437');cube(0,6.7,46+bob,11,2,10,'#15191f');cube(0,8,47+bob,10,3,7,'#222a30');cube(0,9.8,45+bob,6,2,3,'#555e61');
 // raised hood rim and crown
 cube(0,2,54+bob,18,14,5,'#e9a43a');cube(0,8,52+bob,17,3,4,'#b97725');
 // shoulder/arms in aiming pose
 for(let side of [-1,1]){
  cube(side*12,2,37+bob,8,10,11,'#df972f');cube(side*13,6,33+bob,7,8,8,'#2b2e32');
  cube(side*9,12,31+bob,8,8,7,'#24272b');
 }
 // Weapon points forward in local +Y; recognizable receiver, magazine, scope and barrel
 cube(0,14,33+bob,8,23,5,'#252a30');cube(0,27,33+bob,5,22,4,'#151a1f');cube(0,40,33+bob,3,8,3,'#44494c');
 cube(0,11,37+bob,4,9,3,'#51565a');cube(0,13,27+bob,5,7,10,'#484b4c');
 for(let i=0;i<3;i++)cube(-3.2,24+i*5,35+bob,1,2,1,'#a58c62');
 polys.sort((a,b)=>a.depth-b.depth);
 ctx.save();ctx.translate(0,0);
 // contact shadow follows player and stays within existing gameplay coordinate system
 ctx.fillStyle='rgba(0,0,0,.35)';ctx.beginPath();ctx.ellipse(state.x,state.y+12,14,5,0,0,Math.PI*2);ctx.fill();
 for(let p of polys){ctx.beginPath();ctx.moveTo(p.vs[0][0],p.vs[0][1]);for(let i=1;i<4;i++)ctx.lineTo(p.vs[i][0],p.vs[i][1]);ctx.closePath();ctx.fillStyle=p.color;ctx.fill();ctx.strokeStyle=p.edge;ctx.lineWidth=.45;ctx.stroke()}
 ctx.restore();return true;
}catch(e){if(!window.__ash3dErrorLogged){console.warn('ASHFALL 3D fallback',e);window.__ash3dErrorLogged=true;}return false;}}
window.AshSurvivor3D={draw,version:'1.1-aim-alignment'};
})();
