/* ASHFALL P01 V3 - polished K-17 pilot room, strict 90° top-down. */
(function(root){'use strict';
 const files=['floor_concrete','floor_metal','floor_cracked','floor_grate','floor_wear','floor_hazard','wall_horizontal','door_open','door_locked','door_arena','prop_crate','prop_military','prop_container','prop_generator','prop_console','prop_machine'];
 const images=Object.create(null);let ready=false;
 let pending=files.length;
 files.forEach(name=>{const im=new Image();images[name]=im;
  im.onload=im.onerror=()=>{if(--pending===0){ready=true;root.dispatchEvent(new Event('ash-p01-assets-ready'));}};
  im.src='assets/p01v2/'+name+'.png?v=0902p01v32';
 });
 const usable=name=>images[name]&&images[name].complete&&images[name].naturalWidth>0;
 const draw=(c,name,x,y,w,h)=>{if(!usable(name))return false;c.drawImage(images[name],x,y,w,h);return true;};
 const rect=(c,x,y,w,h,r=4)=>{c.beginPath();c.moveTo(x+r,y);c.lineTo(x+w-r,y);c.quadraticCurveTo(x+w,y,x+w,y+r);c.lineTo(x+w,y+h-r);c.quadraticCurveTo(x+w,y+h,x+w-r,y+h);c.lineTo(x+r,y+h);c.quadraticCurveTo(x,y+h,x,y+h-r);c.lineTo(x,y+r);c.quadraticCurveTo(x,y,x+r,y);};
 const floorChoices=['floor_concrete','floor_metal','floor_concrete','floor_cracked','floor_metal','floor_wear'];
 const propChoices=['prop_crate','prop_military','prop_generator','prop_console','prop_container','prop_machine'];
 const propScales={
  prop_crate:{sx:1.82,sy:1.93,minW:62,minH:39},
  prop_military:{sx:1.88,sy:1.88,minW:69,minH:47},
  prop_generator:{sx:1.83,sy:1.78,minW:39,minH:49},
  prop_console:{sx:1.88,sy:1.98,minW:39,minH:53},
  prop_container:{sx:1.52,sy:1.49,minW:99,minH:47},
  prop_machine:{sx:1.6,sy:1.6,minW:90,minH:52}
 };
 function floorTile(c,name,x,y,w,h){
  if(!draw(c,name,x,y,w,h)){c.fillStyle='#353d40';c.fillRect(x,y,w,h);}
  c.save();
  c.strokeStyle='rgba(8,18,22,.30)';c.lineWidth=1;c.strokeRect(x+.5,y+.5,w-1,h-1);
  c.strokeStyle='rgba(255,255,255,.05)';c.beginPath();c.moveTo(x+2,y+2);c.lineTo(x+w-3,y+2);c.moveTo(x+2,y+2);c.lineTo(x+2,y+h-3);c.stroke();
  c.restore();
 }
 function floorDecals(c){
  c.save();
  // V3.1: no opaque/tinted central rectangles; preserve fine floor markings.
  // dashed guidance markings
  c.strokeStyle='rgba(208,188,118,.35)';c.lineWidth=4;c.setLineDash([12,10]);c.beginPath();c.moveTo(180,88);c.lineTo(180,312);c.stroke();c.setLineDash([]);
  // hazard and tech panels near doors
  c.globalAlpha=.25;draw(c,'floor_hazard',25,155,18,75);draw(c,'floor_hazard',317,155,18,75);c.globalAlpha=.22;draw(c,'floor_hazard',143,19,74,18);draw(c,'floor_hazard',143,363,74,18);
  // embedded grates and service hatches
  draw(c,'floor_grate',147,159,66,66);
  draw(c,'floor_grate',78,289,20,20);draw(c,'floor_grate',262,52,18,18);
  // grime, stains and scratches
  const stains=[[85,124,18,10,.12],[246,286,22,11,.10],[202,100,14,8,.08],[137,265,26,12,.08]];
  stains.forEach(([x,y,rx,ry,a])=>{c.fillStyle=`rgba(28,20,15,${a})`;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill();});
  c.strokeStyle='rgba(12,21,24,.32)';c.lineWidth=2;
  [[66,88,88,76],[237,102,254,116],[230,310,247,325],[109,230,96,242]].forEach(([x1,y1,x2,y2])=>{c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();});
  // stencil and navigation marks
  c.fillStyle='rgba(230,239,241,.22)';c.font='bold 20px sans-serif';c.textAlign='center';c.fillText('K-17',287,337);
  c.font='bold 12px sans-serif';c.fillText('P01',287,352);
  c.globalAlpha=.26;c.strokeStyle='#d7e3e2';c.lineWidth=5;
  c.beginPath();c.moveTo(70,332);c.lineTo(96,332);c.moveTo(90,324);c.lineTo(98,332);c.lineTo(90,340);c.stroke();
  // cable bundles / micro ambience
  c.globalAlpha=.35;c.strokeStyle='#0d1418';c.lineWidth=3;c.beginPath();c.moveTo(55,314);c.bezierCurveTo(64,318,65,330,56,336);c.moveTo(302,90);c.bezierCurveTo(295,100,294,109,301,118);c.stroke();
  // subtle vignette for depth
  const g=c.createRadialGradient(180,200,90,180,200,260);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.75,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(3,10,13,.16)');c.fillStyle=g;c.fillRect(0,0,360,400);
  c.restore();
 }
 function drawProp(c,name,x,y,w,h){
  const cfg=propScales[name]||{sx:1.5,sy:1.5,minW:w,minH:h};
  const dw=Math.max(cfg.minW,Math.round(w*cfg.sx));
  const dh=Math.max(cfg.minH,Math.round(h*cfg.sy));
  const dx=Math.round(x+(w-dw)/2),dy=Math.round(y+(h-dh)/2);
  c.save();
  // base plate / shadow
  c.fillStyle='rgba(6,14,18,.18)';rect(c,x-2,y-2,w+4,h+4,4);c.fill();
  c.fillStyle='rgba(8,18,22,.38)';c.beginPath();c.ellipse(x+w/2,y+h/2+3,Math.max(9,w*.7),Math.max(7,h*.5),0,0,Math.PI*2);c.fill();
  draw(c,name,dx,dy,dw,dh);
  // V3.1: no artificial rectangular outline around props.
  // object-specific accenting
  // Fine functional indicator lights; no outer rectangular border.
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
  c.save();
  c.strokeStyle='rgba(9,17,21,.44)';c.lineWidth=1;
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
  c.save();c.beginPath();c.rect(x,y,w,h);c.clip();
  c.fillStyle='#162229';c.fillRect(x,y,w,h);
  if(w>=h)draw(c,name,x,y,w,h);else {c.translate(x+w,y);c.rotate(Math.PI/2);draw(c,name,0,0,h,w);} 
  c.restore();
  c.save();
  c.shadowColor=color;c.shadowBlur=8;c.strokeStyle=color;c.lineWidth=2;c.strokeRect(x+2,y+2,w-4,h-4);
  c.restore();
  if(w>=h){
   c.fillStyle='rgba(4,10,12,.45)';c.fillRect(x,y+h-3,w,3);
  }else{
   c.fillStyle='rgba(4,10,12,.45)';c.fillRect(x+w-3,y,3,h);
  }
 }
 const P={
  applies(room,sector){return !!room&&sector===0&&room.kind==='start'&&(room.shape||'single')==='single';},
  ready(){return ready;},
  floor(c,obstacles){
   c.save();c.fillStyle='#2d3539';c.fillRect(0,0,360,400);
   // varied 60px tiles, with a more controlled central lane.
   for(let y=0;y<400;y+=60)for(let x=0;x<360;x+=60){
    const ix=x/60,iy=y/60;
    let name=floorChoices[(ix*7+iy*11+((ix*iy)%3))%floorChoices.length];
    if(x>=120&&x<240&&y>=60&&y<340){
     name=(ix+iy)%2===0?'floor_concrete':'floor_metal';
    }
    floorTile(c,name,x,y,60,60);
   }
   // border strip under walls to frame the room.
   c.fillStyle='rgba(14,24,28,.28)';c.fillRect(0,0,360,24);c.fillRect(0,376,360,24);c.fillRect(0,0,24,400);c.fillRect(336,0,24,400);
   floorDecals(c);
   obstacles.forEach(([x,y,w,h],i)=>drawProp(c,propChoices[i%propChoices.length],x,y,w,h));
   c.restore();
  },
  walls(c,walls,doorInfo){
   c.save();
   walls.forEach(([x,y,w,h])=>{
    const horizontal=w>=h;
    c.save();c.beginPath();c.rect(x,y,w,h);c.clip();
    c.fillStyle='#243036';c.fillRect(x,y,w,h);
    if(horizontal){
     for(let xx=x;xx<x+w;xx+=58)draw(c,'wall_horizontal',xx,y,58,h);
    }else{
      c.translate(x+w,y);c.rotate(Math.PI/2);
      for(let yy=0;yy<h;yy+=58)draw(c,'wall_horizontal',yy,0,58,w);
    }
    c.restore();
    wallDetails(c,x,y,w,h,horizontal);
    c.strokeStyle='rgba(9,18,21,.82)';c.lineWidth=1;c.strokeRect(x+.5,y+.5,w-1,h-1);
    // inner edge highlight
    c.strokeStyle='rgba(207,224,226,.08)';c.lineWidth=1;if(horizontal){c.beginPath();c.moveTo(x+2,y+3);c.lineTo(x+w-2,y+3);c.stroke();}else{c.beginPath();c.moveTo(x+3,y+2);c.lineTo(x+3,y+h-2);c.stroke();}
   });
   doorInfo.forEach(({x,y,w,h,locked,arena})=>{
    const name=locked?'door_locked':arena?'door_arena':'door_open';
    const color=locked?'#e16c63':arena?'#edb364':'#58ddc5';
    drawDoor(c,name,x,y,w,h,color);
   });
   c.restore();
  }
 };
 root.AshP01Graphics=Object.freeze(P);
})(window);
