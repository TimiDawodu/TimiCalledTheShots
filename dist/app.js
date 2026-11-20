'use strict';
// Add verified portfolio media here when supplied. Artwork is illustrative.
const collections = [
  {id:'cinematography',name:'Timi Called the Shots',title:'TIMI CALLED<br>THE SHOTS',type:'video',craft:'Cinematography & Video Production',image:'cinematography-video',description:'I film video podcasts, interviews, documentaries, short films, commercials, brand campaigns, live performances and behind-the-scenes content. I can come in as a camera operator or lead the cinematography for the shoot.',action:'View Cinematography Work',video:{"provider": "vimeo", "id": "1248496671", "quality": "1080p", "loop": true, "previewStart": 0.1, "previewEnd": 824, "title": "Timeline 1", "url": "https://vimeo.com/1248496671"}},
  {id:'direction',name:'Timi That Directs',title:'TIMI THAT<br>DIRECTS',type:'video',craft:'Music Video Direction',image:'direction-video',description:'I direct music videos. Send me the track and tell me where you want to take it. I’ll build the treatment, work through the look and bring it to set. We can go raw, polished or somewhere in between, as long as it feels like you.',action:'View Direction Work',video:{provider:'vimeo',id:'1248392519',quality:'1080p',previewStart:0.1,previewEnd:60,title:'ads',url:'https://vimeo.com/1248392519'}},
  {id:'films',name:'Timi That Also Films',title:'TIMI THAT<br>ALSO FILMS',type:'video',craft:'Film & Documentary',image:'films-video',description:'I make short films and documentaries. I like getting close to a story, finding the details that make it feel real and giving them room on screen.',action:'Explore Films',video:{provider:'vimeo',id:'1248401212',previewZoom:1.4,previewStart:0.1,previewEnd:65,title:'123',url:'https://vimeo.com/1248401212'}},
  {id:'photography',name:'Timagery',title:'TIMAGERY',type:'photo',craft:'Photography',image:'timagery',description:'I capture moments I’d want to keep. A good portrait should feel like you.',action:'View Photography',video:null},
  {id:'editing',name:'Timi That Edits',title:'TIMI THAT<br>EDITS',type:'video',craft:'Editing & Post-Production',image:'editing-video',description:'I take raw footage and turn it into finished work. I cut for rhythm, shape the sound and bring the colour together, whether it’s a reel, a music video or a full episode.',action:'View Editing Work',video:{"provider": "vimeo", "id": "1248401213", "previewStart": 0.1, "previewEnd": 26, "title": "13880890_1920_1080_25fps", "url": "https://vimeo.com/1248401213"}},
  {id:'mobile',name:'Timi That Creates',title:'TIMI THAT<br>CREATES',type:'video',craft:'Mobile Content Creation',image:'mobile-video',description:'I shoot and edit on mobile. I make reels, behind-the-scenes clips and event recaps for people and brands who want content they can post.',action:'Explore Creative Content',video:{provider:'vimeo',id:'1248815397',loop:true,title:'Mobile and social video',url:'https://vimeo.com/1248815397'}}
];
const imageCredits={"hero": {"label": "Moonlight · Barry Jenkins · A24", "url": "https://a24films.com/films/moonlight", "kind": "FILM REFERENCE"}, "directing": {"label": "Waves · Trey Edward Shults · A24", "url": "https://a24films.com/films/waves", "kind": "FILM REFERENCE"}, "film": {"label": "The Green Knight · David Lowery · A24", "url": "https://a24films.com/films/the-green-knight", "kind": "FILM REFERENCE"}, "edit": {"label": "The Last Black Man in San Francisco · Joe Talbot · A24", "url": "https://a24films.com/films/the-last-black-man-in-san-francisco", "kind": "FILM REFERENCE"}, "mobile": {"label": "Stephen Tettey Atsu · Tema, Ghana · Unsplash", "url": "https://unsplash.com/photos/a-woman-wearing-a-colorful-dress-and-a-head-scarf-3YrGQ9W2sh0", "kind": "PHOTO REFERENCE"}};
imageCredits['direction-video']={label:'ads · Oluwadurotimi Dawodu · Vimeo',url:'https://vimeo.com/1248392519',kind:'FEATURED VIDEO'};
imageCredits['films-video']={label:'123 · Oluwadurotimi Dawodu · Vimeo',url:'https://vimeo.com/1248401212',kind:'FEATURED VIDEO'};
imageCredits['editing-video']={"label": "13880890_1920_1080_25fps \u00b7 Oluwadurotimi Dawodu \u00b7 Vimeo", "url": "https://vimeo.com/1248401213", "kind": "FEATURED VIDEO"};
imageCredits['cinematography-video']={"label": "Timeline 1 \u00b7 Oluwadurotimi Dawodu \u00b7 Vimeo", "url": "https://vimeo.com/1248496671", "kind": "FEATURED VIDEO"};
imageCredits['mobile-video']={label:'Content By Durotimi · Vimeo',url:'https://vimeo.com/1248815397',kind:'FEATURED VIDEO'};
imageCredits.timagery={label:'Timagery',kind:'PHOTOGRAPHY'};
const timageryPhotos=[
  {src:'assets/timagery-1.jpg',alt:'Portrait framed by a heart of flames'},
  {src:'assets/timagery-2.webp',alt:'Couple in patterned outfits against a red backdrop'},
  {src:'assets/timagery-3.jpg',alt:'Woman smiling upward in a pale floral top'}
];
const collectionImage=c=>c.id==='photography'?timageryPhotos[0].src:`assets/${c.image}.jpg`;
const rail=document.querySelector('#collectionRail');
const dialog=document.querySelector('#projectDialog');
const content=document.querySelector('#dialogContent');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let lastTrigger=null;
let stopCardSlideshow,stopHeroSlideshow,stopGallerySlideshow;

