# Lokaverkefni C++
Lýsing: kerfi skrifað í c++ til að halda utan um bókanir í ferðir, Flugferðir, Hjólaferðir og Bátsferðir

### 6.des
í dag skrifaði ég Ferd yfir klassan sem geymir id, fjoldiMax og fjoldi þar passa ég líka að það sé ekki hægt að setja fjoldi hærra en fjoldiMax
Einnig skrifaði ég undirklassan Flugferd sem heldur utan um flugferðir sem er með auka reytinn Áfangastaður.

### 7.des
Kláraði að skrifa undir klassana Hjolaferd og Batsferd. Hjolaferd heldur aukalega utna um fjölda klukkustunda sem ferðin varir sú breyta er float, Batsferd heldur aukalega utan um hvort báturinn sé yfirbyggður eða ekki þetta er geymt sem bool

### 9.des
Tók eftir að ég hafði sett checkið til að passa að fjoldi færi ekki yfir fjöldiMax inn í setId fallið :), ég lagaði það. svo var einning operator== 2x inní ferd.hpp, lagaði það líka. Síðan skrifaði ég Lista classan og Node struct-ið sem tekur pointer á Ferd.

Inní flugferd.hpp var ferd.hpp includað vitlaust, lagaði það.

Ég skrifaði main og notaði þar test gögnin. Bjó til notendaviðmót sem notar sstream.
### Dæmi um skipanir 

| Skrá | 
| ----------- |
| skrá Batsferd 211 2 10 false | 
| skrá Flugferd 212 10 50 Akureyri | 
| skrá Hjolaferd 213 3 10 4 | 


| Prenta |
| ----------- |
| prenta allt |
| prenta tegund Batsferd |
| prenta tegund Flugferd |
| prenta tegund Hjolaferd |
| prenta akvedin 207 |

| Uppfæra |
| ----------- |
| uppfæra 207 55 |

| Eyða |
| ----------- |
| eyda 207 |

### Video
[![C++ Lokaverkefni](https://i9.ytimg.com/vi/o2idhD3KBVE/mq2.jpg?sqp=CMiS56sG-oaymwEmCMACELQB8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGUgZShlMA8=&rs=AOn4CLCcjZCIZGA-yLZVQGGx2QMnnbq7dw)](https://youtu.be/o2idhD3KBVE "C++ Lokaverkefni")
