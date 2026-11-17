// MoreThing push worker: sends an empty "tickle" push at saved times. Stores only push address + timestamps (no titles).
const b64u=b=>btoa(String.fromCharCode(...new Uint8Array(b))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const enc=s=>new TextEncoder().encode(s);
export async function keys(env){let j=await env.KV.get('vapid','json');if(!j){const k=await crypto.subtle.generateKey({name:'ECDSA',namedCurve:'P-256'},true,['sign','verify']);j={priv:await crypto.subtle.exportKey('jwk',k.privateKey),pub:b64u(await crypto.subtle.exportKey('raw',k.publicKey))};await env.KV.put('vapid',JSON.stringify(j))}return j}
export async function jwt(env,aud){const j=await keys(env),h=b64u(enc(JSON.stringify({typ:'JWT',alg:'ES256'}))),p=b64u(enc(JSON.stringify({aud,exp:Math.floor(Date.now()/1e3)+43200,sub:'mailto:velvetloom2@gmail.com'}))),k=await crypto.subtle.importKey('jwk',j.priv,{name:'ECDSA',namedCurve:'P-256'},false,['sign']);return h+'.'+p+'.'+b64u(await crypto.subtle.sign({name:'ECDSA',hash:'SHA-256'},k,enc(h+'.'+p)))}
async function push(env,sub){const u=new URL(sub.endpoint),j=await keys(env),r=await fetch(sub.endpoint,{method:'POST',headers:{TTL:'86400',Urgency:'high',Authorization:'vapid t='+await jwt(env,u.origin)+', k='+j.pub}});return r.status}
export async function run(env){const now=Date.now();let cur;do{const l=await env.KV.list({prefix:'s:',cursor:cur});for(const k of l.keys){const v=await env.KV.get(k.name,'json');if(!v)continue;const due=v.times.filter(t=>t<=now);if(!due.length)continue;const fresh=due.some(t=>now-t<6*3600e3),rest=v.times.filter(t=>t>now);if(fresh){const st=await push(env,v.sub);if(st==404||st==410){await env.KV.delete(k.name);continue}}await env.KV.put(k.name,JSON.stringify({sub:v.sub,times:rest}),{expirationTtl:7776000})}cur=l.list_complete?null:l.cursor}while(cur)}
export default{
async fetch(req,env){const u=new URL(req.url);
 if(u.pathname=='/api/key')return new Response((await keys(env)).pub,{headers:{'content-type':'text/plain','cache-control':'no-store'}});
 if(req.method=='POST'&&(u.pathname=='/api/subscribe'||u.pathname=='/api/unsubscribe')){let d;try{d=await req.json()}catch(e){return new Response('bad',{status:400})}
  if(!d.sub||typeof d.sub.endpoint!='string'||!d.sub.endpoint.startsWith('https://'))return new Response('bad',{status:400});
  const id='s:'+b64u(await crypto.subtle.digest('SHA-256',enc(d.sub.endpoint)));
  if(u.pathname=='/api/unsubscribe'){await env.KV.delete(id);return new Response('ok')}
  if(!Array.isArray(d.times))return new Response('bad',{status:400});
  await env.KV.put(id,JSON.stringify({sub:d.sub,times:d.times.map(Number).filter(Number.isFinite).slice(0,300)}),{expirationTtl:7776000});return new Response('ok')}
 return new Response('Not found',{status:404})},
async scheduled(ev,env,ctx){ctx.waitUntil(run(env))}};