function startTimagerySlideshow(container,showPhoto){
  const pause=container.querySelector('[data-photo-pause]');
  let index=0;
  let paused=reduced.matches;
  const updatePause=()=>{
    pause.textContent=paused?'Play slideshow':'Pause slideshow';
  };
  const advance=step=>{
    index=(index+step+timageryPhotos.length)%timageryPhotos.length;
    showPhoto(timageryPhotos[index],index);
  };
  pause.onclick=()=>{
    paused=!paused;
    updatePause();
  };
  const previous=container.querySelector('[data-photo-previous]');
  const next=container.querySelector('[data-photo-next]');
  if(previous&&next){
    previous.onclick=()=>advance(-1);
    next.onclick=()=>advance(1);
  }
  const respectMotionPreference=()=>{
    paused=reduced.matches;
    updatePause();
  };
  reduced.addEventListener('change',respectMotionPreference);
  updatePause();
  const timer=setInterval(()=>{
    if(!paused&&!document.hidden&&(!dialog.open||dialog.contains(container)))advance(1);
  },5000);
  return ()=>{
    clearInterval(timer);
    reduced.removeEventListener('change',respectMotionPreference);
    pause.onclick=null;
  };
}

const photoPauseButton='<button type="button" class="photo-pause" data-photo-pause>Pause slideshow</button>';
function setPhotoBackdrop(element,photo){
  element.style.setProperty('--photo-backdrop',`url('${photo.src}')`);
}
function setPhoto(image,photo){
  setPhotoBackdrop(image.parentElement,photo);
  image.src=photo.src;
  image.alt=photo.alt;
}
function render(filter='all'){
  stopCardSlideshow?.();
  stopCardSlideshow=undefined;
  VideoPreviews.clear(rail);
  rail.innerHTML=collections.filter(c=>filter==='all'||c.type===filter).map(c=>`<article class="collection-card${c.id==='photography'?' collection-card-timagery':''}" style="--preview-zoom:${c.video?.previewZoom??1}"><div class="card-art"><img src="${collectionImage(c)}" alt="" loading="lazy">${c.video?VideoPreviews.markup(c.video,'card-preview'):''}<button class="collection-select" data-id="${c.id}" aria-label="${c.video?'Watch '+c.video.title+' — ': 'Explore '}${c.name}, ${c.craft}"></button><span class="card-no">0${collections.indexOf(c)+1} / COLLECTION</span><span class="card-kind">${imageCredits[c.image].kind}</span></div><div class="card-body"><h3 class="card-title">${c.title.replace(/<br>/g,' ')}</h3><div class="card-info"><span>${c.craft}</span><button class="collection-open" data-id="${c.id}" aria-label="${c.action}">${c.type==='photo'?'↗':'▶'}</button></div>${c.video?'<button class="preview-toggle" aria-pressed="false">Pause preview</button>':c.id==='photography'?photoPauseButton:''}</div></article>`).join('');
  VideoPreviews.mount(rail);
  const photoCard=rail.querySelector('[data-photo-pause]')?.closest('.collection-card');
  if(photoCard){
    const photo=photoCard.querySelector('.card-art img');
    const art=photo.parentElement;
    setPhotoBackdrop(art,timageryPhotos[0]);
    stopCardSlideshow=startTimagerySlideshow(photoCard,slide=>{photo.src=slide.src;setPhotoBackdrop(art,slide)});
  }
}

