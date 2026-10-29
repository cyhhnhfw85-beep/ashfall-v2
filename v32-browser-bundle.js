(function(){
const modules={},cache={};
modules["./geometry-v32"]=function(require,module,exports){
'use strict';
// Standalone feasibility laboratory; NEVER imported into ASHFALL production.
const DIM={ '1x2':[1,2], '2x2':[2,2], '2x3':[2,3], '3x3':[3,3] };
function rng(seed){let x=(seed>>>0)||0x6d2b79f5;return ()=>{x^=x<<13;x^=x>>>17;x^=x<<5;return(x>>>0)/4294967296;};}
function int(r,a,b){return a+Math.floor(r()*(b-a+1));}
function shuffled(r,a){const result=a.slice();for(let i=result.length-1;i>0;i--){const j=int(r,0,i);[result[i],result[j]]=[result[j],result[i]];}return result;}
function quotas(r){const arena=int(r,3,7),exit=int(r,2,5),outpost=int(r,3,7),secret=int(r,4,9);return {start:1,standard:48-arena-exit-outpost-secret,arena,boss:1,exit,outpost,secret};}
function contact(a,b){
 const left=Math.max(a.x,b.x),right=Math.min(a.x+a.w,b.x+b.w);
 const top=Math.max(a.y,b.y),bottom=Math.min(a.y+a.h,b.y+b.h);
 if(a.x+a.w===b.x&&bottom>top)return {sideA:'right',sideB:'left',lo:top,hi:bottom,axis:'y',border:a.x+a.w};
 if(b.x+b.w===a.x&&bottom>top)return {sideA:'left',sideB:'right',lo:top,hi:bottom,axis:'y',border:a.x};
 if(a.y+a.h===b.y&&right>left)return {sideA:'bottom',sideB:'top',lo:left,hi:right,axis:'x',border:a.y+a.h};
 if(b.y+b.h===a.y&&right>left)return {sideA:'top',sideB:'bottom',lo:left,hi:right,axis:'x',border:a.y};
 return null;
}
function overlap(a,b){return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;}
function shapesFor(kind,r){if(kind==='boss')return ['3x3'];if(kind==='arena')return ['2x3'];return r()<.65?['1x2','2x2']:['2x2','1x2'];}
function build(seed,opts={}){
 const r=rng(seed),q=quotas(r),kinds=['start','boss'];for(const kind of ['arena','exit','outpost','secret','standard'])for(let i=0;i<q[kind];i++)kinds.push(kind);
 if(kinds.length!==50)throw Error('quota '+kinds.length);
 // Randomize roles freely; keep player start ID=0. No depth constraints on boss or exits.
 const rest=shuffled(r,kinds.slice(1));
 const order=['start',...rest],rooms=[{id:0,kind:'start',shape:'1x2',x:0,y:0,w:1,h:2}];
 const chosen=[];let attempts=0;
 for(let i=1;i<order.length;i++){
  const kind=order[i];let placed=null;
  const shapes=shapesFor(kind,r);
  for(let tries=0;tries<20000&&!placed;tries++){
   attempts++;const parent=rooms[int(r,0,rooms.length-1)];const shape=shapes[tries%shapes.length], [w,h]=DIM[shape];
   const side=int(r,0,3),horizontal=side<2;
   const x=side===0?parent.x+parent.w:side===1?parent.x-w:parent.x+int(r,-w+1,parent.w-1);
   const y=side===2?parent.y+parent.h:side===3?parent.y-h:parent.y+int(r,-h+1,parent.h-1);
   const rect={id:i,kind,shape,x,y,w,h};
   if(Math.abs(x)>90||Math.abs(y)>90||rooms.some(old=>overlap(rect,old)))continue;
   const touch=contact(parent,rect);if(!touch)continue;
   placed=rect;chosen.push([parent.id,i]);
  }
  if(!placed)throw Error('placement failed at room '+i+' seed '+seed);
  rooms.push(placed);
 }
 // Shared portal has a single global location, with corresponding local offsets in each room.
 const pair=new Set(chosen.map(e=>e.slice().sort((a,b)=>a-b).join(':')));
 for(let i=0;i<rooms.length;i++)for(let j=i+1;j<rooms.length;j++){
  const key=i+':'+j;if(pair.has(key)||!contact(rooms[i],rooms[j]))continue;
  if(r()<.16){chosen.push([i,j]);pair.add(key);}
 }
 const portals=[];
 for(const [aId,bId] of chosen){const a=rooms[aId],b=rooms[bId],c=contact(a,b);if(!c)throw Error('internal non-adjacent edge');
  // Aperture center is fixed in the middle of an actual shared cell edge.
  const cell=int(r,Math.ceil(c.lo),Math.floor(c.hi)-1);
  const globalX=c.axis==='y'?c.border:cell+.5, globalY=c.axis==='x'?c.border:cell+.5;
  const half=0.08;portals.push({id:portals.length,a:aId,b:bId,sideA:c.sideA,sideB:c.sideB,x:globalX,y:globalY,aLocal:{x:globalX-a.x,y:globalY-a.y},bLocal:{x:globalX-b.x,y:globalY-b.y},half});
 }
 // One or more portals may share a wall; each portal has a unique stable ID.
 return {geometryVersion:32,seed,quotas:q,rooms,portals,stats:{attempts}};
}
function validate(world){const errors=[],rooms=world.rooms,portals=world.portals;
 const fail=s=>errors.push(s);
 if(rooms.length!==50)fail('room count');if(rooms[0]?.kind!=='start')fail('start');
 for(const [kind,count] of Object.entries(world.quotas))if(rooms.filter(r=>r.kind===kind).length!==count)fail('quota '+kind);
 for(let i=0;i<rooms.length;i++){
  const a=rooms[i],expected=DIM[a.shape];if(!expected||a.w!==expected[0]||a.h!==expected[1])fail('shape '+i);
  for(let j=i+1;j<rooms.length;j++)if(overlap(a,rooms[j]))fail('overlap '+i+' '+j);
 }
 const graph=rooms.map(()=>[]);
 for(const p of portals){const a=rooms[p.a],b=rooms[p.b],c=contact(a,b);
  if(!c){fail('door lacks shared wall '+p.id);continue;}
  if(p.sideA!==c.sideA||p.sideB!==c.sideB)fail('side mismatch');
  if(c.axis==='x'?(p.y!==c.border||p.x<=c.lo||p.x>=c.hi):(p.x!==c.border||p.y<=c.lo||p.y>=c.hi))fail('door outside boundary');
  if(Math.abs(p.aLocal.x-(p.x-a.x))>1e-9||Math.abs(p.bLocal.y-(p.y-b.y))>1e-9)fail('door local mismatch');
  graph[p.a].push(p.b);graph[p.b].push(p.a);
 }
 const seen=new Set([0]),queue=[0];while(queue.length){const u=queue.shift();for(const v of graph[u])if(!seen.has(v)){seen.add(v);queue.push(v);}}
 if(seen.size!==50)fail('disconnected rooms '+seen.size);
 // Ensure no overlapping portals on the same boundary; half widths in cell units.
 for(let i=0;i<portals.length;i++)for(let j=i+1;j<portals.length;j++){
  const a=portals[i],b=portals[j];
  if(a.x===b.x&&a.y===b.y)fail('duplicate door centers '+i+' '+j);
 }
 return errors;
}
module.exports={build,validate,contact,overlap,quotas};

};
modules["./adapter-v32"]=function(require,module,exports){
'use strict';
// Offline experimental V32 adapter. No imports into production game.js.
const geometry=require('./geometry-v32');
const CELL_W=360,CELL_H=400,WALL=20,INSET=47,PLAYER_RADIUS=13;
const SIDE_OPPOSITE={left:'right',right:'left',top:'bottom',bottom:'top'};
function roomPixels(room){return {x:room.x*CELL_W,y:room.y*CELL_H,w:room.w*CELL_W,h:room.h*CELL_H};}
function compile(world){
 const errors=geometry.validate(world);if(errors.length)throw Error('Bad geometry: '+errors.slice(0,5).join('; '));
 const rooms=world.rooms.map(r=>({...r,pixelBounds:roomPixels(r)}));
 const doorsByRoom=rooms.map(()=>[]);
 const portals=world.portals.map(p=>{
  const global={x:p.x*CELL_W,y:p.y*CELL_H};
  const a=rooms[p.a],b=rooms[p.b];
  const aperture=(p.sideA==='left'||p.sideA==='right')?38:35;
  const make=(r,to,side)=>({portalId:p.id,to,side,x:global.x-r.pixelBounds.x,y:global.y-r.pixelBounds.y,half:aperture});
  const da=make(a,p.b,p.sideA),db=make(b,p.a,p.sideB);
  doorsByRoom[p.a].push(da);doorsByRoom[p.b].push(db);
  return {...p,global,halfPixels:aperture};
 });
 return {geometryVersion:32,seed:world.seed,quotas:world.quotas,rooms,portals,doorsByRoom};
}
function walls(map,id){
 const r=map.rooms[id],out=[],bounds=r.pixelBounds,doors=map.doorsByRoom[id];
 // Each boundary tile gets its own segment; subtract ALL door intervals, not only first match.
 const tiles=new Set();for(let x=0;x<r.w;x++)for(let y=0;y<r.h;y++)tiles.add(`${x},${y}`);
 for(let x=0;x<r.w;x++)for(let y=0;y<r.h;y++){
  for(const [side,dx,dy] of [['top',0,-1],['bottom',0,1],['left',-1,0],['right',1,0]]){
   if(tiles.has(`${x+dx},${y+dy}`))continue;
   const vertical=side==='left'||side==='right';
   const start=vertical?y*CELL_H:x*CELL_W;
   const length=vertical?CELL_H:CELL_W;
   const fixed=side==='left'?x*CELL_W:side==='right'?(x+1)*CELL_W:side==='top'?y*CELL_H:(y+1)*CELL_H;
   const intervals=doors.filter(d=>d.side===side&&Math.abs((vertical?d.x:d.y)-fixed)<.001)
    .map(d=>[(vertical?d.y:d.x)-d.half,(vertical?d.y:d.x)+d.half])
    .filter(([a,b])=>b>start&&a<start+length)
    .map(([a,b])=>[Math.max(start,a),Math.min(start+length,b)])
    .sort((a,b)=>a[0]-b[0]);
   let cursor=start;
   const add=(s,e)=>{if(e<=s+1e-8)return;const rect=vertical?[side==='left'?fixed:fixed-WALL,s,WALL,e-s]:[s,side==='top'?fixed:fixed-WALL,e-s,WALL];out.push(rect)};
   for(const [a,b] of intervals){if(a>cursor)add(cursor,a);cursor=Math.max(cursor,b)}
   if(cursor<start+length)add(cursor,start+length);
  }
 }
 return out;
}
function entryPoint(map,id,portalId){
 const door=map.doorsByRoom[id].find(d=>d.portalId===portalId);
 if(!door)throw Error(`Unknown portal ${portalId} for room ${id}`);
 const x=door.x+(door.side==='left'?INSET:door.side==='right'?-INSET:0);
 const y=door.y+(door.side==='top'?INSET:door.side==='bottom'?-INSET:0);
 return {x,y};
}
function worldPosition(map,id,local){const b=map.rooms[id].pixelBounds;return {x:b.x+local.x,y:b.y+local.y};}
function transition(map,fromId,portalId){
 const d=map.doorsByRoom[fromId].find(d=>d.portalId===portalId);
 if(!d)throw Error('Unknown outgoing portal');
 const incoming=map.doorsByRoom[d.to].find(z=>z.portalId===portalId&&z.to===fromId);
 if(!incoming||SIDE_OPPOSITE[d.side]!==incoming.side)throw Error('Invalid reciprocal portal');
 return {roomId:d.to,local:entryPoint(map,d.to,portalId),portalId};
}
function rectangleTouchesCircle(rect,p,r=PLAYER_RADIUS){const [x,y,w,h]=rect;const xx=Math.max(x,Math.min(p.x,x+w)),yy=Math.max(y,Math.min(p.y,y+h));return (p.x-xx)**2+(p.y-yy)**2<r*r;}
function validateAdapter(map){
 const errors=[];const fail=x=>errors.push(x);
 if(map.rooms.length!==50)fail('50 rooms');
 for(const r of map.rooms){
  const list=map.doorsByRoom[r.id];const wall=walls(map,r.id);
  for(const d of list){
   const p=entryPoint(map,r.id,d.portalId);
   if(p.x<PLAYER_RADIUS||p.y<PLAYER_RADIUS||p.x>r.pixelBounds.w-PLAYER_RADIUS||p.y>r.pixelBounds.h-PLAYER_RADIUS)fail('entry out of room '+r.id);
   if(wall.some(w=>rectangleTouchesCircle(w,p)))fail('entry intersects wall '+r.id+' portal '+d.portalId);
   const mid={x:d.x+(d.side==='left'?10:d.side==='right'?-10:0),y:d.y+(d.side==='top'?10:d.side==='bottom'?-10:0)};
   if(wall.some(w=>rectangleTouchesCircle(w,mid)))fail('door blocked '+r.id+' portal '+d.portalId);
   const tr=transition(map,r.id,d.portalId),target=map.doorsByRoom[tr.roomId].find(z=>z.portalId===d.portalId);
   if(!target||target.to!==r.id)fail('portal reciprocity');
   const outbound=worldPosition(map,r.id,{x:d.x,y:d.y}),inbound=worldPosition(map,tr.roomId,{x:target.x,y:target.y});
   if(Math.abs(outbound.x-inbound.x)>1e-8||Math.abs(outbound.y-inbound.y)>1e-8)fail('portal global mismatch');
  }
  // No partially overlapping portals on the same wall, and door opening wide enough for player diameter.
  for(let i=0;i<list.length;i++)for(let j=i+1;j<list.length;j++){
   const a=list[i],b=list[j];if(a.side===b.side){const sameLine=(a.side==='left'||a.side==='right')?a.x===b.x:a.y===b.y;
    if(sameLine&&Math.abs((a.side==='left'||a.side==='right'?a.y:a.x)-(b.side==='left'||b.side==='right'?b.y:b.x))<a.half+b.half+PLAYER_RADIUS*2)fail('overlapping doorway clearances '+r.id);
   }
  }
 }
 return errors;
}
function build(seed){return compile(geometry.build(seed));}
module.exports={build,compile,walls,entryPoint,worldPosition,transition,validateAdapter,CELL_W,CELL_H,WALL,INSET,PLAYER_RADIUS};

};
modules["./playtest-core"]=function(require,module,exports){
'use strict';
// Isolated, deterministic movement prototype. NOT linked to the ASHFALL runtime.
const adapter=require('./adapter-v32');
const R=adapter.PLAYER_RADIUS;
function inside(b,p){return p.x>=0&&p.y>=0&&p.x<=b.w&&p.y<=b.h;}
const cache=new WeakMap();
function touches(rect,p,r=R){const [x,y,w,h]=rect,xx=Math.max(x,Math.min(p.x,x+w)),yy=Math.max(y,Math.min(p.y,y+h));return (p.x-xx)**2+(p.y-yy)**2<r*r;}
function blocked(map,roomId,local){let walls=cache.get(map);if(!walls){walls=map.rooms.map(r=>adapter.walls(map,r.id));cache.set(map,walls);}return walls[roomId].some(w=>touches(w,local));}
// One atomic step in GLOBAL physical coordinates; no 47px teleport at door changes.
function advance(map,state,dx,dy){
 const room=map.rooms[state.roomId], b=room.pixelBounds;
 const next={x:state.x+dx,y:state.y+dy};
 const local={x:next.x-b.x,y:next.y-b.y};
 if(inside(b,local)){
  if(blocked(map,state.roomId,local))return state;
  return {...state,x:next.x,y:next.y};
 }
 // Cross exactly one room border during this short step.
 const doors=map.doorsByRoom[state.roomId];
 for(const d of doors){
  const crossing = d.side==='left'&&local.x<0 || d.side==='right'&&local.x>b.w || d.side==='top'&&local.y<0 || d.side==='bottom'&&local.y>b.h;
  if(!crossing)continue;
  const along=(d.side==='left'||d.side==='right')?local.y:local.x;
  const anchor=(d.side==='left'||d.side==='right')?d.y:d.x;
  if(Math.abs(along-anchor)>d.half-R)continue;
  const target=map.rooms[d.to],targetLocal={x:next.x-target.pixelBounds.x,y:next.y-target.pixelBounds.y};
  if(!inside(target.pixelBounds,targetLocal)||blocked(map,d.to,targetLocal))continue;
  return {...state,roomId:d.to,x:next.x,y:next.y,transitions:(state.transitions||0)+1};
 }
 return state;
}
function move(map,state,dx,dy){
 let s=state;const steps=Math.max(1,Math.ceil(Math.hypot(dx,dy)/5));
 for(let i=0;i<steps;i++)s=advance(map,s,dx/steps,dy/steps);
 return s;
}
function spawn(map){const r=map.rooms[0],b=r.pixelBounds;return {roomId:0,x:b.x+b.w/2,y:b.y+b.h/2,transitions:0};}
module.exports={advance,move,spawn,blocked};

};
function require(id){const key=id.endsWith(".js")?id.slice(0,-3):id;if(!cache[key]){let m={exports:{}};cache[key]=m;modules[key](require,m,m.exports);}return cache[key].exports;}
window.V32={geometry:require("./geometry-v32"),adapter:require("./adapter-v32"),core:require("./playtest-core")};
})();