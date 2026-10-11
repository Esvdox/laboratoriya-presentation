const toggle=document.querySelector('.menu-toggle'),menu=document.querySelector('#site-nav');
function closeMenu(){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');}
toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
menu.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
document.addEventListener('click',e=>{if(!e.target.closest('aside'))closeMenu();});
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target);}}),{threshold:.06});
document.querySelectorAll('.sectionhead,.phase,.card,.donor,.strategy,.rhythm,.portfolio-levels').forEach(e=>{e.classList.add('reveal');revealObserver.observe(e);});
const progress=document.createElement('div');progress.className='progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
let queued=false;const hero=document.querySelector('.engineering-stage'),material=document.querySelector('.engineering .material');
function updateMotion(){const y=scrollY,total=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${total>0?Math.min(1,y/total):0})`;if(!reduced.matches&&hero.getBoundingClientRect().bottom>0){const r=hero.getBoundingClientRect(),amount=Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight+r.height*.25)));material.style.clipPath=`inset(0 0 0 ${100-amount*100}%)`;}queued=false;}
addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(updateMotion);}},{passive:true});updateMotion();
const sceneCaption=document.createElement('div');sceneCaption.className='motion-caption';sceneCaption.innerHTML='Сначала — инженерная мысль.<span>ПРОКРУТИТЕ, ЧТОБЫ УВИДЕТЬ ПРЕВРАЩЕНИЕ</span>';hero.append(sceneCaption);
const motionControl=document.createElement('button');motionControl.className='motion-control';motionControl.type='button';motionControl.textContent='Остановить анимацию';motionControl.setAttribute('aria-pressed','false');document.body.append(motionControl);
let paused=reduced.matches;const figure=document.querySelector('.engineering'),donors=[...document.querySelectorAll('.donor')],phaseLinks=[...document.querySelectorAll('.day-steps a')],number=document.querySelector('.hundred-number');
function applyMotionState(){document.body.classList.toggle('motion-paused',paused);motionControl.textContent=paused?'Включить анимацию':'Остановить анимацию';motionControl.setAttribute('aria-pressed',String(paused));updateMotion();}
 motionControl.addEventListener('click',()=>{paused=!paused;applyMotionState();});reduced.addEventListener('change',()=>{paused=reduced.matches;applyMotionState();});
const clamp=n=>Math.max(0,Math.min(1,n));
const baseMotion=updateMotion;
updateMotion=function(){baseMotion();if(paused)return;const f=figure.getBoundingClientRect(),distance=Math.max(1,figure.offsetHeight-hero.offsetHeight),p=clamp((100-f.top)/distance);material.style.clipPath="none";material.style.opacity=String(p);hero.querySelector(".blueprint").style.opacity=String(1-p);material.style.transform="none";sceneCaption.innerHTML=p<.35?'Сначала — инженерная мысль.<span>ОБЩАЯ КОНСТРУКТОРСКАЯ БАЗА</span>':p<.75?'Технология обретает форму.<span>УЗЛЫ · ПРИВОДЫ · УПРАВЛЕНИЕ</span>':'Из одной базы — новые продукты.<span>ПЕРЕЙДЁМ К ПРОГРАММЕ ДЕЙСТВИЙ</span>';donors.forEach(d=>{const r=d.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){const q=clamp((innerHeight-r.top)/(innerHeight+r.height));d.querySelector('img').style.transform=`scale(${1.08-q*.08})`;}});const scene=document.querySelector('.product-scene'),s=scene.getBoundingClientRect();if(s.top<innerHeight&&s.bottom>0)scene.querySelector('img').style.transform=`translateY(${(clamp((innerHeight-s.top)/(innerHeight+s.height))-.5)*22}px)`;};
const phaseObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)phaseLinks.forEach(a=>a.classList.toggle('current',a.hash==='#'+e.target.id));});},{rootMargin:'-15% 0px -50% 0px'});document.querySelectorAll('.phase').forEach(p=>phaseObserver.observe(p));
let countFrame=0,countStarted=false;
function stopCount(){cancelAnimationFrame(countFrame);countFrame=0;}
function startCount(){
  stopCount();
  if(paused){number.textContent='100';return;}
  number.textContent='0';
  const start=performance.now();
  function count(now){
    if(paused){number.textContent='100';countFrame=0;return;}
    const p=clamp((now-start)/1300);
    number.textContent=String(Math.round(100*(1-Math.pow(1-p,3))));
    countFrame=p<1?requestAnimationFrame(count):0;
  }
  countFrame=requestAnimationFrame(count);
}
new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting){
      stopCount();countStarted=false;number.textContent=paused?'100':'0';
    }else if(e.intersectionRatio>=.5&&!countStarted){
      countStarted=true;startCount();
    }
  });
},{threshold:[0,.5]}).observe(number);
applyMotionState();
// Track only the nine navigation destinations, including their nested content.
const navigationLinks=[...menu.querySelectorAll('a')];
const navigationSections=navigationLinks.map(a=>document.querySelector(a.hash));
let navigationQueued=false;
function updateNavigation(){
 navigationQueued=false;
 const line=Math.min(innerHeight*.3,220);
 let active=0;
 navigationSections.forEach((section,i)=>{if(section&&section.getBoundingClientRect().top<=line)active=i;});
 if(scrollY+innerHeight>=document.documentElement.scrollHeight-3)active=navigationLinks.length-1;
 navigationLinks.forEach((link,i)=>{link.classList.toggle('active',i===active);if(i===active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
}
addEventListener('scroll',()=>{if(!navigationQueued){navigationQueued=true;requestAnimationFrame(updateNavigation);}},{passive:true});
addEventListener('resize',updateNavigation);addEventListener('load',updateNavigation);updateNavigation();
