(async function(){
try {
 const names=['homepage','music','stories','books','about','contact'];
 const pairs=await Promise.all(names.map(async n=>{const r=await fetch('content/'+n+'.json',{cache:'no-store'});if(!r.ok)throw Error(n);return [n,await r.json()]}));
 const content=Object.fromEntries(pairs);
 const all={...content.homepage};for(const n of names.slice(1))Object.assign(all,content[n]);
 document.querySelectorAll('[data-content]').forEach(el=>{
  const key=el.dataset.content;if(typeof all[key]!=='string')return;
  const val=all[key];
  // Preserve designed line breaks and italics for unchanged headings
  if(el.tagName==='H1'||el.tagName==='H2'||el.tagName==='H3'){
    if(el.textContent.replace(/\s+/g,' ').trim()===val.replace(/\s+/g,' ').trim())return;
  }
  el.textContent=val;
 });
 for(const n of ['stories','books']){
  const grid=document.querySelector('#'+n+' .grid');if(!grid)continue;
  const templates=[...grid.querySelectorAll('.tile')];
  (content[n].items||[]).forEach((item,i)=>{
   const card=templates[i]||(templates[templates.length-1]&&templates[templates.length-1].cloneNode(true));if(!card)return;
   for(const k of ['category','title','description','status']){const el=card.querySelector('[data-card-field="'+k+'"]');if(el&&typeof item[k]==='string')el.textContent=item[k];}
   if(i>=templates.length)grid.append(card);
  });
  templates.slice((content[n].items||[]).length).forEach(el=>el.remove());
 }
 const image=content.homepage.hero_image;
 if(image && image!=='underground-tree.webp'){
  const safe=String(image).replace(/["'()\\]/g,'');
  document.documentElement.style.setProperty('--cms-hero-image','url("'+safe+'")');
 }
}catch(e){console.warn('Showing built-in website content:',e.message)}
})();