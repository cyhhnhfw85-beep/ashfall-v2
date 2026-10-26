/* ASHFALL 25 — isolated generation proof of concept.
   No integration with legacy room/door/save game systems yet. */
'use strict';
const SHAPES=[
 {key:'1x2',w:1,h:2,weight:34},
 {key:'2x2',w:2,h:2,weight:32},
 {key:'2x3',w:2,h:3,weight:23},
 {key:'3x3',w:3,h:3,weight:11}
];
const rand=(max,rng)=>Math.floor(rng()*max);
function shape(rng){let k=rng()*100;for(const s of SHAPES){k-=s.weight;if(k<0)return s;}return SHAPES[0];}
const key=(x,y)=>`${x},${y}`;
function cells(room){let a=[];for(let y=room.y;y<room.y+room.h;y++)for(let x=room.x;x<room.x+room.w;x++)a.push([x,y]);return a;}
function boundary(a,b){
 const bSet=new Set(cells(b).map(([x,y])=>key(x,y)));
 let sides=[];
 for(const [x,y] of cells(a))for(const [side,dx,dy,back] of [['top',0,-1,'bottom'],['bottom',0,1,'top'],['left',-1,0,'right'],['right',1,0,'left']]){
  if(bSet.has(key(x+dx,y+dy)))sides.push({a:[x,y],b:[x+dx,y+dy],side,back});
 }
 return sides;
}
function mulberry32(seed){let a=seed|0;return()=>{a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t^=t+Math.imul(t^(t>>>7),61|t);return((t^(t>>>14))>>>0)/4294967296;};}
function generate(seed=1,count=25){
 const rng=mulberry32(seed),taken=new Set(),rooms=[],edges=[];
 function fits(c){if(Math.abs(c.x)>60||Math.abs(c.y)>60)return false;return cells(c).every(([x,y])=>!taken.has(key(x,y)));}
 function add(r){rooms.push(r);for(const [x,y] of cells(r))taken.add(key(x,y));}
 add({id:0,x:0,y:0,w:1,h:2,shape:'1x2',kind:'start',sector:0});
 for(let id=1;id<count;id++){
  const s=shape(rng);let found=false;
  // All placements share an actual cell edge with their intended parent.
  for(let tries=0;tries<4000&&!found;tries++){
   const parent=rooms[rand(rooms.length,rng)];
   const side=rand(4,rng);let x,y;
   if(side===0){x=parent.x-s.w+1+rand(parent.w+s.w-1,rng);y=parent.y-s.h;}
   else if(side===1){x=parent.x-s.w+1+rand(parent.w+s.w-1,rng);y=parent.y+parent.h;}
   else if(side===2){x=parent.x-s.w;y=parent.y-s.h+1+rand(parent.h+s.h-1,rng);}
   else{x=parent.x+parent.w;y=parent.y-s.h+1+rand(parent.h+s.h-1,rng);}
   const candidate={id,x,y,w:s.w,h:s.h,shape:s.key,kind:'standard',sector:0};
   if(!fits(candidate))continue;
   const doorOptions=boundary(parent,candidate);
   if(!doorOptions.length)continue;
   add(candidate);edges.push({from:parent.id,to:id,door:doorOptions[rand(doorOptions.length,rng)]});found=true;
  }
  if(!found)throw Error(`Unable to place room ${id}`);
 }
 // BFS depth and sector designation, boss deepest, exit at appropriate distances.
 const adjacency=rooms.map(()=>[]);
 for(const e of edges){adjacency[e.from].push(e.to);adjacency[e.to].push(e.from);}
 const distances=Array(count).fill(-1);distances[0]=0;let q=[0];
 for(let i=0;i<q.length;i++)for(const j of adjacency[q[i]])if(distances[j]===-1){distances[j]=distances[q[i]]+1;q.push(j);}
 const maxDepth=Math.max(...distances),bossId=distances.indexOf(maxDepth);
 for(const r of rooms){r.depth=distances[r.id];r.sector=Math.min(3,Math.floor(r.depth/(maxDepth+1)*4));}
 rooms[bossId].kind='boss';
 const candidates=rooms.filter(r=>r.id!==0&&r.id!==bossId).sort((a,b)=>b.depth-a.depth);
 const exits=candidates.slice(0,Math.min(2,candidates.length));for(const r of exits)r.kind='exit';
 return {version:'geometry25-prototype',seed,rooms,edges,bossId,exitIds:exits.map(r=>r.id)};
}
function validate(map){
 if(map.rooms.length!==25||map.edges.length!==24)throw Error('Incorrect graph size');
 const occupied=new Set();for(const room of map.rooms){
  if(room.w<1||room.h<2||room.w>3||room.h>3)throw Error('invalid room size');
  for(const [x,y] of cells(room)){const k=key(x,y);if(occupied.has(k))throw Error('collision '+k);occupied.add(k);}
 }
 const linked=new Set([0]);let changed=true;
 while(changed){changed=false;for(const e of map.edges){if(linked.has(e.from)&&!linked.has(e.to)){linked.add(e.to);changed=true;}if(linked.has(e.to)&&!linked.has(e.from)){linked.add(e.from);changed=true;}if(!boundary(map.rooms[e.from],map.rooms[e.to]).length)throw Error('non adjacent rooms');}}
 if(linked.size!==25||!linked.has(map.bossId))throw Error('not connected');
 return true;
}
window.AshGenerator25={generate,validate,cells,boundary};
