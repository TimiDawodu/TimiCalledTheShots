'use strict';
// Add verified portfolio media here when supplied. Artwork is illustrative.
const collections = [
  {id:'cinematography',name:'Timi Called The Shots',title:'TIMI CALLED<br>THE SHOTS',type:'video',craft:'Cinematography',image:'cinematography-video',description:'General cinematography and short-form visual stories. Intentional light, composition and movement, shaped around the story.',video:{"provider": "vimeo", "id": "1248496671", "previewStart": 0.1, "previewEnd": 824, "title": "Timeline 1", "url": "https://vimeo.com/1248496671"}},
  {id:'direction',name:'Director Durotimi',title:'DIRECTOR<br>DUROTIMI',type:'video',craft:'Music video direction',image:'direction-video',description:'Music video direction for artists with something to say. A visual world built around the music, from concept through the final frame.',video:{provider:'vimeo',id:'1248392519',previewStart:0.1,previewEnd:60,title:'ads',url:'https://vimeo.com/1248392519'}},
  {id:'films',name:'Timi Dawodu Films',title:'TIMI DAWODU<br>FILMS',type:'video',craft:'Narrative & documentary',image:'films-video',description:'The home for narrative films, documentaries and longer-form cinematic storytelling under Timi’s directorial vision.',video:{provider:'vimeo',id:'1248401212',previewZoom:1.4,previewStart:0.1,previewEnd:65,title:'123',url:'https://vimeo.com/1248401212'}},
  {id:'photography',name:'Timagery',title:'TIMAGERY',type:'photo',craft:'Photography',image:'photo',description:'Portraits, editorial and artist imagery. Photography built on the belief that a great image tells the story before a single word is read.',video:null},
  {id:'editing',name:'Timi That Edits',title:'TIMI THAT<br>EDITS',type:'video',craft:'Editing & post-production',image:'editing-video',description:'The craft of shaping footage into feeling. Editing, rhythm and finishing that give a story its final form.',video:{"provider": "vimeo", "id": "1248401213", "previewStart": 0.1, "previewEnd": 26, "title": "13880890_1920_1080_25fps", "url": "https://vimeo.com/1248401213"}},
  {id:'mobile',name:'Content By Durotimi',title:'CONTENT BY<br>DUROTIMI',type:'video',craft:'Mobile & social content',image:'mobile',description:'Mobile and social-first event content, built for the way people watch on their phones.',video:null}
];
const imageCredits={"hero": {"label": "Moonlight · Barry Jenkins · A24", "url": "https://a24films.com/films/moonlight", "kind": "FILM REFERENCE"}, "directing": {"label": "Waves · Trey Edward Shults · A24", "url": "https://a24films.com/films/waves", "kind": "FILM REFERENCE"}, "film": {"label": "The Green Knight · David Lowery · A24", "url": "https://a24films.com/films/the-green-knight", "kind": "FILM REFERENCE"}, "edit": {"label": "The Last Black Man in San Francisco · Joe Talbot · A24", "url": "https://a24films.com/films/the-last-black-man-in-san-francisco", "kind": "FILM REFERENCE"}, "photo": {"label": "Stephen Tettey Atsu · Tema, Ghana · Unsplash", "url": "https://unsplash.com/photos/a-woman-with-braids-and-a-white-shirt-rltN2NMmAdI", "kind": "PHOTO REFERENCE"}, "mobile": {"label": "Stephen Tettey Atsu · Tema, Ghana · Unsplash", "url": "https://unsplash.com/photos/a-woman-wearing-a-colorful-dress-and-a-head-scarf-3YrGQ9W2sh0", "kind": "PHOTO REFERENCE"}};
imageCredits['direction-video']={label:'ads · Oluwadurotimi Dawodu · Vimeo',url:'https://vimeo.com/1248392519',kind:'FEATURED VIDEO'};
imageCredits['films-video']={label:'123 · Oluwadurotimi Dawodu · Vimeo',url:'https://vimeo.com/1248401212',kind:'FEATURED VIDEO'};
imageCredits['editing-video']={"label": "13880890_1920_1080_25fps \u00b7 Oluwadurotimi Dawodu \u00b7 Vimeo", "url": "https://vimeo.com/1248401213", "kind": "FEATURED VIDEO"};
imageCredits['cinematography-video']={"label": "Timeline 1 \u00b7 Oluwadurotimi Dawodu \u00b7 Vimeo", "url": "https://vimeo.com/1248496671", "kind": "FEATURED VIDEO"};
const rail=document.querySelector('#collectionRail');
const dialog=document.querySelector('#projectDialog');
const content=document.querySelector('#dialogContent');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let lastTrigger=null;
function render(filter='all'){
  VideoPreviews.clear(rail);
  rail.innerHTML=collections.filter(c=>filter==='all'||c.type===filter).map(c=>`<article class="collection-card" style="--preview-zoom:${c.video?.previewZoom??1}"><div class="card-art"><img src="assets/${c.image}.jpg" alt="" loading="lazy">${c.video?VideoPreviews.markup(c.video,'card-preview'):''}<button class="collection-select" data-id="${c.id}" aria-label="${c.video?'Watch '+c.video.title+' — ': 'Explore '}${c.name}, ${c.craft}"></button><span class="card-no">0${collections.indexOf(c)+1} / COLLECTION</span><span class="card-kind">${imageCredits[c.image].kind}</span><div class="card-title"><small>TIMI CALLED THE SHOTS</small>${c.title}</div></div><div class="card-info"><span>${c.craft}</span><button class="collection-open" data-id="${c.id}" aria-label="Open ${c.name}">${c.type==='photo'?'↗':'▶'}</button></div>${c.video?'<button class="preview-toggle" aria-pressed="false">Pause preview</button>':''}</article>`).join('');
  VideoPreviews.mount(rail);
}

