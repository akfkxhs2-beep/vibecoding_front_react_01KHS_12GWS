const express = require('express');
const path = require('path');
const { initStorage, getGames } = require('./storage');
const { startAutoSync } = require('./jobs/auto-sync');
const { getSteamMedia } = require('./providers/steam-media-provider');

const app = express();
const PORT = process.env.PORT || 3000;
const projectRoot = path.resolve(__dirname, '..');

app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));

app.get('/api/status', (req,res) => {
  res.json({ ok:true, mode:process.env.DATABASE_URL ? 'database' : 'json', syncEnabled:process.env.SYNC_ENABLED === 'true' });
});

app.get('/api/games', async (req,res,next) => {
  try{
    const games = await getGames();
    res.set('Cache-Control','no-store');
    res.json({ games, updatedAt:new Date().toISOString() });
  }catch(err){ next(err); }
});


app.get('/api/media/:appId', async (req,res,next) => {
  try{
    const appId=String(req.params.appId||'').replace(/\D/g,'');
    if(!appId) return res.status(400).json({error:'invalid_app_id'});

    const media=await getSteamMedia(appId);
    res.set('Cache-Control','public, max-age=900');
    res.json(media);
  }catch(err){ next(err); }
});

// 서버 소스/환경파일 노출 방지
app.use('/server', (req,res)=>res.status(404).end());
app.get('/package.json', (req,res)=>res.status(404).end());
app.get('/.env', (req,res)=>res.status(404).end());

// 기존 HTML/CSS/JS를 그대로 서비스합니다.
app.use(express.static(projectRoot, { index:'index.html' }));

app.use((err,req,res,next) => {
  console.error(err);
  res.status(500).json({ error:'server_error' });
});

(async()=>{
  await initStorage();
  startAutoSync();
  app.listen(PORT,()=>console.log(`[server] http://localhost:${PORT}`));
})().catch(err=>{ console.error(err); process.exit(1); });
