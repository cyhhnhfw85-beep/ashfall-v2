/* ASHFALL P01 V2 - approved K-17 concept assets mapped to existing 2D geometry. */
(function(root){'use strict';
 const files=['floor_concrete','floor_metal','floor_cracked','floor_grate','floor_wear','floor_hazard','wall_horizontal','door_open','door_locked','door_arena','prop_crate','prop_military','prop_container','prop_generator','prop_console','prop_machine'];
 const images=Object.create(null);let ready=false;
 let pending=files.length;
 files.forEach(name=>{const im=new Image();images[name]=im;
  im.onload=im.onerror=()=>{if(--pending===0){ready=true;root.dispatchEvent(new Event('ash-p01-assets-ready'));}};
  im.src='assets/p01v2/'+name+'.png?v=0902p01v21';
 });
 const usable=name=>images[name]&&images[name].complete&&images[name].naturalWidth>0;
 const draw=(c,name,x,y,w,h)=>{if(!usable(name))return false;c.drawImage(images[name],x,y,w,h);return true;};
 const P={
  applies(room,sector){return !!room&&sector===0&&room.kind==='start'&&(room.shape||'single')==='single';},
  ready(){return ready;},
  floor(c,obstacles){
   c.save();c.fillStyle='#30373a';c.fillRect(0,0,360,400);
   // Artwork texture squares are true overhead surfaces; static cache only built after images are ready.
   const tiles=['floor_concrete','floor_metal','floor_concrete','floor_cracked','floor_metal','floor_wear'];
   for(let y=0;y<400;y+=60)for(let x=0;x<360;x+=60){
    const ix=x/60,iy=y/60,idx=(ix*7+iy*11+((ix*iy)%3))%tiles.length;
    if(!draw(c,tiles[idx],x,y,60,60)){c.fillStyle='#353d40';c.fillRect(x,y,60,60);}
    c.strokeStyle='rgba(11,22,27,.38)';c.lineWidth=1;c.strokeRect(x+.5,y+.5,59,59);
   }
   // A few embedded flush grates; purely visual, never a physical obstacle.
   draw(c,'floor_grate',147,160,65,65);
   c.save();c.globalAlpha=.27;draw(c,'floor_hazard',26,155,17,75);draw(c,'floor_hazard',317,155,17,75);c.restore();
   // Props use the existing hitboxes but are rendered larger for a stronger top-down scale.
   const choices=['prop_crate','prop_military','prop_generator','prop_console','prop_container','prop_machine'];
   const scales={
    prop_crate:{sx:1.65,sy:1.75,minW:56,minH:34},
    prop_military:{sx:1.7,sy:1.7,minW:62,minH:42},
    prop_generator:{sx:1.65,sy:1.6,minW:34,minH:44},
    prop_console:{sx:1.7,sy:1.8,minW:34,minH:48},
    prop_container:{sx:1.38,sy:1.35,minW:90,minH:42},
    prop_machine:{sx:1.45,sy:1.45,minW:82,minH:46}
   };
   obstacles.forEach(([x,y,w,h],i)=>{
    const name=choices[i%choices.length],cfg=scales[name]||{sx:1.5,sy:1.5,minW:w,minH:h};
    const dw=Math.max(cfg.minW,Math.round(w*cfg.sx));
    const dh=Math.max(cfg.minH,Math.round(h*cfg.sy));
    const dx=Math.round(x+(w-dw)/2),dy=Math.round(y+(h-dh)/2);
    // Contact shadow and collision footprint remain separate: gameplay unchanged.
    c.save();
    c.fillStyle='rgba(8,18,22,.34)';
    c.beginPath();c.ellipse(x+w/2,y+h/2+2,Math.max(8,w*.6),Math.max(6,h*.42),0,0,Math.PI*2);c.fill();
    draw(c,name,dx,dy,dw,dh);
    c.restore();
   });
   c.restore();
  },
  walls(c,walls,doorInfo){
   c.save();
   walls.forEach(([x,y,w,h])=>{
    const horizontal=w>=h;
    c.save();c.beginPath();c.rect(x,y,w,h);c.clip();
    c.fillStyle='#263239';c.fillRect(x,y,w,h);
    if(horizontal){
     for(let xx=x;xx<x+w;xx+=58)draw(c,'wall_horizontal',xx,y,58,h);
    }else{
     // rotate a horizontal wall strip in local canvas space; remain orthographic.
     c.translate(x+w,y);c.rotate(Math.PI/2);
     for(let yy=0;yy<h;yy+=58)draw(c,'wall_horizontal',yy,0,58,w);
    }
    c.restore();
    c.strokeStyle='rgba(12,22,27,.7)';c.lineWidth=1;c.strokeRect(x+.5,y+.5,w-1,h-1);
   });
   doorInfo.forEach(({x,y,w,h,locked,arena})=>{
    const name=locked?'door_locked':arena?'door_arena':'door_open';
    const color=locked?'#e16c63':arena?'#edb364':'#58ddc5';
    c.save();c.beginPath();c.rect(x,y,w,h);c.clip();
    c.fillStyle='#1b2930';c.fillRect(x,y,w,h);
    if(w>=h)draw(c,name,x,y,w,h);
    else {c.translate(x+w,y);c.rotate(Math.PI/2);draw(c,name,0,0,h,w);}
    c.restore();
    // Functional state overlay independent from decorative image.
    c.strokeStyle=color;c.lineWidth=2;c.strokeRect(x+2,y+2,w-4,h-4);
   });
   c.restore();
  }
 };
 root.AshP01Graphics=Object.freeze(P);
})(window);
