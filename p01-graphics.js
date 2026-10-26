/* ASHFALL P01 V2 - approved K-17 concept assets mapped to existing 2D geometry. */
(function(root){'use strict';
 const files=['floor_concrete','floor_metal','floor_cracked','floor_grate','floor_wear','floor_hazard','wall_horizontal','door_open','door_locked','door_arena','prop_crate','prop_military','prop_container','prop_generator','prop_console','prop_machine'];
 const images=Object.create(null);let ready=false;
 let pending=files.length;
 files.forEach(name=>{const im=new Image();images[name]=im;
  im.onload=im.onerror=()=>{if(--pending===0){ready=true;root.dispatchEvent(new Event('ash-p01-assets-ready'));}};
  im.src='assets/p01v2/'+name+'.png?v=0902p01v2';
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
   // Props are clipped strictly to the obstacle collision rectangles, no fake solids.
   const choices=['prop_crate','prop_military','prop_generator','prop_console','prop_container','prop_machine'];
   obstacles.forEach(([x,y,w,h],i)=>{
    c.save();c.beginPath();c.rect(x,y,w,h);c.clip();
    c.fillStyle='#17262a';c.fillRect(x,y,w,h);
    draw(c,choices[i%choices.length],x,y,w,h);
    c.restore();
    c.strokeStyle='rgba(5,13,16,.8)';c.lineWidth=1.5;c.strokeRect(x+.75,y+.75,w-1.5,h-1.5);
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
