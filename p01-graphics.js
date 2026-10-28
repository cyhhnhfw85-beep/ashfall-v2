/* ASHFALL — Periphery Environment Engine V2 — procedural Canvas environment.
   No legacy P01 texture dependency. Uses gameplay-provided obstacle rectangles unchanged.
   Deterministic seeded visuals, room-specific palettes, and collision-faithful props. */
(function(root){'use strict';
 const palettes={standard:['#19272e','#263941','#6c929c'],start:['#172b31','#254149','#70cbbf'],arena:['#29272b','#413535','#d6a365'],boss:['#29252b','#47323b','#d67e79'],exit:['#242d30','#3b4240','#c7b67b'],outpost:['#1b2c36','#30434d','#8db7d2']};
 function hash(a,b,c=0){let x=(Math.imul(a|0,374761393)+Math.imul(b|0,668265263)+Math.imul(c|0,1442695041))|0;x=Math.imul(x^(x>>>13),1274126177);return ((x^(x>>>16))>>>0)/4294967296;}
 function rr(c,x,y,w,h,r){r=Math.max(0,Math.min(r,w/2,h/2));c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();}
 function fill(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(x,y,w,h);}
 function line(c,x1,y1,x2,y2,color,width=1){c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();}
 const sectorPalettes=[
 ['#19272e','#263941','#6c929c'],
 ['#172c39','#294757','#71b7d3'],
 ['#332b24','#534536','#d9a16b'],
 ['#292637','#403951','#b19ad9']
 ];
 function paletteFor(room){
  const special=palettes[room.kind];
  if(special && room.kind!=='standard')return special;
  const sec=Math.max(0,Math.min(3,Math.floor(Number(room.sector)||0)));
  return sectorPalettes[sec];
 }
 function seedOf(room){let s=0;const str=String(room.sector??0)+'|'+String(room.id??room.index??room.key??'0')+'|'+String(room.kind||'standard')+'|'+String(room.x||0)+'|'+String(room.y||0);for(let i=0;i<str.length;i++)s=Math.imul(s^str.charCodeAt(i),16777619);return s|0;}

 // V2.5: all additions below are floor-level or wall-attached: no phantom solid props.
 function glow(c,x,y,r,color,alpha){
  const g=c.createRadialGradient(x,y,0,x,y,r);
  g.addColorStop(0,color);g.addColorStop(1,'rgba(0,0,0,0)');
  c.save();c.globalAlpha=alpha;c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);c.restore();
 }
 function insetPanel(c,x,y,w,h,accent,variant){
  c.save();
  fill(c,x+2,y+3,w,h,'rgba(0,5,10,.25)');
  fill(c,x,y,w,h,'#14252d');
  fill(c,x+3,y+3,w-6,h-6,variant?'#20343d':'#192e36');
  line(c,x+4,y+4,x+w-5,y+4,'rgba(150,184,190,.22)');
  line(c,x+4,y+h-4,x+w-4,y+h-4,'rgba(0,4,9,.5)',2);
  for(let k=0;k<Math.max(2,Math.floor((w-15)/13));k++){
   const px=x+8+k*13;if(px>x+w-8)break;
   line(c,px,y+10,px,y+h-10,'rgba(6,15,20,.52)',2);
  }
  fill(c,x+6,y+h-7,Math.min(w-12,20),2,accent);
  c.restore();
 }
 function floorFeatures(c,W,H,s,p,room){
  // Architectural bands and service trenches remain visually flat and walkable.
  const axis=hash(29,13,s)>.5;
  const band=(axis?W:H)*(.23+hash(41,4,s)*.5);
  c.save();
  if(axis){
   fill(c,band-16,0,32,H,'rgba(4,13,19,.17)');
   line(c,band-17,0,band-17,H,'rgba(157,190,193,.13)',2);
   line(c,band+17,0,band+17,H,'rgba(3,9,14,.45)',3);
  }else{
   fill(c,0,band-16,W,32,'rgba(4,13,19,.17)');
   line(c,0,band-17,W,band-17,'rgba(157,190,193,.13)',2);
   line(c,0,band+17,W,band+17,'rgba(3,9,14,.45)',3);
  }
  // One or two recessed maintenance grilles per room, purely floor markings.
  const count=1+Math.floor(hash(7,15,s)*2);
  for(let i=0;i<count;i++){
   const w=66+Math.floor(hash(i,91,s)*3)*18,h=30;
   const x=30+hash(i,37,s)*Math.max(1,W-w-60);
   const y=45+hash(i,53,s)*Math.max(1,H-h-90);
   insetPanel(c,x,y,w,h,p[2],i%2);
  }
  // Paint markings imply functional zones without introducing collision.
  const mx=W*(.22+hash(3,88,s)*.55),my=H*(.25+hash(4,88,s)*.50);
  c.translate(mx,my);c.rotate((hash(5,88,s)>.5?1:-1)*Math.PI/2);
  c.strokeStyle='rgba(221,166,89,.28)';c.lineWidth=3;
  c.strokeRect(-31,-18,62,36);
  for(let k=-2;k<=2;k++)line(c,k*10-7,-15,k*10+7,15,'rgba(221,166,89,.14)',3);
  c.restore();
  // Deterministic restrained grime clusters instead of uniform noise.
  for(let i=0;i<9;i++){
   const x=hash(i,75,s)*W,y=hash(i,76,s)*H,r=12+hash(i,77,s)*26;
   glow(c,x,y,r,'rgba(5,10,12,.85)',.13);
  }
 }
 function wallFixtures(c,wallRects,s,p){
  wallRects.forEach((a,i)=>{
   const [x,y,w,h]=a;if(!(w>0&&h>0))return;
   const horizontal=w>=h, len=horizontal?w:h;
   if(len<85)return;
   for(let t=48;t<len-28;t+=115){
    if(hash(i,t,s)<.34)continue;
    const px=horizontal?x+t-13:x+w*.2;
    const py=horizontal?y+h*.2:y+t-13;
    const fw=horizontal?26:w*.6,fh=horizontal?h*.6:26;
    if(fw<5||fh<5)continue;
    fill(c,px+2,py+2,fw,fh,'rgba(0,5,10,.48)');
    fill(c,px,py,fw,fh,'#263d45');
    fill(c,px+3,py+3,Math.max(2,fw-6),Math.max(2,fh-6),'#10242b');
    fill(c,px+4,py+4,Math.max(2,fw-8),Math.min(3,fh-7),p[2]);
    glow(c,px+fw/2,py+fh/2,24,p[2],.10);
   }
  });
 }

 function floor(c,room,obstacles){room=room&&typeof room==='object'&&!Array.isArray(room)?room:{kind:'standard'};obstacles=Array.isArray(obstacles)?obstacles:[];
  const W=c.canvas.width,H=c.canvas.height,s=seedOf(room),p=paletteFor(room);c.save();
  const grad=c.createLinearGradient(0,0,W,H);grad.addColorStop(0,p[1]);grad.addColorStop(.52,p[0]);grad.addColorStop(1,'#101a21');fill(c,0,0,W,H,grad);
  // Large architectural slabs; seams are deliberately subtle and aligned.
  const step=112,ox=((s>>>4)%41)-41,oy=((s>>>9)%37)-37;
  for(let y=oy;y<H;y+=step)for(let x=ox;x<W;x+=step){const ix=Math.floor((x-ox)/step),iy=Math.floor((y-oy)/step),h=hash(ix,iy,s);
   const inset=3;fill(c,x+inset,y+inset,step-inset*2,step-inset*2,h>.87?'rgba(102,132,139,.13)':h<.12?'rgba(2,8,13,.19)':'rgba(92,117,124,.045)');
   line(c,x+3,y+3,x+step-4,y+3,'rgba(170,199,201,.095)');line(c,x+3,y+step-3,x+step-3,y+step-3,'rgba(0,5,10,.34)');
   for(let j=0;j<4;j++){const px=x+(j%2?step-10:10),py=y+(j>1?step-10:10);fill(c,px,py,2,2,'rgba(5,13,18,.45)');}
   if(h>.83){const gx=x+22,gy=y+25;fill(c,gx,gy,step-44,step-50,'rgba(4,12,17,.22)');for(let k=0;k<5;k++)line(c,gx+7,gy+7+k*9,gx+step-52,gy+7+k*9,'rgba(129,165,169,.20)',2);}
   if(h<.075){line(c,x+27,y+step*.5,x+step-27,y+step*.5,'rgba(207,161,82,.22)',3);}
  }
  floorFeatures(c,W,H,s,p,room);
  // Structural edge shadow and restrained hazard accents.
  const edge=c.createLinearGradient(0,0,0,42);edge.addColorStop(0,'rgba(0,5,9,.58)');edge.addColorStop(1,'rgba(0,5,9,0)');fill(c,0,0,W,42,edge);
  c.save();c.translate(W,H);c.rotate(Math.PI);fill(c,0,0,W,40,edge);c.restore();
  fill(c,0,0,19,H,'rgba(1,9,14,.26)');fill(c,W-19,0,19,H,'rgba(1,9,14,.26)');
  // Architectural floor markings are decorative, never new blocking objects.
  for(let i=0;i<Math.min(6,Math.floor(W*H/60000));i++){let x=36+hash(i,4,s)*Math.max(1,W-72),y=44+hash(i,9,s)*Math.max(1,H-88);c.save();c.globalAlpha=.18;c.translate(x,y);c.rotate((hash(i,11,s)-.5)*.16);line(c,-13,0,13,0,p[2],2);line(c,0,-8,0,8,p[2],1);c.restore();}
  // Physical props are drawn exactly within their gameplay collision rectangles.
  obstacles.forEach((o,i)=>{if(!Array.isArray(o)||o.length<4)return;const [x,y,w,h]=o;if(!(w>0&&h>0))return;prop(c,x,y,w,h,hash(i,7,s),p);});
  c.restore();
 }
 function prop(c,x,y,w,h,t,p){c.save();const r=Math.min(7,w*.12,h*.12);
  c.shadowColor='rgba(0,0,0,.62)';c.shadowBlur=10;c.shadowOffsetY=4;rr(c,x+1,y+1,w-2,h-2,r);c.fillStyle='#101b21';c.fill();c.shadowBlur=0;c.shadowOffsetY=0;
  const g=c.createLinearGradient(x,y,x+w,y+h);g.addColorStop(0,t>.66?'#53646a':t>.33?'#425960':'#455157');g.addColorStop(.42,t>.66?'#34454d':'#2a3e46');g.addColorStop(1,'#18272e');rr(c,x+2,y+2,w-4,h-4,r);c.fillStyle=g;c.fill();c.strokeStyle='#0a171d';c.lineWidth=2;c.stroke();
  rr(c,x+6,y+6,Math.max(1,w-12),Math.max(1,h-12),Math.min(4,r));c.strokeStyle='rgba(172,201,202,.26)';c.lineWidth=1;c.stroke();
  if(t<.33){ // sealed crate with metal bands
   fill(c,x+w*.47,y+4,Math.max(3,w*.08),h-8,'rgba(11,22,28,.52)');fill(c,x+4,y+h*.44,w-8,Math.max(3,h*.1),'rgba(11,22,28,.45)');
  }else if(t<.66){ // industrial worktable / console, solid footprint
   fill(c,x+w*.15,y+h*.18,w*.7,h*.23,'#111f26');fill(c,x+w*.2,y+h*.22,w*.6,h*.1,'#529e9e');line(c,x+w*.2,y+h*.68,x+w*.8,y+h*.68,'rgba(217,170,97,.65)',2);
  }else{ // mechanical housing
   for(let k=0;k<3;k++)fill(c,x+w*.2,y+h*(.23+k*.2),w*.6,Math.max(2,h*.075),'#16252c');
   fill(c,x+w*.73,y+h*.14,Math.max(3,w*.09),Math.max(3,h*.09),p[2]);
  }
  [[x+8,y+8],[x+w-9,y+8],[x+8,y+h-9],[x+w-9,y+h-9]].forEach(q=>{fill(c,q[0],q[1],2,2,'#0a161a');});c.restore();
 }
 function walls(c,room,wallRects,doors){room=room&&typeof room==='object'&&!Array.isArray(room)?room:{kind:'standard'};wallRects=Array.isArray(wallRects)?wallRects:[];doors=Array.isArray(doors)?doors:[];const p=paletteFor(room),s=seedOf(room);c.save();
  wallRects.forEach((a,i)=>{const [x,y,w,h]=a;if(!(w>0&&h>0))return;const horizontal=w>=h;
   c.save();c.shadowColor='rgba(0,0,0,.70)';c.shadowBlur=12;c.shadowOffsetY=4;
   const g=c.createLinearGradient(x,y,x+(horizontal?0:w),y+(horizontal?h:0));g.addColorStop(0,'#60757b');g.addColorStop(.18,'#33464e');g.addColorStop(.7,'#202f37');g.addColorStop(1,'#0c171e');fill(c,x,y,w,h,g);c.restore();
   line(c,x+1,y+1,x+w-1,y+1,'rgba(180,212,214,.29)',2);
   const len=horizontal?w:h,step=70;for(let q=step;q<len-6;q+=step){const xx=horizontal?x+q:x,yy=horizontal?y:y+q;line(c,xx,yy,xx+(horizontal?0:w),yy+(horizontal?h:0),'rgba(2,11,17,.65)',2);if(hash(i,q,s)>.62){fill(c,xx+(horizontal?-3:3),yy+(horizontal?3:-3),horizontal?6:Math.max(3,w-6),horizontal?Math.max(3,h-6):6,'rgba(141,169,170,.11)');}}
   c.strokeStyle='#09151c';c.lineWidth=1;c.strokeRect(x+.5,y+.5,w-1,h-1);
  });
  wallFixtures(c,wallRects,s,p);
  doors.forEach((d,i)=>{const {x,y,w,h,locked,arena}=d;if(!(w>0&&h>0))return;const accent=locked?'#e36f65':arena?'#e9b66b':'#61d5c5';c.save();
   c.shadowColor=accent;c.shadowBlur=12;c.strokeStyle=accent;c.lineWidth=2.5;c.strokeRect(x+2,y+2,w-4,h-4);c.shadowBlur=0;
   fill(c,x+5,y+5,w-10,h-10,locked?'rgba(92,35,35,.55)':'rgba(5,18,23,.50)');
   if(locked){for(let q=8;q<(w>=h?w:h)-8;q+=12){if(w>=h)line(c,x+q,y+6,x+q+7,y+h-6,'rgba(237,136,110,.55)',2);else line(c,x+6,y+q,x+w-6,y+q+7,'rgba(237,136,110,.55)',2);}}
   else{if(w>=h)line(c,x+6,y+h/2,x+w-6,y+h/2,accent,1);else line(c,x+w/2,y+6,x+w/2,y+h-6,accent,1);}
   glow(c,x+w/2,y+h/2,Math.max(w,h)*.85,accent,.12);
   c.restore();
  });c.restore();
 }
 root.AshP01Graphics=Object.freeze({applies(room,sector){return !!room&&Number.isFinite(Number(sector))&&sector>=0&&sector<=3;},ready(){return true;},floor,walls});
})(window);
