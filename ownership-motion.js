(()=>{
const root=document.querySelector('#decisions .ownership');if(!root)return;
const list=root.querySelector('.responsibility-list');if(!list)return;
const names=['Продажи','Продукты','Конструкторы','Проекты','Продвижение','Экономика'];
const paths=['M5 17l5-5 4 3 6-9M15 6h5v5','M5 7l7-4 7 4v10l-7 4-7-4zM5 7l7 4 7-4M12 11v10','M4 18L18 4l3 3L7 21H4zM13 9l3 3M4 4l5 5M16 16l5 5','M5 5h14v16H5zM9 3v4M15 3v4M8 12h8M8 16h5','M4 10v5h4l10 5V5L8 10zM8 15l2 6M21 10v5','M4 20h17M7 16v-5M12 16V7M17 16V3'];
const items=[...list.children];
const scene=document.createElement('div');scene.className='mandate-scene';scene.id='mandate-scene';
scene.innerHTML='<div class="mandate-glow" aria-hidden="true"></div><svg class="mandate-links" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">'+[[180,100],[500,65],[820,100],[180,490],[500,535],[820,490]].map(([x,y])=>`<path d="M500 300 Q${x} 300 ${x} ${y}"/>`).join('')+'</svg><div class="mandate-core"><span>ЕДИНЫЙ ЦЕНТР УПРАВЛЕНИЯ</span><strong>Задаю направление.<br>Соединяю команды.</strong><small>Приоритеты · решения · результат</small></div>';
items.forEach((item,i)=>{const node=document.createElement('details');node.className='mandate-node node-'+i;node.innerHTML=`<summary><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[i]}"/></svg><span>${names[i]}</span><em>+</em></summary><p>${item.textContent}</p>`;node.addEventListener('toggle',()=>{if(node.open)scene.querySelectorAll('details').forEach(other=>{if(other!==node)other.open=false})});scene.append(node)});
list.replaceWith(scene);
root.querySelectorAll('.role-card').forEach(card=>{const details=document.createElement('details');details.className='role-card role-disclosure';const title=card.querySelector('h4');details.innerHTML='<summary>'+title.textContent+'<span>+</span></summary>'+card.querySelector('p').outerHTML;card.replaceWith(details)});
const targets=[root.querySelector('.mandate-hero'),scene,...root.querySelectorAll('.role-card')];
if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver'in window){targets.forEach(el=>el.classList.add('motion-ready'));const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('motion-visible');observer.unobserve(entry.target)}}),{threshold:.12});targets.forEach(el=>observer.observe(el))}
})();
