'use strict';
// Eager Vimeo loading starts independently of the SDK. The SDK manages pause/loop controls.
const VideoPreviews=(()=>{
 const entries=new Map(),pendingRoots=new Set();let suspended=false,activeHero='direction';
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
 function markup(video,kind,{defer=false}={}){return `<iframe class="video-preview ${kind}" style="--preview-zoom:${video.previewZoom??1}" data-loop-start="${video.previewStart??0}" data-loop-end="${video.previewEnd??0}" src="https://player.vimeo.com/video/${video.id}?background=1&autoplay=${reduce.matches||defer?0:1}&muted=1&loop=${video.loop?1:0}&autopause=0&playsinline=1&preload=auto&quality=${video.quality??'auto'}&initial_quality=${video.quality??'auto'}&dnt=1#t=${video.previewStart??0}s" title="Muted preview of ${video.title}" allow="autoplay; fullscreen; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" tabindex="-1" aria-hidden="true" loading="${defer?'lazy':'eager'}"></iframe>`;}
 function wanted(entry){return entry.visible&&!entry.paused&&!suspended&&!document.hidden&&(!entry.hero||entry.hero===activeHero)}
 function updateControl(entry){
  if(!entry.control||(entry.hero&&entry.hero!==activeHero))return;
  const stopped=entry.paused||entry.blocked;
  entry.control.textContent=stopped?'Play preview':'Pause preview';
  entry.control.setAttribute('aria-pressed',String(stopped));
  entry.control.setAttribute('aria-label',(stopped?'Play':'Pause')+' muted video preview');
  entry.control.onclick=()=>{if(entry.blocked){entry.blocked=false;entry.paused=false;}else entry.paused=!entry.paused;entry.retries=0;updateControl(entry);sync(entry)};
 }
 function sync(entry){
  if(entry.retryTimer){clearTimeout(entry.retryTimer);entry.retryTimer=null;}
  const request=++entry.request;
  entry.player.ready().then(()=>{
   if(!entries.has(entry.frame)||request!==entry.request)return;
   return wanted(entry)?entry.player.play():entry.player.pause();
  }).then(()=>{
   if(!entries.has(entry.frame)||request!==entry.request)return;
   entry.blocked=false;entry.retries=0;updateControl(entry);
  }).catch(error=>{
   // A failed/aborted play request is not a user pause. Keep viewport autoplay recoverable.
   if(!entries.has(entry.frame)||request!==entry.request||!wanted(entry))return;
   if(error?.name!=='NotAllowedError'&&entry.retries<2){
    entry.retries++;entry.retryTimer=setTimeout(()=>{entry.retryTimer=null;if(entries.has(entry.frame)&&wanted(entry))sync(entry)},entry.retries*250);
    return;
   }
   entry.frame.classList.remove('is-playing');entry.blocked=true;updateControl(entry);
  });
 }
 const observer=new IntersectionObserver(items=>items.forEach(item=>entries.forEach(entry=>{
  if(entry.target===item.target){entry.visible=item.isIntersecting&&item.intersectionRatio>=.1;sync(entry)}
 })),{threshold:[0,.1,.35,.7]});
 function mount(root){
  if(!root)return;
  if(!window.Vimeo?.Player){pendingRoots.add(root);return;}
  pendingRoots.delete(root);
  root.querySelectorAll('.video-preview').forEach(frame=>{
   if(entries.has(frame))return;
   const holder=frame.closest('.collection-card, .hero, .inline-clip');
   const slide=frame.closest('[data-hero-video]');
   const target=frame.closest('.card-art, .inline-clip-media')||holder;
   const box=target.getBoundingClientRect();
   const entry={frame,target,hero:slide?.dataset.heroVideo,player:new Vimeo.Player(frame),control:holder?.querySelector('.preview-toggle'),visible:box.bottom>0&&box.top<window.innerHeight,paused:reduce.matches,blocked:false,retries:0,retryTimer:null,request:0,seeking:false,start:Number(frame.dataset.loopStart)||0,end:Number(frame.dataset.loopEnd)||0};
   entries.set(frame,entry);updateControl(entry);
   const restart=()=>{
    if(entry.seeking)return;entry.seeking=true;
    entry.player.setCurrentTime(entry.start).then(()=>{entry.seeking=false;if(entries.has(frame))sync(entry)}).catch(()=>{entry.seeking=false});
   };
   entry.player.on('timeupdate',data=>{if(entry.end>entry.start&&data.seconds>=entry.end)restart()});
   entry.player.on('ended',restart);
   // The URL time fragment handles the initial offset without a second startup seek.
   entry.player.on('playing',()=>{entry.blocked=false;entry.retries=0;frame.classList.add('is-playing');updateControl(entry)});
   entry.player.ready().then(()=>entry.player.getPaused()).then(paused=>{if(!paused)frame.classList.add('is-playing')}).catch(()=>{});
   entry.player.on('error',()=>{frame.classList.remove('is-playing');if(entry.control&&(!entry.hero||entry.hero===activeHero))entry.control.textContent='Preview unavailable — open video'});
   observer.observe(target);sync(entry);
  });
 }
 function clear(root){
  if(!root)return;pendingRoots.delete(root);
  root.querySelectorAll('.video-preview').forEach(frame=>{const entry=entries.get(frame);if(entry){clearTimeout(entry.retryTimer);entry.request++;observer.unobserve(entry.target);entry.player.destroy().catch(()=>{});entries.delete(frame)}});
 }
 function activateHero(id){activeHero=id;entries.forEach(entry=>{if(entry.hero){updateControl(entry);sync(entry)}})}
 function suspend(value){suspended=value;entries.forEach(sync)}
 document.addEventListener('visibilitychange',()=>entries.forEach(sync));
 const sdk=document.querySelector('#vimeoSdk');
 sdk?.addEventListener('load',()=>Array.from(pendingRoots).forEach(mount));
 sdk?.addEventListener('error',()=>pendingRoots.forEach(root=>root.querySelectorAll('.preview-toggle').forEach(control=>{control.textContent='Open video to watch';control.onclick=()=>(control.closest('.inline-clip')?.querySelector('[data-clip-open]')??root.querySelector('[data-id],#heroOpen'))?.click()})));
 return {markup,mount,clear,suspend,activateHero};
})();
