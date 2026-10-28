/* ASHFALL Bestiary 3D V1: procedural polygonal 3D geometry projected into
 * the existing 2D game canvas. Visual only, zero external dependencies.
 * One draw call per enemy; existing combat and physics remain authoritative. */
(()=>{'use strict';
const PI=Math.PI, clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const pal=[
 {red:'#a45855',tan:'#b89b73',metal:'#617982',dark:'#252a31',blue:'#5acde8',violet:'#b79add'},
 {red:'#a45855',tan:'#c4b28a',metal:'#72929c',dark:'#242e36',blue:'#67d7f0',violet:'#bb9fdf'},
 {red:'#b16754',tan:'#bfa079',metal:'#82716b',dark:'#302a2b',blue:'#79cde6',violet:'#c9a2dd'},
 {red:'#a45b65',tan:'#a6a0b7',metal:'#77768f',dark:'#282638',blue:'#7ecbff',violet:'#c39df4'}
];
const rgb=h=>{let n=parseInt(h.slice(1),16);return [(n>>16)&255,(n>>8)&255,n&255]};
const shade=(h,k)=>'rgb('+rgb(h).map(v=>Math.round(clamp(v*k,0,255))).join(',')+')';
const sub=(a,b)=>a.map((v,i)=>v-b[i]);
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2]];
const norm=v=>{let l=Math.hypot(...v)||1;return v.map(x=>x/l)};
const dot=(a,b)=>a.reduce((v,x,i)=>v+x*b[i],0);
const faces=[[0,1,3,2],[4,6,7,5],[0,4,5,1],[2,3,7,6],[0,2,6,4],[1,5,7,3]];
const states=new WeakMap();
function draw(ctx,e,sector,time,boss=false,player=null){
 if(!ctx||!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return false;
 const kind=e.type;
 if(!['chaser','ranged','drone','brute','sentinel'].includes(kind))return false;
 try{
 const p=pal[clamp(sector|0,0,3)],prev=states.get(e),dt=prev?clamp(time-prev.time,.008,.08):.016;
 const moved=prev?Math.hypot(e.x-prev.x,e.y-prev.y):0;
 const moving=clamp(moved/(dt*90),0,1),phase=(prev?.phase||0)+dt*(moving>.08?8.8:1.2);
 states.set(e,{x:e.x,y:e.y,time,phase});
 const aim=Number.isFinite(e.aim)&&e.wind>0?e.aim:Math.atan2((player?.y??e.y+1)-e.y,(player?.x??e.x+1)-e.x);
 const ca=Math.cos(aim-PI/2),sa=Math.sin(aim-PI/2),scale=boss?1.12:kind==='brute'?1.02:.87;
 // The same inclined orthographic projection convention as Survivor 3D.
 const eye=norm([0,-.57,.82]),up=norm(cross(eye,[1,0,0]));
 const origin=[e.x,e.y+7],poly=[];
 const project=v=>{const w=[v[0]*ca-v[1]*sa,v[0]*sa+v[1]*ca,v[2]];return [origin[0]+w[0]*scale,origin[1]-dot(w,up)*scale,dot(w,eye)]};
 function prism(x,y,z,w,d,h,col){
  let pts=[];for(let zz of [-h/2,h/2])for(let yy of [-d/2,d/2])for(let xx of [-w/2,w/2])pts.push(project([x+xx,y+yy,z+zz]));
  let id=[0,1,3,2,4,5,7,6],q=id.map(i=>pts[i]);
  for(let f of faces){let vs=f.map(i=>q[i]);poly.push({vs,depth:vs.reduce((v,a)=>v+a[2],0)/4,col});}
 }
 function segment(a,b,w,d,col){
  let axis=norm(sub(b,a)),ref=Math.abs(axis[2])>.9?[0,1,0]:[0,0,1],u=norm(cross(axis,ref)),v=norm(cross(axis,u));
  let pts=[];for(let base of [a,b])for(let i of [-1,1])for(let j of [-1,1])pts.push(project(base.map((n,k)=>n+u[k]*i*w/2+v[k]*j*d/2)));
  for(let f of faces){let vs=f.map(i=>pts[i]);poly.push({vs,depth:vs.reduce((v,a)=>v+a[2],0)/4,col});}
 }
 const bob=Math.sin(phase*2)*.3;
 if(kind==='drone'){
  const hover=Math.sin(phase*3)*1.5;
  for(let side of [-1,1]){
   prism(side*17,0,27+hover,15,11,8,p.dark);
   prism(side*23,1,29+hover,8,8,3,p.metal);
   prism(side*24,3,30+hover,5,3,2,p.blue);
   segment([side*9,0,27+hover],[side*19,0,27+hover],5,6,p.metal);
  }
  prism(0,0,28+hover,25,19,13,p.metal);
  prism(0,8,29+hover,17,4,10,p.dark);
  prism(0,11,30+hover,10,2,8,p.blue);
  prism(0,13,30+hover,4,2,4,'#e3fcff');
  prism(0,-6,35+hover,14,6,3,p.metal);
 }else{
  const large=kind==='brute'?1.28:kind==='sentinel'?1.14:1;
  const armor=kind==='chaser'?p.red:kind==='ranged'?p.tan:kind==='brute'?p.metal:p.violet;
  const st=Math.sin(phase)*moving*4;
  for(let side of [-1,1]){
   const hip=[side*6*large,0,23+bob],knee=[side*6*large,side*st,14+bob],ankle=[side*6*large,side*st*1.7,5+bob];
   segment(hip,knee,6.2*large,7,p.dark);prism(...knee,7*large,7,5,armor);
   segment(knee,ankle,5.5*large,6,p.dark);
   prism(ankle[0],ankle[1]+4,ankle[2]-1,8*large,11,5,p.dark);
  }
  prism(0,0,32+bob,19*large,13,19,armor);
  prism(0,8,33+bob,15*large,4,12,p.dark);
  for(let side of [-1,1]){
   prism(side*10*large,2,40+bob,8*large,10,8,armor);
   const a=[side*12*large,3,39+bob],b=[side*14*large,10,31+bob],hand=[side*7,18,30+bob];
   segment(a,b,7,7,armor);segment(b,hand,5,6,p.dark);prism(...hand,5,6,5,p.dark);
  }
  if(kind==='chaser'){
   prism(0,0,48+bob,17,15,16,p.red);
   prism(0,8,48+bob,11,3,8,p.dark);
   for(let side of [-1,1]){segment([side*7,18,30+bob],[side*11,26,26+bob],2,2,p.tan);}
  }else{
   prism(0,0,49+bob,16*large,14,13,kind==='ranged'?p.tan:p.metal);
   prism(0,8,49+bob,12*large,3,6,p.dark);
   prism(0,10,49+bob,8*large,2,2,kind==='sentinel'?p.violet:'#f2c17e');
   if(kind==='brute'){prism(0,-9,33+bob,18,8,18,p.dark);prism(0,10,33+bob,10,3,8,p.metal);}
   if(kind==='sentinel'){prism(0,11,33+bob,9,3,10,p.violet);prism(0,-8,34+bob,14,8,14,p.dark);}
   // The barrel points along local +Y (the target direction).
   prism(0,18,31+bob,7,20,5,p.dark);
   prism(0,30,31+bob,5,15,4,p.metal);
   prism(0,41,31+bob,2.5,13,2.5,p.dark);
   prism(0,18,37+bob,4,8,4,p.dark);
   prism(0,17,26+bob,5,6,8,p.metal);
  }
 }
 poly.sort((a,b)=>a.depth-b.depth);
 ctx.save();ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
 ctx.fillStyle='rgba(0,0,0,.35)';ctx.beginPath();ctx.ellipse(e.x,e.y+16,kind==='drone'?17:kind==='brute'?19:14,5,0,0,2*PI);ctx.fill();
 for(let f of poly){ctx.beginPath();ctx.moveTo(f.vs[0][0],f.vs[0][1]);for(let i=1;i<4;i++)ctx.lineTo(f.vs[i][0],f.vs[i][1]);ctx.closePath();ctx.fillStyle=shade(f.col,.8+(f.depth%7)*.013);ctx.fill();ctx.strokeStyle=shade(f.col,.5);ctx.lineWidth=.45;ctx.stroke();}
 if(e.wind>0){ctx.globalAlpha=.65;ctx.strokeStyle='#ffd4a6';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(e.x,e.y-10,kind==='brute'?21:15,-PI*.85,-PI*.15);ctx.stroke();}
 ctx.restore();
 return true;
 }catch(err){if(!window.__ashBestiaryError){console.warn('ASHFALL Bestiary 3D fallback',err);window.__ashBestiaryError=true;}return false;}
}
window.AshBestiary3D={draw,version:'1.0-procedural'};
})();
