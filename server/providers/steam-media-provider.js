const cache = new Map();
const TTL = Math.max(15, Number(process.env.MEDIA_CACHE_MINUTES || 360)) * 60 * 1000;

function normalizeMovie(movie){
  const mp4 = movie && movie.mp4;
  const url = mp4 && (mp4.max || mp4["480"]);
  if(!url) return null;
  return {
    type:"video",
    label:movie.name || "Steam 트레일러",
    url,
    thumbnail:movie.thumbnail || null
  };
}

async function getSteamMedia(appId){
  const key=String(appId);
  const hit=cache.get(key);
  if(hit && Date.now()-hit.time<TTL) return hit.value;

  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),8000);

  try{
    const url=
      "https://store.steampowered.com/api/appdetails?appids="+
      encodeURIComponent(key)+
      "&cc=kr&l=koreana";

    const response=await fetch(url,{
      signal:controller.signal,
      headers:{
        "User-Agent":"GameDiscoveryPlatform/1.0"
      }
    });

    if(!response.ok) throw new Error("Steam HTTP "+response.status);

    const payload=await response.json();
    const entry=payload && payload[key];

    if(!entry || !entry.success || !entry.data){
      throw new Error("Steam media data unavailable");
    }

    const data=entry.data;
    const items=[];

    // Steam 스토어 트레일러
    (data.movies || []).slice(0,3).forEach(movie=>{
      const m=normalizeMovie(movie);
      if(m) items.push(m);
    });

    // 실제 Steam 스크린샷
    (data.screenshots || []).slice(0,10).forEach((shot,index)=>{
      const full=shot.path_full || shot.path_thumbnail;
      if(!full) return;
      items.push({
        type:"image",
        label:"인게임 스크린샷 "+(index+1),
        url:full,
        thumbnail:shot.path_thumbnail || full,
        isScreenshot:true
      });
    });

    // 혹시 스크린샷/영상이 없을 때 공식 헤더 이미지
    if(!items.length && data.header_image){
      items.push({
        type:"image",
        label:"Steam 공식 이미지",
        url:data.header_image,
        thumbnail:data.header_image
      });
    }

    const value={items,gameName:data.name||null};
    cache.set(key,{time:Date.now(),value});
    return value;
  }finally{
    clearTimeout(timer);
  }
}

module.exports={getSteamMedia};