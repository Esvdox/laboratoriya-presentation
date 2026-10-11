const dialog=document.createElement('dialog');
dialog.className='node-modal';
dialog.setAttribute('aria-label','Подробная информация об узле');
dialog.innerHTML='<div class="node-modal-bar"><span>ТЕХНОЛОГИЯ · ПРИМЕНЕНИЕ · РЫНОК</span><button aria-label="Закрыть подробности">✕</button></div><div class="neb-detail node-modal-body"></div>';
document.body.append(dialog);
let returnFocus;
dialog.querySelector('button').onclick=()=>dialog.close();
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('node-modal-open');returnFocus?.focus();});
function install(wrap){
 if(wrap.dataset.presentation)return;
 wrap.dataset.presentation='full';
 const source=wrap.querySelector('.neb-detail'),stage=wrap.querySelector('.neb-stage');
 const card=document.createElement('button');card.className='node-preview';card.type='button';stage.append(card);
 function refresh(){
  const title=source.querySelector('h4'),picture=source.querySelector('.neb-node-image');
  if(!title||!picture){card.hidden=true;return;}
  card.hidden=false;
  const description=source.querySelector('.neb-image-note + p');
  card.innerHTML=picture.outerHTML+'<span class="node-preview-copy"><strong>'+title.textContent+'</strong><span>'+(description?.textContent||'')+'</span><b>Подробнее об узле ↗</b></span>';
  card.setAttribute('aria-label','Подробнее: '+title.textContent);
 }
 new MutationObserver(refresh).observe(source,{childList:true});refresh();
 card.onclick=()=>{returnFocus=card;const content=document.createElement('div');content.innerHTML=source.innerHTML;
 const id=source.querySelector('.tech-label')?.textContent.split('/')[0].trim();
 const node=window.LABORATORIYA_TECH_NODES.find(n=>n.id===id);
 const strip=t=>t.slice(t.indexOf(':')+1).trim();
 if(node){
  const proof=[...content.querySelectorAll('h5')].find(h=>h.textContent==='Проверка и первый покупатель');
  for(const [title,value] of [['Что разрабатываем сами',node.develop],['Что закупаем',node.buy]]){
   const section=document.createElement('section');const heading=document.createElement('h5');heading.textContent=title;const text=document.createElement('p');text.textContent=strip(value);section.append(heading,text);if(proof)proof.before(section);else content.append(section);
  }
  const role=content.querySelector('.neb-image-note + p');if(role){const heading=document.createElement('h5');heading.textContent='Роль в аттракционе';role.before(heading);}
 }
 const note=document.createElement('p');note.className='neb-source';note.textContent='Перенос технологии — отдельная разработка под требования промышленного заказчика. Готовность аттракциона не заменяет испытаний нового продукта.';content.append(note);
 const links=document.createElement('p');links.className='node-documents';links.innerHTML='<a href="library/doc-29.pdf" target="_blank" rel="noopener">Исходные схемы А3 ↗</a> · <a href="library/doc-28.docx" download>Технологические карты ↓</a>';content.append(links);
 dialog.querySelector('.node-modal-body').replaceChildren(...content.childNodes);dialog.showModal();dialog.querySelector('.node-modal-body').scrollTop=0;document.body.classList.add('node-modal-open');};
}
function scan(){document.querySelectorAll('.neb-experience').forEach(install);}
new MutationObserver(scan).observe(document.querySelector('#technology-map'),{childList:true});scan();
