/* ASHFALL P01 - graphic-only procedural top-down pilot (no physics changes). */
(function(root){'use strict';
 const P={
  applies(room,sector){return !!room && sector===0 && room.kind==='start' && (room.shape||'single')==='single';},
  floor(c,obstacles){
   c.save();c.fillStyle='#242b30';c.fillRect(0,0,360,400);
   // Flat orthographic steel floor, deterministic marks, no projected walls.
   for(let y=20;y<400;y+=56)for(let x=20;x<360;x+=64){
    let seed=((x*173+y*57)^0x17a5)>>>0;
    const k=seed%4;c.fillStyle=['#343b40','#30383e','#384044','#31383d'][k];
    c.fillRect(x+1,y+1,62,54);
    c.fillStyle='#19262c';c.fillRect(x+1,y+1,62,1);c.fillRect(x+1,y+1,1,54);
    c.fillStyle='#667076';c.globalAlpha=.48;
    for(const xx of [x+6,x+57])for(const yy of [y+6,y+48])c.fillRect(xx,yy,2,2);
    c.globalAlpha=1;
    for(let i=0;i<4;i++){
     const px=x+6+((seed+i*23)%49),py=y+5+((seed>>>3+i*17)%44);
     c.fillStyle=i===2?'#715a47':'#242d31';c.globalAlpha=.18+i*.035;c.fillRect(px,py,2+i%2,1+i%2);
    }c.globalAlpha=1;
   }
   // Painted caution strips: not obstacles, only at room edges.
   c.save();c.beginPath();c.rect(26,135,9,120);c.rect(325,135,9,120);c.clip();
   c.fillStyle='#917039';c.fillRect(24,132,312,127);
   c.strokeStyle='#273039';c.lineWidth=7;
   for(let y=126;y<270;y+=16){c.beginPath();c.moveTo(20,y);c.lineTo(44,y+24);c.moveTo(314,y);c.lineTo(338,y+24);c.stroke();}
   c.restore();
   // Cracks and scratches stay purely decorative.
   c.strokeStyle='#161f23';c.lineWidth=1.4;
   for(const p of [[[204,280],[211,288],[208,297],[220,305]],[[282,106],[277,111],[286,116]],[[120,220],[128,215],[135,224]]]){
    c.beginPath();p.forEach((pt,i)=>i?c.lineTo(...pt):c.moveTo(...pt));c.stroke();
   }
   // All props exactly cover the preexisting physical obstacle rectangles.
   obstacles.forEach(([x,y,w,h],i)=>{
    c.fillStyle='#101e22';c.fillRect(x,y,w,h);
    c.fillStyle=i===2?'#47646b':'#626c58';c.fillRect(x+2,y+2,w-4,h-4);
    c.fillStyle='#293d3d';c.fillRect(x+4,y+5,w-8,Math.max(2,h-10));
    c.strokeStyle='#9b9d83';c.lineWidth=1.2;c.strokeRect(x+3.5,y+3.5,w-7,h-7);
    c.fillStyle='#bdad78';for(const xx of [x+5,x+w-7])for(const yy of [y+5,y+h-7])c.fillRect(xx,yy,2,2);
    if(w>26){c.strokeStyle='#798476';c.lineWidth=2;c.beginPath();c.moveTo(x+9,y+h/2);c.lineTo(x+w-9,y+h/2);c.stroke();}
   });
   c.restore();
  },
  walls(c,walls,doorInfo){
   c.save();
   walls.forEach(([x,y,w,h])=>{
    c.fillStyle='#101b22';c.fillRect(x,y,w,h);
    c.fillStyle='#333e46';c.fillRect(x+2,y+2,w-4,h-4);
    c.strokeStyle='#7d8588';c.lineWidth=1.2;c.strokeRect(x+2.5,y+2.5,w-5,h-5);
    c.fillStyle='#171f27';if(w>h)c.fillRect(x+2,y+h-7,w-4,5);else c.fillRect(x+w-7,y+2,5,h-4);
    const horiz=w>h,len=horiz?w:h;
    c.fillStyle='#8c9697';for(let p=18;p<len-10;p+=36){c.fillRect(x+(horiz?p:7),y+(horiz?7:p),2,2);}
   });
   doorInfo.forEach(({x,y,w,h,locked,arena})=>{
    const col=locked?'#db796c':arena?'#dfb068':'#66c8ac';
    c.fillStyle='#0c1820';c.fillRect(x-2,y-2,w+4,h+4);
    c.fillStyle='#3c474e';c.fillRect(x,y,w,h);
    c.fillStyle='#182830';c.fillRect(x+4,y+4,w-8,h-8);
    c.strokeStyle=col;c.lineWidth=3;c.strokeRect(x+3,y+3,w-6,h-6);
    c.fillStyle=col;
    if(w>h){c.fillRect(x+8,y+8,9,4);c.fillRect(x+w-17,y+8,9,4);}
    else {c.fillRect(x+8,y+8,4,9);c.fillRect(x+8,y+h-17,4,9);}
   });
   c.restore();
  }
 };
 root.AshP01Graphics=Object.freeze(P);
})(window);
