(() => {
 const rides=[{id:'Н',name:'Небулаз',image:'nebulaz.jpg',tag:'Поворот и согласованное движение'},{id:'П',name:'Современный паук',image:'spider.jpg',tag:'Подъём и распределённые узлы'},{id:'Д',name:'Маятник Дискавери',image:'discovery.jpg',tag:'Тяжёлый привод и ресурс'}];
 const nodes=window.LABORATORIYA_TECH_NODES;
 const strip=t=>t.slice(t.indexOf(':')+1).trim();
 const escape=t=>t.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
 const box=document.createElement('div');box.id='technology-map';box.className='technology-map';
 document.querySelector('#rides .transfer').replaceWith(box);
 let ride=rides[0],selected=nodes[0];
 box.innerHTML=`<div class="tech-heading"><span class="eyebrow">ОДНА РАЗРАБОТКА — НЕСКОЛЬКО РЫНКОВ</span><h2>Из аттракциона.<br><span>В промышленность.</span></h2><p>Выберите аттракцион и узел. Схема покажет самостоятельный продукт, сферу применения и то, что нужно проверить перед продажей.</p></div><div class="tech-tabs" role="group" aria-label="Аттракционы — доноры технологий">${rides.map(r=>`<button data-tech-ride="${r.id}" aria-pressed="${r.id===ride.id}">${r.name}</button>`).join('')}</div><div class="tech-network"><svg class="tech-lines" aria-hidden="true"></svg><article class="tech-origin"><span class="tech-label">01 / АТТРАКЦИОН</span><img alt=""><h3></h3><p></p><small>Изображение существующего аналога</small></article><div class="tech-node-column"><span class="tech-label">02 / ВЫБЕРИТЕ УЗЕЛ</span><div class="tech-nodes"></div></div><article class="tech-output" aria-live="polite"></article></div>`;
 const net=box.querySelector('.tech-network'),lines=box.querySelector('.tech-lines');
 function draw(){
  if(net.hidden||innerWidth<=760){lines.replaceChildren();return;}
  const r=net.getBoundingClientRect(),origin=box.querySelector('.tech-origin').getBoundingClientRect(),out=box.querySelector('.tech-output').getBoundingClientRect();
  lines.setAttribute('viewBox',`0 0 ${r.width} ${r.height}`);
  const path=(x1,y1,x2,y2)=>`M ${x1} ${y1} C ${(x1+x2)/2} ${y1}, ${(x1+x2)/2} ${y2}, ${x2} ${y2}`;
  lines.innerHTML=[...box.querySelectorAll('[data-tech-node]')].map(b=>{const q=b.getBoundingClientRect(),active=b.dataset.techNode===selected.id;return `<path class="${active?'tech-active':''}" d="${path(origin.right-r.left,origin.top+origin.height/2-r.top,q.left-r.left,q.top+q.height/2-r.top)}"/>${active?`<path class="tech-active" d="${path(q.right-r.left,q.top+q.height/2-r.top,out.left-r.left,out.top+Math.min(out.height/2,150)-r.top)}"/>`:''}`;}).join('');
 }
 function render(focus=false){
  net.hidden=true;
  box.querySelectorAll('[data-tech-ride]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.techRide===ride.id)));
  const image=box.querySelector('.tech-origin img');image.src='assets/'+ride.image;image.alt='Аналог аттракциона '+ride.name;image.onload=draw;
  box.querySelector('.tech-origin h3').textContent=ride.name;box.querySelector('.tech-origin p').textContent=ride.tag;
  box.querySelector('.tech-nodes').innerHTML=nodes.filter(n=>n.id[0]===ride.id).map(n=>`<button data-tech-node="${n.id}" aria-pressed="${n.id===selected.id}"><b>${n.id}</b><span>${escape(n.title)}</span></button>`).join('');
  const parts=strip(selected.product).split('. '),product=parts.shift(),sector=parts.shift();
  box.querySelector('.tech-output').innerHTML=`<span class="tech-label">03 / САМОСТОЯТЕЛЬНЫЙ ПРОДУКТ</span><h3>${escape(product)}</h3><div class="tech-market"><span>СФЕРА ПРИМЕНЕНИЯ</span><h4>${escape(sector||'')}</h4></div><p>${escape(parts.join('. '))}</p><span class="tech-status">Предложение к разработке</span>`;
  if(focus)box.querySelector(`[data-tech-node="${selected.id}"]`).focus({preventScroll:true});
  requestAnimationFrame(draw);
 }
 box.addEventListener('click',e=>{const b=e.target.closest('[data-tech-ride],[data-tech-node]');if(!b)return;if(b.dataset.techRide){ride=rides.find(r=>r.id===b.dataset.techRide);selected=nodes.find(n=>n.id[0]===ride.id);render();}else{selected=nodes.find(n=>n.id===b.dataset.techNode);render(true);}});
 document.querySelectorAll('#rides .donor button').forEach((b,i)=>{b.removeAttribute('data-item');b.dataset.techOpen=rides[i].id;b.textContent='Узлы и сферы применения ↗';b.addEventListener('click',()=>{ride=rides[i];selected=nodes.find(n=>n.id[0]===ride.id);render();box.scrollIntoView({behavior:document.body.classList.contains('motion-paused')?'instant':'smooth',block:'start'});});});
 new ResizeObserver(draw).observe(net);
 new IntersectionObserver(entries=>box.classList.toggle('tech-visible',entries[0].isIntersecting),{threshold:.05}).observe(box);
 render();
})();

