(async function(){
const G=await GameAPI.loadGames();
const id=new URLSearchParams(location.search).get("game");
const g=G.find(x=>x.id===id)||G[0];

if(!g){
  document.getElementById("detail").innerHTML='<div class="empty">게임 데이터를 불러오지 못했습니다.</div>';
  return;
}

document.title=g.name+" - 게임 상세";

function disc(s){
  return s&&s.original&&s.current<s.original
    ? Math.round((1-s.current/s.original)*100)
    : 0;
}

function store(n,s,o){
  if(!s){
    return `<div class="store-card"><div class="store-name">${n}</div><div class="price-regular">가격 정보 없음</div></div>`;
  }

  const d=disc(s);
  const best=o&&Number.isFinite(s.current)&&Number.isFinite(o.current)&&s.current<o.current;

  const priceBlock=d
    ? `<div class="steam-price-box">
         <div class="discount-box">-${d}%</div>
         <div class="price-stack">
           <div class="was">${won(s.original)}</div>
           <div class="now">${won(s.current)}</div>
         </div>
       </div>`
    : `<div class="price-regular">${won(s.current)}</div>`;

  return `<div class="store-card ${best?"best":""}">
    <div class="store-top">
      <div class="store-name">${n}</div>
      <div class="badge">${best?"현재 더 저렴":"한국 스토어"}</div>
    </div>
    ${priceBlock}
    <div class="store-sub">${d?"할인 적용 중":"현재 판매가"}</div>
    <a class="btn" href="${s.url||'#'}">${n}에서 가격 확인 →</a>
  </div>`;
}

const genres=(g.tags||[])
  .map(t=>`<a class="tag" href="category.html?tag=${encodeURIComponent(t)}">${t}</a>`)
  .join("");

const sourceText=GameAPI.source==="server" ? "서버의 최신 데이터" : "내장 로컬 데이터";

document.getElementById("detail").innerHTML=`
<section class="hero-detail">
  <div class="media-gallery" id="mediaGallery">
    <div class="media-stage" id="mediaStage">
      <div class="media-fallback">🎬<div>게임 미디어를 불러오는 중...</div></div>
    </div>
    <div class="media-bottom">
      <div class="media-caption" id="mediaCaption">미디어 불러오는 중</div>
      <div class="media-counter" id="mediaCounter"></div>
    </div>
    <div class="media-thumbs" id="mediaThumbs"></div>
    <div class="media-source-note" id="mediaSourceNote">
      공식 트레일러와 Steam 게임 이미지를 인터넷에서 불러옵니다.
    </div>
  </div>

  <div class="info">
    <div class="eyebrow">GAME DETAIL · ${sourceText}</div>
    <h1>${g.name}</h1>

    <div class="scores">
      <div class="score">
        <label>STEAM 평가</label>
        <strong class="green">${Number(g.steamRating||0).toFixed(1)}%</strong>
      </div>
      <div class="score">
        <label>METASCORE</label>
        <strong class="yellow">${g.metascore??"-"}</strong>
      </div>
      <a class="score" href="category.html?time=${encodeURIComponent(timeBucket(g))}">
        <label>MAIN STORY</label>
        <strong class="blue">${g.storyless?"없음":g.hours+"h"}</strong>
      </a>
    </div>

    <div class="genres">${genres}</div>
    <div class="description-title">게임 설명</div>
    <div class="description">${g.desc||""}</div>
  </div>
</section>

<section class="price-section">
  <div class="price-head">
    <h2>🛒 Steam / Xbox 가격</h2>
    <span>${GameAPI.source==="server"?"서버 갱신 데이터":"현재는 저장된 로컬 데이터"}</span>
  </div>
  <div class="price-grid">
    ${store("Steam",g.steam,g.xbox)}
    ${store("Xbox",g.xbox,g.steam)}
  </div>
  <div class="note">
    ※ 서버가 없어도 미디어 갤러리와 기존 사이트는 실행됩니다.
    나중에 서버를 연결하면 같은 갤러리에서 Steam의 실제 스크린샷과 스토어 트레일러를 자동으로 추가하도록 준비되어 있습니다.
  </div>
</section>`;

const items=await GameMediaAPI.load(g);
let currentIndex=0;

const stage=document.getElementById("mediaStage");
const thumbs=document.getElementById("mediaThumbs");
const caption=document.getElementById("mediaCaption");
const counter=document.getElementById("mediaCounter");
const note=document.getElementById("mediaSourceNote");

note.textContent = GameMediaAPI.source==="server"
  ? "서버에서 Steam의 실제 스크린샷/트레일러를 불러왔습니다. 영상/사진 썸네일을 눌러 바꿀 수 있습니다."
  : "무료 로컬 모드: 공식 트레일러와 Steam 공식 스토어 이미지를 사용합니다. 서버 연결 후에는 실제 Steam 스크린샷도 자동으로 들어옵니다.";

function safeImage(url,label){
  return `<img src="${url}" alt="${label||g.name}" referrerpolicy="no-referrer"
    onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
    <div class="media-fallback" style="display:none">
      🖼️
      <div>이 이미지를 불러올 수 없습니다.</div>
      <small>인터넷 연결 또는 원본 서버 상태를 확인해주세요.</small>
    </div>`;
}

function renderMedia(index){
  if(!items.length){
    stage.innerHTML=`<div class="media-fallback">🎮<div>등록된 미디어가 없습니다.</div></div>`;
    caption.textContent="미디어 없음";
    counter.textContent="";
    return;
  }

  currentIndex=(index+items.length)%items.length;
  const item=items[currentIndex];

  let body="";
  let typeText="사진";

  if(item.type==="youtube"){
    typeText="영상";
    body=`
      <iframe
        src="https://www.youtube-nocookie.com/embed/${item.youtubeId}?rel=0&modestbranding=1"
        title="${g.name} ${item.label||"공식 트레일러"}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        referrerpolicy="strict-origin-when-cross-origin"></iframe>
      <a class="video-external" href="${item.externalUrl||("https://www.youtube.com/watch?v="+item.youtubeId)}">
        YouTube에서 보기 ↗
      </a>`;
  }else if(item.type==="video"){
    typeText="영상";
    body=`
      <video controls playsinline preload="metadata" ${item.thumbnail?`poster="${item.thumbnail}"`:""}>
        <source src="${item.url}" type="video/mp4">
      </video>`;
  }else{
    typeText=item.isScreenshot ? "인게임 스크린샷" : "사진";
    body=safeImage(item.url,item.label);
  }

  stage.innerHTML=`
    ${body}
    <div class="media-topbar"><span class="media-type">${typeText==="영상"?"▶":"▧"} ${typeText}</span></div>
    <button class="media-arrow media-prev" id="mediaPrev" type="button" aria-label="이전 미디어">‹</button>
    <button class="media-arrow media-next" id="mediaNext" type="button" aria-label="다음 미디어">›</button>`;

  caption.textContent=item.label||typeText;
  counter.textContent=(currentIndex+1)+" / "+items.length;

  document.getElementById("mediaPrev").onclick=()=>renderMedia(currentIndex-1);
  document.getElementById("mediaNext").onclick=()=>renderMedia(currentIndex+1);

  [...thumbs.children].forEach((el,i)=>el.classList.toggle("active",i===currentIndex));
}

function renderThumbs(){
  thumbs.innerHTML="";
  items.forEach((item,index)=>{
    const btn=document.createElement("button");
    btn.className="media-thumb";
    btn.type="button";
    btn.title=item.label||"게임 미디어";

    let thumb=item.thumbnail||item.url;
    if(item.type==="youtube"&&!thumb){
      thumb="https://i.ytimg.com/vi/"+item.youtubeId+"/hqdefault.jpg";
    }

    btn.innerHTML=`
      <img src="${thumb||""}" alt="${item.label||"미디어 썸네일"}" referrerpolicy="no-referrer"
           onerror="this.style.opacity='.15'">
      ${item.type==="youtube"||item.type==="video"?'<span class="thumb-video-icon">▶</span>':""}
      <span class="thumb-label">${item.label||"미디어"}</span>`;

    btn.onclick=()=>renderMedia(index);
    thumbs.appendChild(btn);
  });
}

renderThumbs();
renderMedia(0);

// 키보드 ← → 로도 갤러리 이동
document.addEventListener("keydown",e=>{
  if(e.target.matches("input,textarea"))return;
  if(e.key==="ArrowLeft")renderMedia(currentIndex-1);
  if(e.key==="ArrowRight")renderMedia(currentIndex+1);
});
})();