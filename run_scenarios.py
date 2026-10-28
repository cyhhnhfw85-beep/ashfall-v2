import random,json,statistics
random.seed(980)
results=[]
for rooms in [10,25,50]:
 for success_rate in [.3,.6,.85]:
  vals=[];research=[];sale=[];loot=[]
  for _ in range(12000):
   kills=sum(random.randint(3,10) for i in range(rooms))
   chests=sum(random.random()<.63 for i in range(rooms))
   arena=int(rooms*6/50)
   # Simplified conditional economic model, not an engine execution.
   combat=sum(random.randint(4,10) for i in range(kills))
   chest_cr=sum(random.randint(12,24) for i in range(chests))
   arena_cr=sum(random.randint(150,250) for i in range(arena))
   boss_cr=450 if rooms==50 else 0
   explore_cr=600 if rooms>=50 else 300 if rooms>=30 else 155 if rooms>=20 else 65
   kill_cr=440 if kills>=45 else 210 if kills>=25 else 85 if kills>=10 else 0
   # Loot rarity assumed: among pickups, 9% epic+, capped by bag size.
   dropped=sum(random.random()<.055 for i in range(kills))+chests
   carried=min(10,dropped)
   epic=any(random.random()<.09 for i in range(carried))
   material_cr=520 if epic else 330 if carried>=2 else 150 if carried>=1 else 0
   cr=combat+20*rooms+chest_cr+arena_cr+boss_cr+60+explore_cr+kill_cr+material_cr
   won=random.random()<success_rate
   vals.append(cr if won else 0)
   # Credit sales limited to bag capacity, all loot modeled as common/rare/epic weapon mix.
   sale.append(sum(random.choice([35,80,130,250,400]) for i in range(carried)) if won else 0)
   research.append((rooms//3+explore_cr//60+(10 if rooms==50 else 5)+ (9 if epic else 3)) if won else min(2,rooms//3))
   loot.append(carried if won else 0)
  results.append({'rooms':rooms,'success_rate':success_rate,'mean_credits':round(statistics.mean(vals)),'mean_sale_if_all_sold':round(statistics.mean(sale)),'mean_research':round(statistics.mean(research),1),'mean_extracted_items':round(statistics.mean(loot),1)})
with open('/mnt/data/ashfall_econ_work/conditional_scenarios.json','w') as f:json.dump(results,f,indent=2,ensure_ascii=False)
for x in results:print(x)
