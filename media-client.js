(function(){
  function youtubeThumb(id){
    return "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg";
  }

  function localMedia(game){
    const items = [];

    if(game.trailerYoutube){
      items.push({
        type:"youtube",
        label:"공식 트레일러",
        youtubeId:game.trailerYoutube,
        thumbnail:youtubeThumb(game.trailerYoutube),
        externalUrl:"https://www.youtube.com/watch?v=" + game.trailerYoutube
      });
    }

    (game.localMedia || []).forEach((x,index)=>{
      items.push({
        type:"image",
        label:x.label || ("게임 이미지 " + (index+1)),
        url:x.url,
        thumbnail:x.url
      });
    });

    return items;
  }

  window.GameMediaAPI = {
    source:"local",

    async load(game){
      // 서버에서 서비스 중이라면 실제 Steam 미디어 API를 먼저 사용
      if(location.protocol !== "file:"){
        try{
          const r = await fetch("/api/media/" + encodeURIComponent(game.steamApp), {cache:"no-store"});
          if(!r.ok) throw new Error("media api " + r.status);
          const data = await r.json();

          if(Array.isArray(data.items) && data.items.length){
            this.source = "server";

            // 서버 자료가 있어도 현재 게임에 등록된 공식 YouTube 트레일러를
            // 가장 앞에 함께 보여준다.
            const local = localMedia(game);
            const yt = local.find(x=>x.type==="youtube");
            const merged = yt ? [yt, ...data.items] : data.items;

            // URL 중복 제거
            const seen = new Set();
            return merged.filter(x=>{
              const key=x.url||x.youtubeId||x.thumbnail;
              if(!key || seen.has(key)) return false;
              seen.add(key);
              return true;
            }).slice(0,14);
          }
        }catch(err){
          console.warn("[GameMediaAPI] 서버 미디어를 사용할 수 없어 로컬 갤러리로 전환합니다.",err);
        }
      }

      this.source = "local";
      return localMedia(game);
    }
  };
})();