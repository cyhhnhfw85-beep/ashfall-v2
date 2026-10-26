/* ASHFALL — Periphery GFX TEST 1
   Generalises the validated P01 visual language to the whole K-17 Periphery sector,
   in strict 90° top-down view, including 1x2 to 3x3 rooms. */
(function(root){'use strict';
 const files=['floor_concrete','floor_metal','floor_cracked','floor_grate','floor_wear','floor_hazard','wall_horizontal','door_open','door_locked','door_arena','prop_crate','prop_military','prop_container','prop_generator','prop_console','prop_machine','p02_panel_0','p02_panel_1','p02_panel_2','p02_panel_3','p02_panel_4','p02_panel_5','p02_wall_section'];
 const images=Object.create(null);let ready=false;
 let pending=files.length;
 files.forEach(name=>{const im=new Image();images[name]=im;
  im.onload=im.onerror=()=>{if(--pending===0){ready=true;root.dispatchEvent(new Event('ash-p01-assets-ready'));}};
  im.src=(name.startsWith('p02_')?'assets/p02/'+name.slice(4):'assets/p01v2/'+name)+'.png?v=093p02test1';
 });
 const usable=name=>images[name]&&images[name].complete&&images[name].naturalWidth>0;
 const draw=(c,name,x,y,w,h)=>{if(!usable(name))return false;c.drawImage(images[name],x,y,w,h);return true;};
 const rect=(c,x,y,w,h,r=4)=>{c.beginPath();c.moveTo(x+r,y);c.lineTo(x+w-r,y);c.quadraticCurveTo(x+w,y,x+w,y+r);c.lineTo(x+w,y+h-r);c.quadraticCurveTo(x+w,y+h,x+w-r,y+h);c.lineTo(x+r,y+h);c.quadraticCurveTo(x,y+h,x,y+h-r);c.lineTo(x,y+r);c.quadraticCurveTo(x,y,x+r,y);};
 const floorChoices=['floor_concrete','floor_metal','floor_concrete','floor_cracked','floor_metal','floor_wear'];
 const propChoices=['prop_crate','prop_military','prop_generator','prop_console','prop_container','prop_machine','p02_panel_0','p02_panel_1','p02_panel_2','p02_panel_3','p02_panel_4','p02_panel_5','p02_wall_section'];
 const kindAccent={start:'#79e2d2',exit:'#d8c57c',arena:'#de9f58',boss:'#d98787',outpost:'#8ec0d9',standard:'#b9c4c6'};
 const kindLabel={start:'ENTRÉE',exit:'EXTRACTION',arena:'COMBAT',boss:'MENACE',outpost:'RELAIS',standard:'PÉRIPHÉRIE'};
 const propScales={
  prop_crate:{sx:1.82,sy:1.93,minW:62,minH:39},
  prop_military:{sx:1.88,sy:1.88,minW:69,minH:47},
  prop_generator:{sx:1.83,sy:1.78,minW:39,minH:49},
  prop_console:{sx:1.88,sy:1.98,minW:39,minH:53},
  prop_container:{sx:1.52,sy:1.49,minW:99,minH:47},
  prop_machine:{sx:1.6,sy:1.6,minW:90,minH:52}
 };
 const pickProp=(o,i)=>propChoices[Math.abs(((o[0]*13+o[1]*7+o[2]*3+o[3]*11+i*5)|0))%propChoices.length];
 function floorTile(c,name,x,y,w,h){
  if(!draw(c,name,x,y,w,h)){c.fillStyle='#353d40';c.fillRect(x,y,w,h);}
  c.save();
  c.strokeStyle='rgba(8,18,22,.30)';c.lineWidth=1;c.strokeRect(x+.5,y+.5,w-1,h-1);
  c.strokeStyle='rgba(255,255,255,.05)';c.beginPath();c.moveTo(x+2,y+2);c.lineTo(x+w-3,y+2);c.moveTo(x+2,y+2);c.lineTo(x+2,y+h-3);c.stroke();
  c.restore();
 }
 function drawBackdrop(c,W,H,kind){
  c.fillStyle='#2d3539';c.fillRect(0,0,W,H);
  const tile=60;
  for(let y=0;y<H;y+=tile)for(let x=0;x<W;x+=tile){
   const ix=(x/tile)|0,iy=(y/tile)|0;
   let name=floorChoices[(ix*7+iy*11+((ix*iy)%3))%floorChoices.length];
   const centerBand=Math.abs((x+tile/2)-W/2)<Math.min(90,W*.18);
   const coreBand=Math.abs((y+tile/2)-H/2)<Math.min(80,H*.12);
   if(centerBand)name=(ix+iy)%2===0?'floor_concrete':'floor_metal';
   if(coreBand&&W>=600)name=(ix+iy)%2===0?'floor_wear':'floor_concrete';
   floorTile(c,name,x,y,tile,tile);
  }
  c.fillStyle='rgba(14,24,28,.28)';
  c.fillRect(0,0,W,24);c.fillRect(0,H-24,W,24);c.fillRect(0,0,24,H);c.fillRect(W-24,0,24,H);
  // Longitudinal guidance line for portrait play readability.
  c.save();
  c.strokeStyle='rgba(208,188,118,.35)';c.lineWidth=4;c.setLineDash([12,10]);
  c.beginPath();c.moveTo(W/2,Math.max(64,24));c.lineTo(W/2,H-Math.max(64,24));c.stroke();
  if(W>=600){
   c.beginPath();c.moveTo(W*0.25,H/2);c.lineTo(W*0.75,H/2);c.stroke();
  }
  c.setLineDash([]);
  c.restore();
  // Repeated industrial ambience per 360x400 cell area.
  const cols=Math.max(1,Math.round(W/360)),rows=Math.max(1,Math.round(H/400));
  c.save();
  for(let cy=0;cy<rows;cy++)for(let cx=0;cx<cols;cx++){
   const ox=cx*360,oy=cy*400;
   c.globalAlpha=.22;draw(c,'floor_hazard',ox+Math.min(143,W-74),oy+19,74,18);
   c.globalAlpha=.25;draw(c,'floor_hazard',ox+25,oy+155,18,75);draw(c,'floor_hazard',Math.min(W-43,ox+317),oy+155,18,75);
   c.globalAlpha=.22;draw(c,'floor_grate',ox+147,oy+159,66,66);
   draw(c,'floor_grate',ox+78,oy+289,20,20);draw(c,'floor_grate',ox+262,oy+52,18,18);
  }
  c.restore();
  c.save();
  const stains=[[.24,.31,18,10,.11],[.68,.72,22,11,.10],[.57,.26,16,8,.08],[.38,.64,26,12,.08],[.79,.44,20,9,.08]];
  stains.forEach(([rx,ry,ew,eh,a])=>{c.fillStyle=`rgba(28,20,15,${a})`;c.beginPath();c.ellipse(W*rx,H*ry,ew,eh,0,0,Math.PI*2);c.fill();});
  c.strokeStyle='rgba(12,21,24,.32)';c.lineWidth=2;
  [[.18,.22,.24,.19],[.66,.26,.71,.29],[.63,.78,.68,.81],[.31,.57,.27,.61],[.81,.57,.84,.60]].forEach(([x1,y1,x2,y2])=>{c.beginPath();c.moveTo(W*x1,H*y1);c.lineTo(W*x2,H*y2);c.stroke();});
  const accent=kindAccent[kind]||kindAccent.standard;
  c.fillStyle='rgba(230,239,241,.22)';c.font='bold 20px sans-serif';c.textAlign='center';c.fillText('K-17',W-72,H-64);
  c.font='bold 12px sans-serif';c.fillText(kindLabel[kind]||kindLabel.standard,W-72,H-48);
  c.globalAlpha=.26;c.strokeStyle='#d7e3e2';c.lineWidth=5;
  c.beginPath();c.moveTo(70,H-68);c.lineTo(96,H-68);c.moveTo(90,H-76);c.lineTo(98,H-68);c.lineTo(90,H-60);c.stroke();
  c.globalAlpha=.32;c.strokeStyle=accent;c.lineWidth=2;
  c.strokeRect(34,34,Math.max(0,W-68),Math.max(0,H-68));
  c.globalAlpha=.18;c.fillStyle=accent;c.fillRect(40,40,96,18);
  c.globalAlpha=.35;c.strokeStyle='#0d1418';c.lineWidth=3;c.beginPath();
  c.moveTo(55,H-86);c.bezierCurveTo(64,H-82,65,H-70,56,H-64);
  c.moveTo(W-58,90);c.bezierCurveTo(W-65,100,W-66,109,W-59,118);
  c.stroke();
  const g=c.createRadialGradient(W/2,H/2,Math.min(W,H)*.22,W/2,H/2,Math.max(W,H)*.7);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.75,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(3,10,13,.16)');c.fillStyle=g;c.fillRect(0,0,W,H);
  c.restore();
 }
 function drawProp(c,name,x,y,w,h){
  const cfg=propScales[name]||{sx:1.5,sy:1.5,minW:w,minH:h};
  const dw=Math.max(cfg.minW,Math.round(w*cfg.sx));
  const dh=Math.max(cfg.minH,Math.round(h*cfg.sy));
  const dx=Math.round(x+(w-dw)/2),dy=Math.round(y+(h-dh)/2);
  c.save();
  c.fillStyle='rgba(6,14,18,.18)';rect(c,x-2,y-2,w+4,h+4,4);c.fill();
  c.fillStyle='rgba(8,18,22,.38)';c.beginPath();c.ellipse(x+w/2,y+h/2+3,Math.max(9,w*.7),Math.max(7,h*.5),0,0,Math.PI*2);c.fill();
  draw(c,name,dx,dy,dw,dh);
  if(name==='prop_console'||name==='prop_generator'){
   const px=dx+dw*.24,py=dy+dh*.2;
   c.fillStyle='rgba(17,32,34,.85)';c.beginPath();c.arc(px,py,3.5,0,Math.PI*2);c.fill();
   c.fillStyle='rgba(117,232,221,.78)';c.beginPath();c.arc(px,py,1.8,0,Math.PI*2);c.fill();
  }else if(name==='prop_military'||name==='prop_crate'){
   c.fillStyle='rgba(207,176,105,.35)';c.fillRect(dx+dw*.22,dy+dh*.18,Math.max(4,dw*.14),2);
  }
  c.restore();
 }
 function wallDetails(c,x,y,w,h,horizontal){
  c.save();c.strokeStyle='rgba(9,17,21,.44)';c.lineWidth=1;
  if(horizontal){
   for(let xx=x+22;xx<x+w-10;xx+=54){c.beginPath();c.moveTo(xx,y+4);c.lineTo(xx,y+h-4);c.stroke();}
   c.fillStyle='rgba(255,210,118,.16)';for(let lx=x+28;lx<x+w-12;lx+=88)c.fillRect(lx,y+5,18,4);
   c.fillStyle='rgba(0,0,0,.16)';c.fillRect(x,y+h-3,w,3);
  }else{
   for(let yy=y+22;yy<y+h-10;yy+=54){c.beginPath();c.moveTo(x+4,yy);c.lineTo(x+w-4,yy);c.stroke();}
   c.fillStyle='rgba(255,210,118,.16)';for(let ly=y+28;ly<y+h-12;ly+=88)c.fillRect(x+5,ly,4,18);
   c.fillStyle='rgba(0,0,0,.16)';c.fillRect(x+w-3,y,3,h);
  }
  c.restore();
 }
 function drawDoor(c,name,x,y,w,h,color){
  c.save();c.beginPath();c.rect(x,y,w,h);c.clip();c.fillStyle='#162229';c.fillRect(x,y,w,h);
  if(w>=h)draw(c,name,x,y,w,h);else {c.translate(x+w,y);c.rotate(Math.PI/2);draw(c,name,0,0,h,w);} 
  c.restore();
  c.save();c.shadowColor=color;c.shadowBlur=8;c.strokeStyle=color;c.lineWidth=2;c.strokeRect(x+2,y+2,w-4,h-4);c.restore();
  if(w>=h)c.fillStyle='rgba(4,10,12,.45)',c.fillRect(x,y+h-3,w,3); else c.fillStyle='rgba(4,10,12,.45)',c.fillRect(x+w-3,y,3,h);
 }

 // GFX2: restrained orthographic industrial composition, PILOT ROOM ONLY.
 // The logical geometry and collision rectangles are deliberately untouched.
 const pilot=room=>!!room&&room.kind==='start'&&room.shape==='1x2';
 const hash=(x,y)=>{let n=(Math.imul((x|0)+17,73856093)^Math.imul((y|0)+23,19349663))>>>0;return (n%997)/997;};
 // P02: independent textured plates, independent doors and physical obstacles.
 // Static panel surfaces are cached by the main rendering pipeline.
 function pilotFloor(c,obstacles){
  const W=360,H=800;
  c.save();c.fillStyle='#29363b';c.fillRect(0,0,W,H);
  // Each independent 2x resolution material occupies one architectural bay.
  const panels=[
   [22,22,152,172],[179,22,159,172],
   [22,199,316,192],[22,397,155,184],
   [183,397,155,184],[22,587,316,191]
  ];
  panels.forEach(([x,y,w,h],i)=>{
   c.fillStyle='#16272d';c.fillRect(x-3,y-3,w+6,h+6);
   if(!draw(c,'p02_panel_'+i,x,y,w,h)){
    c.fillStyle=i%2?'#414b50':'#3c464b';c.fillRect(x,y,w,h);
   }
  });
  // Subtle contact darkening belongs to the room architecture, not the world limits.
  c.save();c.globalAlpha=.17;
  let fade=c.createLinearGradient(0,0,28,0);fade.addColorStop(0,'#000');fade.addColorStop(1,'transparent');
  c.fillStyle=fade;c.fillRect(0,0,28,H);
  fade=c.createLinearGradient(W,0,W-28,0);fade.addColorStop(0,'#000');fade.addColorStop(1,'transparent');
  c.fillStyle=fade;c.fillRect(W-28,0,28,H);c.restore();
  // Rare olive/amber service stencils, away from the survivor movement lane.
  c.fillStyle='rgba(185,145,74,.38)';c.fillRect(44,760,36,3);
  c.fillStyle='rgba(169,177,164,.25)';c.font='bold 12px monospace';c.textAlign='left';c.fillText('K-17',261,748);
  // Physically aligned contact shadows, no drawn black hitbox rectangles.
  obstacles.forEach((o,i)=>{
   const [x,y,w,h]=o;
   const name=pickProp(o,i);
   const grow=1.16,dw=Math.max(w+6,Math.round(w*grow)),dh=Math.max(h+6,Math.round(h*grow));
   const dx=x+(w-dw)/2,dy=y+(h-dh)/2;
   c.save();
   const glow=c.createRadialGradient(x+w/2,y+h/2,3,x+w/2,y+h/2,Math.max(dw,dh)*.71);
   glow.addColorStop(0,'rgba(0,9,12,.39)');glow.addColorStop(.8,'rgba(0,9,12,.15)');glow.addColorStop(1,'rgba(0,9,12,0)');
   c.fillStyle=glow;c.beginPath();c.ellipse(x+w/2,y+h/2+3,dw*.72,dh*.64,0,0,Math.PI*2);c.fill();
   if(!draw(c,name,dx,dy,dw,dh)){
    c.fillStyle='#59665f';c.fillRect(dx,dy,dw,dh);
   }
   c.restore();
  });
  c.restore();
 }
 function pilotWalls(c,walls,doors){
  c.save();
  // Textured 90-degree overhead girders clipped exactly to collision-wall rectangles.
  walls.forEach(([x,y,w,h])=>{
   const horizontal=w>=h;
   c.save();c.beginPath();c.rect(x,y,w,h);c.clip();
   c.fillStyle='#172a32';c.fillRect(x,y,w,h);
   if(horizontal){
    for(let xx=x;xx<x+w;xx+=128)draw(c,'p02_wall_section',xx,y,128,h);
   }else{
    c.translate(x+w,y);c.rotate(Math.PI/2);
    for(let yy=0;yy<h;yy+=128)draw(c,'p02_wall_section',yy,0,128,w);
   }
   c.restore();
   // Wider-spaced embedded amber luminaires; one-dimensional along the wall only.
   const length=horizontal?w:h;
   if(length>140){
    const n=Math.max(1,Math.floor(length/175));
    for(let i=0;i<n;i++){
     const pos=(i+.5)*length/n;
     const lx=horizontal?x+pos-9:x+5,ly=horizontal?y+5:y+pos-9;
     c.save();c.fillStyle='#101f25';c.fillRect(lx-3,ly-2,horizontal?24:10,horizontal?10:24);
     c.shadowColor='#eda94d';c.shadowBlur=7;c.fillStyle='#c18b47';
     c.fillRect(lx,ly,horizontal?18:4,horizontal?4:18);c.restore();
    }
   }
  });
  doors.forEach(({x,y,w,h,locked,arena})=>{
   const name=locked?'door_locked':arena?'door_arena':'door_open';
   const color=locked?'#e16c63':arena?'#edb364':'#58ddc5';
   c.fillStyle='#0d1f26';c.fillRect(x-4,y-4,w+8,h+8);
   c.strokeStyle='rgba(173,189,190,.34)';c.lineWidth=2;c.strokeRect(x-3,y-3,w+6,h+6);
   drawDoor(c,name,x,y,w,h,color);
  });
  c.restore();
 }
 const P={
  applies(room,sector){return !!room&&sector===0;},
  ready(){return ready;},
  floor(c,room,obstacles){
   if(pilot(room)){pilotFloor(c,obstacles||[]);return;}
   // Backward compatibility if called with the former signature floor(c, obstacles).
   if(Array.isArray(room)&&obstacles===undefined){obstacles=room;room={kind:'standard'};}
   obstacles=Array.isArray(obstacles)?obstacles:[];
   room=room&&typeof room==='object'?room:{kind:'standard'};
   const W=c.canvas.width,H=c.canvas.height;
   c.save();
   drawBackdrop(c,W,H,room.kind||'standard');
   obstacles.forEach((o,i)=>drawProp(c,pickProp(o,i),o[0],o[1],o[2],o[3]));
   c.restore();
  },
  walls(c,room,walls,doorInfo){
   if(pilot(room)){pilotWalls(c,walls||[],doorInfo||[]);return;}
   // Backward compatibility if called with former signature walls(c, walls, doorInfo).
   if(Array.isArray(room) && Array.isArray(walls) && doorInfo===undefined){doorInfo=walls;walls=room;room={kind:'standard'};}
   room=room&&typeof room==='object'?room:{kind:'standard'};walls=Array.isArray(walls)?walls:[];doorInfo=Array.isArray(doorInfo)?doorInfo:[];
   c.save();
   walls.forEach(([x,y,w,h])=>{
    const horizontal=w>=h;
    c.save();c.beginPath();c.rect(x,y,w,h);c.clip();c.fillStyle='#243036';c.fillRect(x,y,w,h);
    if(horizontal){for(let xx=x;xx<x+w;xx+=58)draw(c,'wall_horizontal',xx,y,58,h);}
    else{c.translate(x+w,y);c.rotate(Math.PI/2);for(let yy=0;yy<h;yy+=58)draw(c,'wall_horizontal',yy,0,58,w);}
    c.restore();
    wallDetails(c,x,y,w,h,horizontal);
    c.strokeStyle='rgba(9,18,21,.82)';c.lineWidth=1;c.strokeRect(x+.5,y+.5,w-1,h-1);
    c.strokeStyle='rgba(207,224,226,.08)';c.lineWidth=1;
    if(horizontal){c.beginPath();c.moveTo(x+2,y+3);c.lineTo(x+w-2,y+3);c.stroke();}
    else{c.beginPath();c.moveTo(x+3,y+2);c.lineTo(x+3,y+h-2);c.stroke();}
   });
   doorInfo.forEach(({x,y,w,h,locked,arena})=>{
    const name=locked?'door_locked':arena?'door_arena':'door_open';
    const baseColor=locked?'#e16c63':arena?'#edb364':'#58ddc5';
    drawDoor(c,name,x,y,w,h,baseColor);
   });
   c.restore();
  }
 };
 root.AshP01Graphics=Object.freeze(P);
})(window);
