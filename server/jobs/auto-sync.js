const { runGameSync } = require('./game-sync');

function startAutoSync(){
  if(process.env.SYNC_ENABLED !== 'true'){
    console.log('[sync] disabled - static/local data will be used');
    return;
  }
  const minutes = Math.max(15, Number(process.env.SYNC_INTERVAL_MINUTES || 60));
  const run = () => runGameSync().catch(err => console.error('[sync]', err));
  run();
  setInterval(run, minutes * 60 * 1000).unref();
  console.log(`[sync] enabled every ${minutes} minutes`);
}
module.exports = { startAutoSync };
