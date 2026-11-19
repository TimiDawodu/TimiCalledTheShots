'use strict';
// Add verified portfolio media here when supplied. Artwork is illustrative.
const collections = [
  {id:'cinematography',name:'Timi Called the Shots',title:'TIMI CALLED<br>THE SHOTS',type:'video',craft:'Cinematography',image:'hero',description:'General cinematography and short-form visual stories. Intentional light, composition and movement, shaped around the story.',video:null},
  {id:'direction',name:'Director Durotimi',title:'DIRECTOR<br>DUROTIMI',type:'video',craft:'Music video direction',image:'directing',description:'Music video direction for artists with something to say. A visual world built around the music, from concept through the final frame.',video:null},
  {id:'films',name:'Timi Dawodu Films',title:'TIMI DAWODU<br>FILMS',type:'video',craft:'Narrative & documentary',image:'film',description:'The home for narrative films, documentaries and longer-form cinematic storytelling under Timi’s directorial vision.',video:null},
  {id:'photography',name:'Timagery',title:'TIMAGERY',type:'photo',craft:'Photography',image:'photo',description:'Portraits, editorial and artist imagery. Photography built on the belief that a great image tells the story before a single word is read.',video:null},
  {id:'editing',name:'Timi That Edits',title:'TIMI THAT<br>EDITS',type:'video',craft:'Editing & post-production',image:'edit',description:'The craft of shaping footage into feeling. Editing, rhythm and finishing that give a story its final form.',video:null},
  {id:'mobile',name:'Content By Durotimi',title:'CONTENT BY<br>DUROTIMI',type:'video',craft:'Mobile & social content',image:'mobile',description:'Mobile and social-first event content, built for the way people watch on their phones.',video:null}
];
const rail=document.querySelector('#collectionRail');
const dialog=document.querySelector('#projectDialog');
const content=document.querySelector('#dialogContent');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let lastTrigger=null;
function render(filter='all'){
  rail.innerHTML=collections.filter(c=>filter==='all'||c.type===filter).map(c=>`<button class="collection-card" data-id="${c.id}" aria-label="Explore ${c.name}, ${c.craft}"><div class="card-art"><img src="assets/${c.image}.jpg" alt="" loading="lazy"><span class="card-no">0${collections.indexOf(c)+1} / COLLECTION</span><span class="card-kind">${c.type==='photo'?'STILLS':'MOTION'}</span><div class="card-title"><small>THE SHORTS PRESENTS</small>${c.title}</div></div><div class="card-info"><span>${c.craft}</span><span aria-hidden="true">${c.type==='photo'?'↗':'▶'}</span></div></button>`).join('');
  rail.scrollLeft=0;updateArrows();
}
function updateArrows(){document.querySelector('#prev').disabled=rail.scrollLeft<4;document.querySelector('#next').disabled=rail.scrollLeft+rail.clientWidth>=rail.scrollWidth-4;}
rail.addEventListener('scroll',updateArrows,{passive:true});window.addEventListener('resize',updateArrows);
document.querySelector('#prev').addEventListener('click',()=>rail.scrollBy({left:-rail.clientWidth*.8,behavior:reduced.matches?'instant':'smooth'}));
document.querySelector('#next').addEventListener('click',()=>rail.scrollBy({left:rail.clientWidth*.8,behavior:reduced.matches?'instant':'smooth'}));
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',String(x===b))});render(b.dataset.filter)}));
function openCollection(id,trigger){
 const c=collections.find(x=>x.id===id);if(!c)return;
 lastTrigger=trigger;
 const media=c.type==='photo'?`<div class="gallery"><figure><img src="assets/photo.jpg" alt="Illustrative portrait for photography gallery preview"><figcaption>PORTRAIT · STOCK GALLERY PREVIEW</figcaption></figure><figure><img src="assets/hero.jpg" alt="Illustrative mountain landscape for gallery preview"><figcaption>LANDSCAPE · STOCK GALLERY PREVIEW</figcaption></figure></div><div class="coming-soon"><h3>Still stories.</h3><p>Timagery is a photography collection. These images demonstrate the gallery layout; Timi’s own photographs will replace them.</p></div>`:c.video?`<video controls playsinline preload="metadata" poster="assets/${c.image}.jpg" src="${c.video}"></video>`:`<div class="coming-soon"><h3>The collection is being curated.</h3><p>Films will appear here once uploaded. This artwork previews the collection’s visual presentation.</p></div>`;
 content.innerHTML=`<div class="dialog-art"><img src="assets/${c.image}.jpg" alt="Illustrative collection artwork"><h2 id="dialogTitle">${c.title}</h2></div><div class="dialog-body"><div class="dialog-tags">${c.craft.toUpperCase()} · ${c.type==='photo'?'STILL IMAGES':'MOTION PICTURE'}</div><p>${c.description}</p>${media}<a class="button light" href="tel:+2348092323235">${c.type==='photo'?'Book a photo session':'Discuss a project'} <span>↗</span></a><p class="dialog-footnote">Call +234 809 232 3235 · Availability and scope confirmed by phone.</p></div>`;
 if(!dialog.open)dialog.showModal();dialog.scrollTop=0;
}
rail.addEventListener('click',e=>{const b=e.target.closest('[data-id]');if(b)openCollection(b.dataset.id,b)});
document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
dialog.addEventListener('close',()=>{const v=dialog.querySelector('video');if(v)v.pause();lastTrigger?.focus()});
const serviceIds=['cinematography','direction','photography','editing'];
document.querySelectorAll('[data-service]').forEach(b=>b.addEventListener('click',()=>openCollection(serviceIds[Number(b.dataset.service)],b)));
const scenes=['hero','directing','film'];let sceneTimeout;
document.querySelectorAll('[data-scene]').forEach(b=>b.addEventListener('click',()=>{
 document.querySelectorAll('[data-scene]').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',String(x===b))});
 const image=document.querySelector('#heroImage');clearTimeout(sceneTimeout);
 if(reduced.matches){image.style.backgroundImage=`url('assets/${scenes[Number(b.dataset.scene)]}.jpg')`;return}
 image.style.opacity='.3';sceneTimeout=setTimeout(()=>{image.style.backgroundImage=`url('assets/${scenes[Number(b.dataset.scene)]}.jpg')`;image.style.opacity='1'},180);
}));
const menu=document.querySelector('.menu-toggle');menu.addEventListener('click',()=>{const open=document.querySelector('#nav').classList.toggle('mobile-nav-open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');menu.textContent=open?'✕':'☰'});
document.querySelectorAll('.nav nav a').forEach(a=>a.addEventListener('click',()=>{document.querySelector('#nav').classList.remove('mobile-nav-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');menu.textContent='☰'}));
document.querySelector('#year').textContent=new Date().getFullYear();render();
