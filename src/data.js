export const demo=[
 {id:'a',name:'Lilia',city:'New York',country:'United States',category:'Restaurant',lat:40.7174,lng:-73.9522,address:'567 Union Ave, Brooklyn',notes:'A very good reason to cross the bridge.',saved:true,visited:false,favorite:true,tags:['Date Night'],recommendations:[{person:'Sarah',note:'Get the mafaldini. Make a reservation early.',source:'Text message'},{person:'Emma',note:'One of my favorite pasta places in the city.',source:'Instagram Saves'}]},
 {id:'b',name:'Devoción',city:'New York',country:'United States',category:'Coffee',lat:40.7179,lng:-73.9639,address:'69 Grand St, Brooklyn',notes:'Sunny coffee and a lovely space.',saved:false,visited:true,recommendations:[{person:'Alex',note:'Go in the morning for the light.',source:'Text message'}]},
 {id:'c',name:'Bar Miette',city:'New York',country:'United States',category:'Bar',lat:40.7146,lng:-73.959,address:'Williamsburg, Brooklyn',notes:'A little wine bar for the list.',saved:true,visited:false,tags:['Wine Bar','Date Night'],recommendations:[{person:'Emma',note:'Great date night energy.',source:'Text message'}]},
 {id:'d',name:'Mercado dos Lavradores',city:'Funchal',country:'Portugal',category:'Shopping',lat:32.6493,lng:-16.9039,address:'Funchal, Madeira',notes:'Colorful local market.',saved:false,visited:false,recommendations:[{person:'Travel notes',note:'Pick up local fruit and see the flower stalls.',source:'Notes'}]},
 {id:'e',name:'Kampo by Chef Júlio Pereira',city:'Funchal',country:'Portugal',category:'Restaurant',lat:32.6483,lng:-16.9102,address:'Funchal, Madeira',notes:'Modern Madeiran cooking.',saved:true,visited:false,recommendations:[{person:'Travel notes',note:'Ask about the tasting menu.',source:'Notes'}]},
 {id:'f',name:'The Mill',city:'Lisbon',country:'Portugal',category:'Coffee',lat:38.7112,lng:-9.1487,address:'Rua do Poço dos Negros, Lisbon',notes:'Coffee and breakfast.',saved:false,visited:false,recommendations:[{person:'Maya',note:'Great morning stop.',source:'Google Maps List'}]}
];
export const cats=['All','Restaurant','Coffee','Bar','Bakery','Shopping','Attraction','Hotel','Other'];
export const normalize=s=>(s||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'');
export function mergePlace(list,incoming){
 const target=list.find(p=> (incoming.external_id && p.external_id===incoming.external_id) || (normalize(p.name)===normalize(incoming.name) && normalize(p.city)===normalize(incoming.city) && normalize(p.country)===normalize(incoming.country)) );
 if(!target)return [...list,incoming];
 const recs=[...(target.recommendations||[])];
 (incoming.recommendations||[]).forEach(r=>{if(!recs.some(old=>normalize(old.person)===normalize(r.person)&&normalize(old.note)===normalize(r.note)&&normalize(old.source)===normalize(r.source)))recs.push(r)});
 return list.map(p=>p.id===target.id?{...p,...(p.lat==null&&incoming.lat!=null?{lat:incoming.lat,lng:incoming.lng}:{}),recommendations:recs,tags:[...new Set([...(p.tags||[]),...(incoming.tags||[])])],favorite:!!(p.favorite||incoming.favorite),saved:p.saved||incoming.saved}:p);
}