document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',String(x===b))});render(b.dataset.filter)}));
function openCollection(id,trigger){
 const c=collections.find(x=>x.id===id);if(!c)return;
 lastTrigger=trigger;
 VideoPreviews.suspend(true);
 const media=c.type==='photo'?`<div class="timagery-gallery" role="group" aria-label="Timagery slideshow"><figure><img src="${timageryPhotos[0].src}" alt="${timageryPhotos[0].alt}"></figure><div class="timagery-controls"><button type="button" data-photo-previous>Previous</button><span class="timagery-count">1 / ${timageryPhotos.length}</span><button type="button" data-photo-next>Next</button>${photoPauseButton}</div></div>`:c.video?`<div class="vimeo-player"><iframe src="https://player.vimeo.com/video/${c.video.id}?autoplay=1&muted=1&loop=${c.video.loop?1:0}&autopause=0&playsinline=1&quality=${c.video.quality??'auto'}&initial_quality=${c.video.quality??'auto'}&dnt=1" title="${c.video.title} — ${c.name}" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div><p class="player-note">Starts muted. Use the player controls for sound and fullscreen. <a href="${c.video.url}" target="_blank" rel="noopener noreferrer">Watch on Vimeo ↗</a></p>`:`<div class="coming-soon"><h3>The collection is being curated.</h3><p>Films will appear here once uploaded. The film imagery shown here is a visual reference, not a Timi production.</p></div>`;
 content.innerHTML=`<div class="dialog-art${c.id==='photography'?' dialog-art-timagery':''}"><img src="${collectionImage(c)}" alt="${c.id==='photography'?'':'Illustrative collection artwork'}"><h2 id="dialogTitle">${c.title}</h2></div><div class="dialog-body"><div class="dialog-tags">${c.craft.toUpperCase()} · ${c.type==='photo'?'STILL IMAGES':'MOTION PICTURE'}</div><p>${c.description}</p>${media}<a class="button light" href="/pricing-${c.id}.html" data-view-rates>View pricing and bookings</a>${c.id==='photography'?'':`<p class="image-credit">${c.video?'Featured video: ':'Reference image: '}<a href="${imageCredits[c.image].url}" target="_blank" rel="noopener noreferrer">${imageCredits[c.image].label} ↗</a>${c.video?'.':'. Not portfolio work by Timi.'}</p>`}<p class="dialog-footnote">Call +234 809 232 3235 · Availability and scope confirmed by phone.</p></div>`;
 content.querySelector('[data-view-rates]').addEventListener('click',()=>dialog.close());
 stopGallerySlideshow?.();
 stopGallerySlideshow=undefined;
 const gallery=content.querySelector('.timagery-gallery');
 if(gallery){
   const photo=gallery.querySelector('img');
   setPhotoBackdrop(photo.parentElement,timageryPhotos[0]);
   const count=gallery.querySelector('.timagery-count');
   stopGallerySlideshow=startTimagerySlideshow(gallery,(slide,index)=>{
     setPhoto(photo,slide);
     count.textContent=`${index+1} / ${timageryPhotos.length}`;
   });
 }
 if(!dialog.open)dialog.showModal();dialog.scrollTop=0;
}
rail.addEventListener('click',e=>{const b=e.target.closest('[data-id]');if(b)openCollection(b.dataset.id,b)});
document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
dialog.addEventListener('close',()=>{stopGallerySlideshow?.();stopGallerySlideshow=undefined;content.querySelectorAll('iframe').forEach(f=>f.remove());VideoPreviews.suspend(false);lastTrigger?.focus()});
const serviceIds=['cinematography','direction','photography','editing'];
document.querySelectorAll('[data-service]').forEach(b=>b.addEventListener('click',()=>openCollection(serviceIds[Number(b.dataset.service)],b)));
let currentScene=-1;
let sceneTimeout;
const hero=document.querySelector('.hero');
const heroPhotoPause=document.querySelector('#heroPhotoPause');
const heroThumbs=document.querySelector('#heroThumbnails');
heroThumbs.innerHTML=collections.map((c,i)=>`<button data-scene="${i}" class="hero-thumb ${i===currentScene?'selected':''}" aria-pressed="${i===currentScene}" aria-label="Feature ${c.name}"><img src="${collectionImage(c)}" alt=""><span>${String(i+1).padStart(2,'0')}</span></button>`).join('');
function selectScene(index,initial=false){
 currentScene=index;
 const c=collections[index];
 hero.classList.remove('hero-intro');
 heroThumbs.querySelectorAll('button').forEach((b,i)=>{b.classList.toggle('selected',i===index);b.setAttribute('aria-pressed',String(i===index))});
 const image=document.querySelector('#heroImage'),copy=document.querySelector('#heroContent');
 stopHeroSlideshow?.();
 stopHeroSlideshow=undefined;
 heroPhotoPause.hidden=true;
 clearTimeout(sceneTimeout);document.querySelector('#heroPreviewToggle').hidden=!c.video;
 const update=()=>{image.style.backgroundImage=`url('${collectionImage(c)}')`;document.querySelector('#heroTitle').innerHTML=c.title;document.querySelector('#heroKicker').textContent=c.craft;document.querySelector('#heroDescription').textContent=c.description;document.querySelector('.preview-label').textContent=c.id==='photography'?imageCredits.timagery.kind:imageCredits[c.image].kind+' · '+imageCredits[c.image].label;image.style.opacity='1';copy.style.opacity='1';document.querySelector('#heroOpen').innerHTML=(c.video?'WATCH VIDEO':'EXPLORE COLLECTION')+' <span class="play-icon">▶</span>';document.querySelectorAll('[data-hero-video]').forEach(slide=>slide.classList.toggle('is-active',slide.dataset.heroVideo===c.id));document.querySelector('.hero').classList.toggle('hero-film-crop',c.id==='films');VideoPreviews.activateHero(c.id);
   hero.classList.toggle('hero-timagery',c.id==='photography');
   if(c.id==='photography'){
     heroPhotoPause.hidden=false;
     setPhotoBackdrop(hero,timageryPhotos[0]);
     stopHeroSlideshow=startTimagerySlideshow(hero,slide=>{
       image.style.backgroundImage=`url('${slide.src}')`;
       setPhotoBackdrop(hero,slide);
     });
   }
 };
 if(reduced.matches||initial){update();return}
 image.style.opacity='.25';copy.style.opacity='0';sceneTimeout=setTimeout(update,200);
}
heroThumbs.addEventListener('click',e=>{const b=e.target.closest('[data-scene]');if(b)selectScene(Number(b.dataset.scene))});
heroThumbs.addEventListener('keydown',e=>{if(!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();let i=currentScene;if(e.key==='Home')i=0;else if(e.key==='End')i=collections.length-1;else if(i<0)i=['ArrowDown','ArrowRight'].includes(e.key)?0:collections.length-1;else i=(i+(['ArrowDown','ArrowRight'].includes(e.key)?1:-1)+collections.length)%collections.length;selectScene(i);heroThumbs.querySelectorAll('button')[i].focus()});
document.querySelector('#heroOpen').addEventListener('click',e=>{if(currentScene<0)document.querySelector('#collections').scrollIntoView();else openCollection(collections[currentScene].id,e.currentTarget)});
const menu=document.querySelector('.menu-toggle');menu.addEventListener('click',()=>{const open=document.querySelector('#nav').classList.toggle('mobile-nav-open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');menu.textContent=open?'✕':'☰'});
document.querySelectorAll('.nav nav a').forEach(a=>a.addEventListener('click',()=>{document.querySelector('#nav').classList.remove('mobile-nav-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');menu.textContent='☰'}));
document.querySelector('#year').textContent=new Date().getFullYear();
timageryPhotos.forEach(({src})=>{new Image().src=src});
const mobileVideo=collections.find(c=>c.id==='mobile').video;
document.querySelector('#heroVideo').insertAdjacentHTML('beforeend',
  `<div class="hero-video-slide" data-hero-video="mobile">${VideoPreviews.markup(mobileVideo,'hero-preview')}</div>`);
render();
VideoPreviews.mount(hero);
hero.classList.add('hero-intro');
document.querySelector('#heroPreviewToggle').hidden=false;
VideoPreviews.activateHero('direction');

const showreel=document.querySelector('.inline-showreel');
showreel.querySelectorAll('[data-inline-video]').forEach(frame=>{
 const collection=collections.find(c=>c.id===frame.dataset.inlineVideo);
 frame.classList.add('inline-clip');
 frame.innerHTML=`<span class="inline-clip-media"><img src="${collectionImage(collection)}" alt="" loading="lazy">${VideoPreviews.markup(collection.video,'inline-preview',{defer:true})}<button type="button" data-clip-open data-id="${collection.id}" aria-label="${collection.action}"></button></span>`;
 frame.querySelector('[data-clip-open]').addEventListener('click',e=>openCollection(collection.id,e.currentTarget));
});
VideoPreviews.mount(showreel);
