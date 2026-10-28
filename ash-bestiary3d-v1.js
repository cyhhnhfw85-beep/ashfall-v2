/* ASHFALL Bestiaire V3 — reliable self-contained canvas projected 3D.
   Five distinct enemy silhouettes, always visible opaque geometry.
   Does not touch AI, collision, stats or saves. */
(()=>{'use strict';
const PI=Math.PI,TAU=PI*2;
const colors={chaser:['#b86962','#533d42','#d5a38b'],ranged:['#a7a48b','#394d53','#ead0a0'],drone:['#5d8b9c','#203c4b','#84efff'],brute:['#a47b62','#3d4650','#f5b879'],sentinel:['#877eaa','#303447','#c7b0ff']};
const faces=[];
function draw(ctx,e,sector,time,boss=false,player){
 if(!ctx||!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return false;
 const kind=colors[e.type]?e.type:'chaser',c=colors[kind],isDrone=kind==='drone';
 const size=boss?1.28:kind==='brute'?1.22:1;
 const aim=Number.isFinite(e.aim)&&e.wind>0?e.aim:Math.atan2((player?.y??e.y)-e.y,(player?.x??e.x+1)-e.x);
 const bob=Math.sin(time*7+e.x*.05)*.8;
 // 3D orthographic model: top-down camera, Z gives visible vertical height.
 // Draw in local coordinates; no dependence on global game sprite transforms.
 const parts=[];
 function box(x,y,z,w,d,h,col){
  const pts=[];
  for(const zz of [-1,1])for(const yy of [-1,1])for(const xx of [-1,1]){
   const px=x+xx*w/2,py=y+yy*d/2,pz=z+zz*h/2;
   pts.push([px,py*.78-pz*.48,py*.6+pz*.8]);
  }
  for(const [indices,k] of [[[0,1,3,2],.7],[[4,5,7,6],1.2],[[0,1,5,4],.9],[[2,3,7,6],.83],[[0,2,6,4],.76],[[1,3,7,5],1.0]]){
   const v=indices.map(i=>pts[i]);parts.push({v,depth:v.reduce((a,p)=>a+p[2],0)/4,col,k});
  }
 }
 function limb(x,y,z,X,Y,Z,w,col){const dx=X-x,dy=Y-y,dist=Math.hypot(dx,dy)||1;
  const a=Math.atan2(dy,dx),cx=(x+X)/2,cy=(y+Y)/2;
  box(cx,cy,(z+Z)/2,dist+w,w,Math.max(3,Math.abs(Z-z)+w),col);
 }
 const step=Math.sin(time*8+e.x*.07)*2;
 if(isDrone){
  box(0,0,23+bob,25,20,12,c[0]);box(0,9,24+bob,15,5,9,c[1]);
  for(const s of [-1,1]){box(s*21,0,21+bob,16,14,7,c[1]);box(s*24,2,26+bob,8,7,3,c[2]);box(s*12,0,25+bob,10,6,5,c[0]);}
  box(0,12,25+bob,9,3,6,c[2]);
 }else{
  for(const s of [-1,1]){
   box(s*7,step*s,8,8,12,14,c[1]);box(s*7,step*s+3,3,9,12,5,c[1]);
   box(s*12,4,28,9,10,13,c[0]);box(s*14,12,21,6,7,14,c[1]);
  }
  box(0,0,29,22,17,23,c[0]);box(0,-9,30,18,7,18,c[1]);
  box(0,0,47,17,16,14,c[0]);box(0,10,47,12,4,8,c[1]);
  box(0,12,48,7,3,3,c[2]);
  if(kind==='brute'){box(0,-13,30,23,11,24,c[1]);box(0,13,29,13,5,10,c[2]);}
  if(kind==='sentinel'){box(0,-11,32,18,10,19,c[1]);box(0,12,31,10,4,12,c[2]);}
  if(kind==='chaser'){
   for(const s of [-1,1])box(s*15,19,18,4,14,4,c[2]);
  }else{
   box(0,19,31,8,23,7,c[1]);box(0,33,31,5,17,5,c[0]);box(0,42,31,3,9,3,c[1]);
  }
 }
 parts.sort((a,b)=>a.depth-b.depth);
 ctx.save();
 try{
  ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
  ctx.translate(e.x,e.y+9);ctx.scale(size,size);
  // Point weapon + front of model toward enemy's target.
  ctx.rotate(aim-PI/2);
  ctx.fillStyle='rgba(0,0,0,.42)';ctx.beginPath();ctx.ellipse(0,12,19,9,0,0,TAU);ctx.fill();
  for(const f of parts){ctx.beginPath();ctx.moveTo(f.v[0][0],f.v[0][1]);for(let i=1;i<4;i++)ctx.lineTo(f.v[i][0],f.v[i][1]);ctx.closePath();
   ctx.fillStyle=f.col;ctx.fill();ctx.strokeStyle='#15252d';ctx.lineWidth=.8;ctx.stroke();}
  // Distinct emissive visors that remain visible on small phone screens.
  ctx.fillStyle=c[2];ctx.shadowColor=c[2];ctx.shadowBlur=7;
  ctx.fillRect(-4,8-47*.48,8,3);ctx.shadowBlur=0;
  return true;
 }catch(err){console.warn('ASHFALL enemy model V3',err);return false;}
 finally{ctx.restore();}
}
window.AshBestiary3D={draw,version:'3.0-rebuilt'};
})();
