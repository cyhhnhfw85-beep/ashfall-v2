(()=>{'use strict';
// LAB ONLY — optical continuity, never writes gameplay coordinates.
const holder=document.createElement('div');holder.id='v32-lab-diagnostics';
holder.style.cssText='position:fixed;z-index:20000;top:calc(env(safe-area-inset-top) + 8px);right:8px;max-width:230px;width:39vw;min-width:145px;padding:6px;background:#081624ed;color:#d6edf6;border:1px solid #41748d;border-radius:9px;font:11px system-ui;box-shadow:0 4px 16px #0008;pointer-events:none';
const head=document.createElement('div');head.textContent='V32 LAB · CARTE PHYSIQUE';head.style.cssText='font-weight:bold;color:#73e0d5;letter-spacing:.3px;margin-bottom:4px';
const canvas=document.createElement('canvas');canvas.width=340;canvas.height=240;canvas.style.cssText='width:100%;height:auto;display:block';
const footer=document.createElement('div');footer.textContent='Copie expérimentale · sauvegardes séparées';footer.style.cssText='font-size:9px;color:#9bb8c8;margin-top:4px';
holder.append(head,canvas,footer);document.body.append(holder);
const ctx=canvas.getContext('2d');let last=0, roomPrevious=null, rawPrevious=null, smooth=null, animation=null, transitions=0, lastJump=0, largestJump=0;
function markerAt(t,p){if(!animation)return p;const progress=Math.max(0,Math.min(1,(t-animation.t0)/180));const eased=progress*progress*(3-2*progress);if(progress>=1){animation=null;return p;}return {x:animation.x0+(p.x-animation.x0)*eased,y:animation.y0+(p.y-animation.y0)*eased};}
function draw(t){requestAnimationFrame(draw);if(t-last<33)return;last=t;
const state=window.ashV32LabRead?.();ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#0a1d2b';ctx.fillRect(0,0,340,240);
if(!state?.rooms?.length||!state.player){ctx.fillStyle='#94aab9';ctx.fillText('Lancer une expédition V32',12,28);roomPrevious=null;rawPrevious=null;smooth=null;animation=null;return;}
const raw=state.player;
if(roomPrevious!==null&&roomPrevious!==state.current&&rawPrevious){transitions++;lastJump=Math.round(Math.hypot(raw.x-rawPrevious.x,raw.y-rawPrevious.y));largestJump=Math.max(largestJump,lastJump);animation={x0:smooth?.x??rawPrevious.x,y0:smooth?.y??rawPrevious.y,t0:t};}
if(roomPrevious===null){smooth={x:raw.x,y:raw.y};}
else if(roomPrevious===state.current&&!animation){smooth={x:raw.x,y:raw.y};}
else smooth=markerAt(t,raw);
roomPrevious=state.current;rawPrevious={x:raw.x,y:raw.y};
const all=state.rooms,b=all.reduce((a,r)=>({x0:Math.min(a.x0,r.pixelBounds.x),y0:Math.min(a.y0,r.pixelBounds.y),x1:Math.max(a.x1,r.pixelBounds.x+r.pixelBounds.w),y1:Math.max(a.y1,r.pixelBounds.y+r.pixelBounds.h)}),{x0:Infinity,y0:Infinity,x1:-Infinity,y1:-Infinity});
const scale=Math.min(320/(b.x1-b.x0),220/(b.y1-b.y0));const ox=170-(b.x0+b.x1)/2*scale,oy=120-(b.y0+b.y1)/2*scale;const visited=new Set(state.visited);
const kinds={start:'#46d6f2',standard:'#68889d',arena:'#d49854',boss:'#db606b',exit:'#69c9a0',outpost:'#a58ada',secret:'#d7c26b'};
for(const r of all){if(!visited.has(r.id))continue;const q=r.pixelBounds;ctx.fillStyle=kinds[r.kind]||'#788da0';ctx.globalAlpha=r.id===state.current?0.85:0.42;ctx.fillRect(q.x*scale+ox,q.y*scale+oy,Math.max(1,q.w*scale),Math.max(1,q.h*scale));ctx.globalAlpha=1;ctx.strokeStyle='#c4dbea';ctx.lineWidth=.6;ctx.strokeRect(q.x*scale+ox,q.y*scale+oy,q.w*scale,q.h*scale);}
// White dot = interpolated display, cyan ring = authoritative gameplay position.
ctx.strokeStyle='#52e9ff';ctx.lineWidth=1;ctx.beginPath();ctx.arc(raw.x*scale+ox,raw.y*scale+oy,4.5,0,Math.PI*2);ctx.stroke();
ctx.fillStyle='#ffffff';ctx.beginPath();ctx.arc(smooth.x*scale+ox,smooth.y*scale+oy,3,0,Math.PI*2);ctx.fill();
footer.textContent='Salle '+state.current+' · '+visited.size+'/50 · passages '+transitions+' · saut dernier/max '+lastJump+'/'+largestJump+' u';
}
requestAnimationFrame(draw);
})();
