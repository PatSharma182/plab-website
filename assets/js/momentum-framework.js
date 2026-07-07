// Momentum Framework 3.1
document.addEventListener("DOMContentLoaded",function(){
  const showcase=document.querySelector(".momentum-showcase");
  const scenes=Array.from(document.querySelectorAll(".mf-scene"));

  if(!showcase||!scenes.length){
    return;
  }

  let activeIndex=-1;
  let ticking=false;

  const clamp=function(value,min,max){
    return Math.min(Math.max(value,min),max);
  };

  const updateProgress=function(){
    const sectionRect=showcase.getBoundingClientRect();
    const timelineTop=260;
    const timelineHeight=Math.max(sectionRect.height-420,1);
    const viewportAnchor=window.innerHeight*.5-sectionRect.top-timelineTop;
    const progress=clamp(viewportAnchor/timelineHeight,0,1);
    const progressValue=(progress*100).toFixed(2)+"%";

    showcase.style.setProperty("--mf-progress",progressValue);
    showcase.style.setProperty("--mf-pulse-y",progressValue);
  };

  const setActiveScene=function(nextIndex){
    if(nextIndex===activeIndex){
      return;
    }

    activeIndex=nextIndex;

    scenes.forEach(function(scene,index){
      const isActive=index===activeIndex;

      scene.classList.toggle("is-active",isActive);
      scene.classList.toggle("is-past",index<activeIndex);

      if(isActive){
        scene.classList.remove("is-entering");
        void scene.offsetWidth;
        scene.classList.add("is-entering");
      }else{
        scene.classList.remove("is-entering");
      }
    });
  };

  const updateActiveScene=function(){
    let mostVisibleIndex=activeIndex>-1?activeIndex:0;
    let highestVisibleRatio=-1;

    scenes.forEach(function(scene,index){
      const rect=scene.getBoundingClientRect();
      const visibleHeight=Math.min(rect.bottom,window.innerHeight)-Math.max(rect.top,0);
      const visibleRatio=clamp(visibleHeight/Math.max(rect.height,1),0,1);

      if(visibleRatio>highestVisibleRatio){
        highestVisibleRatio=visibleRatio;
        mostVisibleIndex=index;
      }
    });

    setActiveScene(mostVisibleIndex);
  };

  const updateJourney=function(){
    ticking=false;
    updateProgress();
    updateActiveScene();
  };

  const requestJourneyUpdate=function(){
    if(ticking){
      return;
    }

    ticking=true;
    window.requestAnimationFrame(updateJourney);
  };

  const revealScene=function(scene){
    scene.classList.add("is-visible");
  };

  if("IntersectionObserver" in window){
    const revealObserver=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          revealScene(entry.target);
        }
      });

      requestJourneyUpdate();
    },{threshold:.2});

    scenes.forEach(function(scene){
      revealObserver.observe(scene);
    });
  }else{
    scenes.forEach(revealScene);
  }

  window.addEventListener("scroll",requestJourneyUpdate,{passive:true});
  window.addEventListener("resize",requestJourneyUpdate);
  requestJourneyUpdate();
});
