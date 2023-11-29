import{i as a,a as m}from"./assets/vendor-95bdb625.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&d(l)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const y="36838711-56df4c2f8a3a85471ff3834b0",h=document.querySelector("#search-form"),f=document.querySelector(".gallery"),n=document.querySelector(".load-more");let c="",i=1,u=0;n.style.display="none";async function p(){const s=`https://pixabay.com/api/?key=${y}&q=${c}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${i}`;try{const o=await m.get(s),t=o.data.hits;u=o.data.totalHits,t.length===0?(a.info({title:"Hello",message:"Sorry, there are no images matching your search query. Please try again."}),n.style.display="none"):(g(t),u<=i*40?(n.style.display="none",a.info({title:"Hello",message:"We`re sorry, but you`ve reached the end of search results."})):n.style.display="block")}catch{a.error({title:"Error",message:"An error occurred while fetching data."})}i+=1}h.addEventListener("submit",s=>{if(s.preventDefault(),c=s.currentTarget.elements.searchQuery.value,n.style.display="none",!c.trim()){a.warning({title:"Caution",message:"Please enter a search query."});return}f.innerHTML="",i=1,p()});n.addEventListener("click",p);function g(s){const o=s.map(t=>`
    <div class="photo-card">
      <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes:</b> <br>${t.likes}
        </p>
        <p class="info-item">
          <b>Views:</b> <br>${t.views}
        </p>
        <p class="info-item">
          <b>Comments:</b> <br>${t.comments}
        </p>
        <p class="info-item">
          <b>Downloads:</b> <br>${t.downloads}
        </p>
      </div>
    </div>
  `).join("");f.insertAdjacentHTML("beforeend",o)}
//# sourceMappingURL=commonHelpers.js.map
