(function(){
  const api = {
    source: 'local',
    updatedAt: null,
    error: null,

    async loadGames(){
      // index.html을 더블클릭(file://)해서 실행하는 경우에는
      // 서버 호출을 시도하지 않고 기존 data.js를 그대로 사용합니다.
      if(location.protocol === 'file:'){
        this.source = 'local';
        this.updateBadge();
        return Array.isArray(window.GAME_DATA) ? window.GAME_DATA : [];
      }

      // 나중에 Railway/Render/Vercel 등의 서버에 올리면
      // /api/games가 존재하는 경우 자동으로 서버 데이터를 우선 사용합니다.
      try{
        const response = await fetch('/api/games', {cache:'no-store'});
        if(!response.ok) throw new Error('API HTTP ' + response.status);
        const payload = await response.json();
        const games = Array.isArray(payload) ? payload : payload.games;
        if(!Array.isArray(games) || !games.length) throw new Error('게임 데이터가 비어 있습니다.');
        this.source = 'server';
        this.updatedAt = Array.isArray(payload) ? null : (payload.updatedAt || null);
        this.error = null;
        this.updateBadge();
        return games;
      }catch(error){
        console.warn('[GameAPI] 서버를 사용할 수 없어 로컬 데이터로 전환합니다.', error);
        this.source = 'local-fallback';
        this.error = String(error && error.message ? error.message : error);
        this.updateBadge();
        return Array.isArray(window.GAME_DATA) ? window.GAME_DATA : [];
      }
    },

    updateBadge(){
      const badge = document.getElementById('dataModeBadge');
      if(!badge) return;
      if(this.source === 'server'){
        badge.textContent = '● 서버 데이터';
        badge.classList.add('server');
        badge.title = this.updatedAt ? '마지막 서버 갱신: ' + this.updatedAt : '서버에서 게임 데이터를 불러오는 중입니다.';
      }else if(this.source === 'local-fallback'){
        badge.textContent = '● 로컬 대체 모드';
        badge.classList.remove('server');
        badge.title = '서버에 연결하지 못해 data.js 데이터를 사용하고 있습니다.';
      }else{
        badge.textContent = '● 무료 로컬 모드';
        badge.classList.remove('server');
        badge.title = '서버 없이 data.js만으로 실행 중입니다.';
      }
    }
  };
  window.GameAPI = api;
})();
