const body=document.body;
const glow=document.querySelector('.cursor-glow');
const layers=[...document.querySelectorAll('[data-depth]')];
const canHover=window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if(canHover){body.classList.add('pointer-active');window.addEventListener('pointermove',(event)=>{const x=event.clientX,y=event.clientY;glow.style.left=`${x}px`;glow.style.top=`${y}px`;const ox=(x-window.innerWidth/2)/(window.innerWidth/2);const oy=(y-window.innerHeight/2)/(window.innerHeight/2);layers.forEach((layer)=>{const d=Number(layer.dataset.depth||0);layer.style.transform=`translate(${ox*d*42}px, ${oy*d*24}px)`})});window.addEventListener('pointerleave',()=>layers.forEach((layer)=>layer.style.transform=''))}
document.querySelectorAll('a[href^="#"]').forEach((link)=>link.addEventListener('click',(event)=>{const target=document.querySelector(link.getAttribute('href'));if(!target)return;event.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'})}));
const form=document.querySelector('#forest-form');const status=document.querySelector('.form-status');form.addEventListener('submit',(event)=>{event.preventDefault();const name=form.elements.name.value.trim();status.textContent=name?`A tiny signal from ${name} is glowing in the forest. The real mailbox will open soon.`:'A tiny signal is glowing in the forest. The real mailbox will open soon.';form.reset()});
document.querySelector('#year').textContent=new Date().getFullYear();
