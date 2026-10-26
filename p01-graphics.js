/* ASHFALL — Periphery P03-B3 FULL TEST1
   Integrates the validated K-17 premium art kit across the whole Periphery sector,
   preserving 90° top-down rendering and room gameplay for 25-room generation. */
(function(root){'use strict';
 const files=[
  'floor_concrete','floor_metal','floor_cracked','floor_grate','floor_wear','floor_hazard','floor_hatch','floor_tread',
  'wall_horizontal','wall_horizontal_amber','wall_horizontal_pipes','wall_vertical','wall_corner','wall_joint','wall_reinforced',
  'door_open','door_locked','door_arena','door_frame',
  'prop_crate','prop_military','prop_container','prop_generator','prop_console','prop_machine','prop_barrels','prop_pipes','prop_supply',
  'light_amber','light_cyan','contact_shadow'
 ];
 const images=Object.create(null);let ready=false;let pending=files.length;
 files.forEach(name=>{const im=new Image();images[name]=im;
  im.onload=im.onerror=()=>{if(--pending===0){ready=true;root.dispatchEvent(new Event('ash-p03b3-assets-ready'));}};
  im.src='assets/p01v2/'+name+'.png?v=093p03b3';
 });
 const usable=name=>images[name]&&images[name].complete&&images[name].naturalWidth>0;
 const draw=(c,name,x,y,w,h)=>{if(!usable(name))return false;c.drawImage(images[name],x,y,w,h);return true;};
 const drawRot=(c,name,x,y,w,h)=>{if(!usable(name))return false;c.save();c.translate(x+w,y);c.rotate(Math.PI/2);c.drawImage(images[name],0,0,h,w);c.restore();return true;};
 const rect=(c,x,y,w,h,r=6)=>{c.beginPath();c.moveTo(x+r,y);c.lineTo(x+w-r,y);c.quadraticCurveTo(x+w,y,x+w,y+r);c.lineTo(x+w,y+h-r);c.quadraticCurveTo(x+w,y+h,x+w-r,y+h);c.lineTo(x+r,y+h);c.quadraticCurveTo(x,y+h,x,y+h-r);c.lineTo(x,y+r);c.quadraticCurveTo(x,y,x+r,y);};
 const baseFloors=['floor_metal','floor_concrete','floor_metal','floor_wear','floor_concrete','floor_metal'];
 const propChoices=['prop_crate','prop_military','prop_generator','prop_console','prop_container','prop_machine','prop_barrels','prop_pipes','prop_supply'];
 const kindAccent={start:'#79e2d2',exit:'#d8c57c',arena:'#de9f58',boss:'#d98787',outpost:'#8ec0d9',standard:'#b9c4c6'};
 const kindLabel={start:'ENTRÉE',exit:'EXTRACTION',arena:'COMBAT',boss:'MENACE',outpost:'RELAIS',standard:'PÉRIPHÉRIE'};
 const propScales={
  prop_crate:{sx:1.65,sy:1.62,minW:52,minH:43},
  prop_military:{sx:1.72,sy:1.70,minW:72,minH:49},
  prop_generator:{sx:1.70,sy:1.68,minW:46,minH:56},
  prop_console:{sx:1.72,sy:1.75,minW:42,minH:58},
  prop_container:{sx:1.40,sy:1.38,minW:92,minH:52},
  prop_machine:{sx:1.62,sy:1.58,minW:86,minH:51},
  prop_barrels:{sx:1.55,sy:1.55,minW:52,minH:58},
  prop_pipes:{sx:1.52,sy:1.42,minW:92,minH:42},
  prop_supply:{sx:1.60,sy:1.58,minW:76,minH:46}
 };
 const pickProp=(o,i)=>propChoices[Math.abs(((o[0]*13+o[1]*7+o[2]*3+o[3]*11+i*5)|0))%propChoices.length];
 function floorTile(c,name,x,y,w,h){
  if(!draw(c,name,x,y,w,h)){c.fillStyle='#394347';c.fillRect(x,y,w,h);}
  c.save();
  c.strokeStyle='rgba(7,16,20,.42)';c.lineWidth=1;c.strokeRect(x+.5,y+.5,w-1,h-1);
  c.strokeStyle='rgba(255,255,255,.05)';c.beginPath();c.moveTo(x+3,y+3);c.lineTo(x+w-4,y+3);c.moveTo(x+3,y+3);c.lineTo(x+3,y+h-4);c.stroke();
  c.restore();
 }
 function drawBackdrop(c,W,H,kind){
  c.fillStyle='#2a3438';c.fillRect(0,0,W,H);
  const tile=90;
  for(let y=0;y<H;y+=tile)for(let x=0;x<W;x+=tile){
   const ix=(x/tile)|0,iy=(y/tile)|0;
   let name=baseFloors[(ix*3+iy*5+((ix+iy)&1))%baseFloors.length];
   const majorPlate=Math.abs((x+tile/2)-W/2)<tile*0.75;
   const edgeBand=(x<tile||x>W-tile*2||y<tile||y>H-tile*2);
   if(majorPlate && (iy%3===1)) name=(iy%2===0?'floor_wear':'floor_metal');
   if(edgeBand && ((ix+iy)%3===0)) name='floor_concrete';
   if(((ix+iy*2)%11)===0) name='floor_tread';
   if(((ix*7+iy*9)%15)===0) name='floor_cracked';
   floorTile(c,name,x,y,Math.min(tile,W-x),Math.min(tile,H-y));
  }
  c.save();
  // Structural edge shading.
  c.fillStyle='rgba(7,14,17,.20)';
  c.fillRect(0,0,W,18);c.fillRect(0,H-18,W,18);c.fillRect(0,0,18,H);c.fillRect(W-18,0,18,H);
  // Subtle centerline for readability, much softer than before.
  c.strokeStyle='rgba(203,174,92,.18)';c.lineWidth=3;c.setLineDash([10,10]);
  c.beginPath();c.moveTo(W/2,28);c.lineTo(W/2,H-28);c.stroke();c.setLineDash([]);
  c.restore();
  // Per-cell accents: 1 hatch / grate / hazard mix max, calmer than older version.
  const cols=Math.max(1,Math.ceil(W/360)),rows=Math.max(1,Math.ceil(H/400));
  for(let cy=0;cy<rows;cy++)for(let cx=0;cx<cols;cx++){
   const ox=cx*360,oy=cy*400; const seed=cx*37+cy*53;
   const left=ox+28,right=Math.min(W-104,ox+228),top=oy+38,mid=oy+155,low=Math.min(H-96,oy+282);
   if((seed%2)===0) {c.globalAlpha=.22;draw(c,'floor_hatch',right,top,72,72);} else {c.globalAlpha=.18;draw(c,'floor_grate',right,top,72,72);} 
   if((seed%3)===0){c.globalAlpha=.18;draw(c,'floor_hazard',left,low,68,68);} 
   if((seed%5)!==0){c.globalAlpha=.16;draw(c,'floor_grate',left+12,mid,54,54);} 
   if((seed%4)===1){c.globalAlpha=.12;draw(c,'floor_cracked',right-10,low-6,78,78);} 
  }
  c.globalAlpha=1;
  // Ambient vignette and discreet room marks.
  c.save();
  const g=c.createRadialGradient(W/2,H/2,Math.min(W,H)*.24,W/2,H/2,Math.max(W,H)*.74);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.86,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(2,8,11,.18)');c.fillStyle=g;c.fillRect(0,0,W,H);
  c.fillStyle='rgba(227,236,238,.20)';c.font='bold 20px sans-serif';c.textAlign='right';c.fillText('K-17',W-42,H-58);
  c.font='bold 12px sans-serif';c.fillText(kindLabel[kind]||kindLabel.standard,W-42,H-41);
  c.globalAlpha=.18;c.strokeStyle=kindAccent[kind]||kindAccent.standard;c.lineWidth=2;c.strokeRect(26.5,26.5,W-53,H-53);
  c.restore();
 }
 function drawProp(c,name,x,y,w,h){
  const cfg=propScales[name]||{sx:1.5,sy:1.5,minW:w,minH:h};
  const dw=Math.max(cfg.minW,Math.round(w*cfg.sx));
  const dh=Math.max(cfg.minH,Math.round(h*cfg.sy));
  const dx=Math.round(x+(w-dw)/2),dy=Math.round(y+(h-dh)/2);
  c.save();
  if(usable('contact_shadow')) c.drawImage(images.contact_shadow, x-Math.round(w*.22), y+Math.round(h*.18), Math.round(w*1.48), Math.round(h*.98));
  else {c.fillStyle='rgba(0,0,0,.22)';c.beginPath();c.ellipse(x+w/2,y+h/2+4,Math.max(10,w*.72),Math.max(8,h*.52),0,0,Math.PI*2);c.fill();}
  draw(c,name,dx,dy,dw,dh);
  if(name==='prop_console'||name==='prop_generator'){
   const px=dx+dw*.28,py=dy+dh*.22;c.fillStyle='rgba(119,232,221,.76)';c.beginPath();c.arc(px,py,2.3,0,Math.PI*2);c.fill();
  }
  c.restore();
 }
 function wallVariant(horizontal,index,span){
  if(horizontal){
   if(index===0||span<56)return 'wall_horizontal';
   return index%4===1?'wall_horizontal_amber':index%4===3?'wall_horizontal_pipes':'wall_horizontal';
  }
  if(index===0)return 'wall_corner';
  return index%4===1?'wall_joint':index%4===3?'wall_reinforced':'wall_vertical';
 }
 function drawWallSegment(c,name,x,y,w,h,horizontal){
  if(horizontal){
   draw(c,name,x,y,w,h);
   if(name==='wall_horizontal_amber' && usable('light_amber')) c.drawImage(images.light_amber, x+Math.max(0,w*.25), y-2, Math.min(w*.48,44), h+4);
  } else {
   if(name==='wall_vertical') draw(c,name,x,y,w,h);
   else drawRot(c,name,x,y,w,h);
  }
 }
 function wallDetails(c,x,y,w,h,horizontal){
  c.save();c.strokeStyle='rgba(8,16,20,.78)';c.lineWidth=1;c.strokeRect(x+.5,y+.5,w-1,h-1);
  c.strokeStyle='rgba(255,255,255,.06)';c.lineWidth=1;
  if(horizontal){c.beginPath();c.moveTo(x+2,y+3);c.lineTo(x+w-2,y+3);c.stroke();}
  else{c.beginPath();c.moveTo(x+3,y+2);c.lineTo(x+3,y+h-2);c.stroke();}
  c.restore();
 }
 function drawDoor(c,name,x,y,w,h,color){
  c.save();
  c.fillStyle='rgba(5,12,14,.70)';c.fillRect(x-1,y-1,w+2,h+2);
  if(usable('door_frame')){
   if(w>=h) c.drawImage(images.door_frame,x+(w-18)/2,y-2,18,h+4); else drawRot(c,'door_frame',x-2,y+(h-18)/2,w+4,18);
  }
  if(w>=h) draw(c,name,x,y,w,h); else drawRot(c,name,x,y,w,h);
  c.restore();
  c.save();c.shadowColor=color;c.shadowBlur=10;c.strokeStyle=color;c.lineWidth=1.8;c.strokeRect(x+1.5,y+1.5,w-3,h-3);c.restore();
  if((name==='door_open'||name==='door_arena') && usable('light_cyan')){
   c.save(); c.globalAlpha=(name==='door_arena'?0.22:0.30);
   if(w>=h)c.drawImage(images.light_cyan,x+Math.max(0,w*.15),y-4,Math.min(58,w*.65),h+8);
   else c.drawImage(images.light_cyan,x-6,y+Math.max(0,h*.16),w+12,Math.min(58,h*.62));
   c.restore();
  }
 }
 const P={
  applies(room,sector){return !!room&&sector===0;},
  ready(){return ready;},
  floor(c,room,obstacles){
   if(Array.isArray(room)&&obstacles===undefined){obstacles=room;room={kind:'standard'};}
   obstacles=Array.isArray(obstacles)?obstacles:[]; room=room&&typeof room==='object'?room:{kind:'standard'};
   const W=c.canvas.width,H=c.canvas.height;
   c.save(); drawBackdrop(c,W,H,room.kind||'standard'); obstacles.forEach((o,i)=>drawProp(c,pickProp(o,i),o[0],o[1],o[2],o[3])); c.restore();
  },
  walls(c,room,walls,doorInfo){
   if(Array.isArray(room) && Array.isArray(walls) && doorInfo===undefined){doorInfo=walls;walls=room;room={kind:'standard'};}
   room=room&&typeof room==='object'?room:{kind:'standard'};walls=Array.isArray(walls)?walls:[];doorInfo=Array.isArray(doorInfo)?doorInfo:[];
   c.save();
   walls.forEach(([x,y,w,h])=>{
    const horizontal=w>=h; c.save(); c.beginPath(); c.rect(x,y,w,h); c.clip(); c.fillStyle='#213037'; c.fillRect(x,y,w,h);
    if(horizontal){
      let i=0; for(let xx=x; xx<x+w; xx+=58){ const span=Math.min(58,x+w-xx); const n=wallVariant(true,i,span); drawWallSegment(c,n,xx,y,span,h,true); i++; }
    }else{
      let i=0; for(let yy=y; yy<y+h; yy+=62){ const span=Math.min(62,y+h-yy); const n=wallVariant(false,i,span); if(n==='wall_vertical') draw(c,n,x,yy,w,span); else drawRot(c,n,x,yy,w,span); i++; }
    }
    c.restore(); wallDetails(c,x,y,w,h,horizontal);
   });
   doorInfo.forEach(({x,y,w,h,locked,arena})=>{ const name=locked?'door_locked':arena?'door_arena':'door_open'; const baseColor=locked?'#e16c63':arena?'#edb364':'#58ddc5'; drawDoor(c,name,x,y,w,h,baseColor); });
   c.restore();
  }
 };
 root.AshP01Graphics=Object.freeze(P);
})(window);
