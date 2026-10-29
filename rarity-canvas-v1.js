/* ASHFALL V2.8.2 — canvas rarity visual adapter; no save/gameplay mutations. */
(function(){'use strict';
const tiers={Commun:[1,2],Inhabituel:[2,4],Rare:[3,6],"Épique":[4,8],"Légendaire":[5,10],Mythique:[6,12]};
window.AshRarityCanvas=Object.freeze({
 draw(ctx,rar,color,time){const [rank,blur]=tiers[rar]||tiers.Commun;
  ctx.save();ctx.shadowColor=color;ctx.shadowBlur=blur;
  ctx.globalAlpha=.14+rank*.045;
  ctx.strokeStyle=color;ctx.lineWidth=rank>=5?2:1.3;
  ctx.beginPath();ctx.roundRect(-20,-12,40,24,5);ctx.stroke();
  if(rank>=5){ctx.globalAlpha=.11+.025*Math.sin(time*2);ctx.beginPath();ctx.arc(0,0,20+rank,0,Math.PI*2);ctx.stroke();}
  ctx.restore();
 }
});
})();
