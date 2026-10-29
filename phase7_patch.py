from pathlib import Path
p=Path(__file__).parent/'game.js'
s=p.read_text()
a='function merchantRarityCap(){return Math.min(5,1+merchantTier());}'
b='function merchantRarityCap(tier=merchantTier()){return Math.min(5,1+Math.max(0,Math.min(4,Math.floor(Number(tier)||0))));}'
assert s.count(a)==1;s=s.replace(a,b)
a='function merchantGenerateGear(slot,tier){\n const cap=merchantRarityCap();'
b='function merchantGenerateGear(slot,tier){\n // Le plafond dépend du palier demandé, et non d’un état global susceptible de changer.\n const cap=merchantRarityCap(tier);'
assert s.count(a)==1;s=s.replace(a,b)
p.write_text(s)
p=Path(__file__).parent/'service-worker.js';s=p.read_text();assert s.count('ashfall-v2-6-phase6-20261029')==1;p.write_text(s.replace('ashfall-v2-6-phase6-20261029','ashfall-v2-7-phase7-20261029'))
