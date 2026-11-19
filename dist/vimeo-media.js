'use strict';
// Vimeo's supported player API controls visible, muted previews only.
const VideoPreviews=(()=>{
 const entries=new Map();let suspended=false;
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
 function markup(video,kind){return `<iframe class="video-preview ${kind}" data-loop-start="${video.previewStart??0}" data-loop-end="${video.previewEnd??0}" src="https://player.vimeo.com/video/${video.id}?background=1&autoplay=0&muted=1&loop=0&playsinline=1&dnt=1" title="Muted preview of ${video.title}" allow="autoplay; fullscreen; picture-in-picture" tabindex="-1" aria-hidden="true" loading="lazy"></iframe>`;}
 function sync(entry){
  entry.player.ready().then(()=>entry.visible&&!entry.paused&&!suspended&&!document.hidden?entry.player.play():entry.player.pause()).catch(()=>{
   entry.frame.classList.remove('is-playing');
   if(entry.control){entry.control.textContent='Play preview';entry.control.setAttribute('aria-pressed','true');}
  });
 }
 const observer=new IntersectionObserver(items=>items.forEach(item=>{entries.forEach(entry=>{if(entry.target===item.target){entry.visible=item.isIntersecting&&item.intersectionRatio>=.35;sync(entry)}})}),{threshold:[0,.35,.7]});
 function mount(root){
  root.querySelectorAll('.video-preview').forEach(frame=>{
   if(entries.has(frame))return;
   const holder=frame.closest('.collection-card')||frame.closest('.hero');
   const control=holder?.querySelector('.preview-toggle');
   if(!window.Vimeo?.Player){if(control){control.textContent='Open video to watch';control.onclick=()=>holder.querySelector('[data-id],#heroOpen')?.click()}return;}
   const entry={frame,target:frame.closest('.card-art')||holder,player:new Vimeo.Player(frame),control,visible:false,paused:reduce.matches,seeking:false,start:Number(frame.dataset.loopStart)||0,end:Number(frame.dataset.loopEnd)||0};entries.set(frame,entry);
   const updateControl=()=>{if(control){control.textContent=entry.paused?'Play preview':'Pause preview';control.setAttribute('aria-pressed',String(entry.paused));control.setAttribute('aria-label',(entry.paused?'Play':'Pause')+' muted video preview')}};
   updateControl();
   if(control)control.onclick=()=>{entry.paused=!entry.paused;updateControl();sync(entry)};
   // Loop before the trailing black frames, using the same range in cards and hero.
   const restart=()=>{
    if(entry.seeking)return;
    entry.seeking=true;
    entry.player.setCurrentTime(entry.start).then(()=>{entry.seeking=false;if(entries.has(frame))sync(entry)}).catch(()=>{entry.seeking=false;});
   };
   entry.player.on('timeupdate',data=>{if(entry.end>entry.start&&data.seconds>=entry.end)restart()});
   entry.player.on('ended',restart);
   entry.player.ready().then(()=>entry.player.setCurrentTime(entry.start)).catch(()=>{});
   entry.player.on('playing',()=>frame.classList.add('is-playing'));
   entry.player.on('error',()=>{frame.classList.remove('is-playing');if(control)control.textContent='Preview unavailable — open video'});
   observer.observe(entry.target);sync(entry);
  });
 }
 function clear(root){if(!root)return;root.querySelectorAll('.video-preview').forEach(frame=>{const entry=entries.get(frame);if(entry){observer.unobserve(entry.target);entry.player.destroy().catch(()=>{});entries.delete(frame)}});}
 function suspend(value){suspended=value;entries.forEach(sync)}
 document.addEventListener('visibilitychange',()=>entries.forEach(sync));
 return {markup,mount,clear,suspend};
})();
