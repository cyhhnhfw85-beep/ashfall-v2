/* ASHFALL Survivant 3.0 — rotation uniforme à 360°, image unique, aucune animation. */
(function(root){'use strict';
 const image=new Image();let loaded=false;
 image.onload=()=>{loaded=true;}; image.onerror=()=>{loaded=false;};
 image.src='assets/survivant-topdown.png?v=0902p01v21';
 root.AshTopDownSurvivor=Object.freeze({
  draw(ctx,o){
   if(!loaded||!image.naturalWidth)return false;
   const ax=Number.isFinite(o.fx)?o.fx:0,ay=Number.isFinite(o.fy)?o.fy:-1;
   const angle=(ax||ay)?Math.atan2(ay,ax)+Math.PI/2:0;
   ctx.save();ctx.translate(o.x,o.y);ctx.rotate(angle);
   // Image orientée vers le haut au repos; centre de rotation fixé sur la silhouette.
   ctx.drawImage(image,-20,-39,40,78);
   ctx.restore();return true;
  }
 });
})(window);