document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',String(x===b))});render(b.dataset.filter)}));
function openCollection(id,trigger){
 const c=collections.find(x=>x.id===id);if(!c)return;
 lastTrigger=trigger;
 VideoPreviews.suspend(true);
 const media=c.type==='photo'?`<div class="gallery"><figure><img src="assets/photo.jpg" alt="Portrait of a braided woman photographed by Stephen Tettey Atsu in Tema, Ghana"><figcaption>PORTRAIT · TEMA, GHANA · REFERENCE</figcaption></figure><figure><img src="assets/gallery.jpg" alt="Ghanaian editorial portrait by Stephen Tettey Atsu"><figcaption>EDITORIAL · TEMA, GHANA · REFERENCE</figcaption></figure></div><div class="coming-soon"><h3>Still stories.</h3><p>Timagery is a photography collection. Reference portraits by Stephen Tettey Atsu in Tema, Ghana. Timi’s own photographs will replace these references.</p></div>`:c.video?`<div class="vimeo-player"><iframe src="https://player.vimeo.com/video/${c.video.id}?autoplay=1&muted=1&playsinline=1&dnt=1" title="${c.video.title} — ${c.name}" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen></iframe></div><p class="player-note">Starts muted. Use the player controls for sound and fullscreen. <a href="${c.video.url}" target="_blank" rel="noopener noreferrer">Watch on Vimeo ↗</a></p>`:`<div class="coming-soon"><h3>The collection is being curated.</h3><p>Films will appear here once uploaded. The film imagery shown here is a visual reference, not a Timi production.</p></div>`;
 content.innerHTML=`<div class="dialog-art"><img src="assets/${c.image}.jpg" alt="Illustrative collection artwork"><h2 id="dialogTitle">${c.title}</h2></div><div class="dialog-body"><div class="dialog-tags">${c.craft.toUpperCase()} · ${c.type==='photo'?'STILL IMAGES':'MOTION PICTURE'}</div><p>${c.description}</p>${media}<a class="button light" href="tel:+2348092323235">${c.type==='photo'?'Book a photo session':'Discuss a project'} <span>↗</span></a><p class="image-credit">${c.video?'Featured video: ':'Reference image: '}<a href="${imageCredits[c.image].url}" target="_blank" rel="noopener noreferrer">${imageCredits[c.image].label} ↗</a>${c.video?'.':'. Not portfolio work by Timi.'}</p><p class="dialog-footnote">Call +234 809 232 3235 · Availability and scope confirmed by phone.</p></div>`;
 if(!dialog.open)dialog.showModal();dialog.scrollTop=0;
}
rail.addEventListener('click',e=>{const b=e.target.closest('[data-id]');if(b)openCollection(b.dataset.id,b)});
document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
dialog.addEventListener('close',()=>{content.querySelectorAll('iframe').forEach(f=>f.remove());VideoPreviews.suspend(false);lastTrigger?.focus()});
const serviceIds=['cinematography','direction','photography','editing'];
document.querySelectorAll('[data-service]').forEach(b=>b.addEventListener('click',()=>openCollection(serviceIds[Number(b.dataset.service)],b)));
let currentScene=1;
let sceneTimeout;
const heroThumbs=document.querySelector('#heroThumbnails');
heroThumbs.innerHTML=collections.map((c,i)=>`<button data-scene="${i}" class="hero-thumb ${i===0?'selected':''}" aria-pressed="${i===0}" aria-label="Feature ${c.name}"><img src="assets/${c.image}.jpg" alt=""><span>${String(i+1).padStart(2,'0')}</span></button>`).join('');
function selectScene(index,initial=false){
 currentScene=index;
 const c=collections[index];
 heroThumbs.querySelectorAll('button').forEach((b,i)=>{b.classList.toggle('selected',i===index);b.setAttribute('aria-pressed',String(i===index))});
 const image=document.querySelector('#heroImage'),copy=document.querySelector('#heroContent');
 clearTimeout(sceneTimeout);document.querySelector('#heroPreviewToggle').hidden=!c.video;
 const update=()=>{image.style.backgroundImage=`url('assets/${c.image}.jpg')`;document.querySelector('#heroTitle').innerHTML=c.title;document.querySelector('#heroKicker').textContent=c.craft;document.querySelector('#heroDescription').textContent=c.description;document.querySelector('.preview-label').textContent=imageCredits[c.image].kind+' · '+imageCredits[c.image].label;image.style.opacity='1';copy.style.opacity='1';document.querySelector('#heroOpen').innerHTML=(c.video?'WATCH VIDEO':'EXPLORE COLLECTION')+' <span class="play-icon">▶</span>';document.querySelectorAll('[data-hero-video]').forEach(slide=>slide.classList.toggle('is-active',slide.dataset.heroVideo===c.id));document.querySelector('.hero').classList.toggle('hero-film-crop',c.id==='films');VideoPreviews.activateHero(c.id);};
 if(reduced.matches||initial){update();return}
 image.style.opacity='.25';copy.style.opacity='0';sceneTimeout=setTimeout(update,200);
}
heroThumbs.addEventListener('click',e=>{const b=e.target.closest('[data-scene]');if(b)selectScene(Number(b.dataset.scene))});
heroThumbs.addEventListener('keydown',e=>{if(!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();let i=currentScene;if(e.key==='Home')i=0;else if(e.key==='End')i=collections.length-1;else i=(i+(['ArrowDown','ArrowRight'].includes(e.key)?1:-1)+collections.length)%collections.length;selectScene(i);heroThumbs.querySelectorAll('button')[i].focus()});
document.querySelector('#heroOpen').addEventListener('click',e=>openCollection(collections[currentScene].id,e.currentTarget));
const menu=document.querySelector('.menu-toggle');menu.addEventListener('click',()=>{const open=document.querySelector('#nav').classList.toggle('mobile-nav-open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');menu.textContent=open?'✕':'☰'});
document.querySelectorAll('.nav nav a').forEach(a=>a.addEventListener('click',()=>{document.querySelector('#nav').classList.remove('mobile-nav-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');menu.textContent='☰'}));
document.querySelector('#year').textContent=new Date().getFullYear();render();VideoPreviews.mount(document.querySelector('.hero'));selectScene(1,true);
