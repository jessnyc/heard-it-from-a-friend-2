import {createClient} from '@supabase/supabase-js';
// Vercel function. OPENAI_API_KEY must be server-side only.
export default async function handler(req,res){
 if(req.method!=='POST')return res.status(405).json({error:'POST only'});
 if(!process.env.OPENAI_API_KEY)return res.status(503).json({error:'AI import is not configured yet. Add OPENAI_API_KEY in Vercel.'});
 try{
  const token=(req.headers.authorization||'').replace(/^Bearer /i,'');
  if(!token || !process.env.VITE_SUPABASE_URL || !process.env.VITE_SUPABASE_ANON_KEY)return res.status(401).json({error:'Sign in to an invited account to use AI import.'});
  const authClient=createClient(process.env.VITE_SUPABASE_URL,process.env.VITE_SUPABASE_ANON_KEY);
  const {data:{user},error:authError}=await authClient.auth.getUser(token);
  if(authError||!user)return res.status(401).json({error:'Your session has expired. Please sign in again.'});
  const {text='',images=[],files=[],source='Upload',person='Me',cityHint=''}=req.body||{};
  if(text.length>75000 || images.length+files.length>6)return res.status(400).json({error:'Too much content in one batch. Try up to 6 images/files.'});
  const content=[{type:'input_text',text:`Extract place recommendations from the user's material. Source: ${source}. Attribution: ${person||'Me'}. Location hint: ${cityHint||'not supplied'}. Do not invent addresses, cities, countries or coordinates. Return JSON ONLY: {"places":[{"name":"...","city":"...","country":"...","category":"Restaurant|Coffee|Bar|Bakery|Shopping|Attraction|Hotel|Other","address":"...","note":"short, preserving exact personal remarks where feasible"}]}. Ignore non-place names, deduplicate mentions within batch, maximum 80 places. Extract from this text:\n${text}` }];
  for(const s of images){if(!/^data:image\/(png|jpeg|webp);base64,/.test(s)||s.length>10500000) return res.status(400).json({error:'Unsupported or oversize image'});content.push({type:'input_image',image_url:s})}
  for(const f of files){if(f?.mime!=='application/pdf'||!/^data:application\/pdf;base64,/.test(f.data)||f.data.length>10500000)return res.status(400).json({error:'Only PDFs supported in document extraction'});content.push({type:'input_file',filename:f.name||'document.pdf',file_data:f.data})}
  const resp=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:'gpt-4.1-mini',input:[{role:'user',content}],text:{format:{type:'json_object'}},max_output_tokens:6500})});
  const raw=await resp.json();if(!resp.ok)throw new Error(raw.error?.message||'Extraction failed');
  const out=raw.output?.flatMap(o=>o.content||[]).filter(c=>c.type==='output_text').map(c=>c.text).join('')||'{}';
  const obj=JSON.parse(out);return res.status(200).json({places:Array.isArray(obj.places)?obj.places.slice(0,80):[]});
 }catch(e){return res.status(500).json({error:e.message||'Extraction failed'})}
}
