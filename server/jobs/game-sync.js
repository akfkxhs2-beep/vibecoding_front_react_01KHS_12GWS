const { getGames, replaceGames } = require('../storage');
const steam = require('../providers/steam-provider');

async function runGameSync(){
  const current = await getGames();

  // 현재는 안전한 스캐폴딩 단계입니다.
  // 나중에 실제 Steam/가격 공급자를 연결하면 아래 provider가
  // 신작 발견, 가격 변경, 할인 변경을 반환하도록 확장할 수 있습니다.
  const result = await steam.sync(current);

  if(result && Array.isArray(result.games) && result.games.length){
    await replaceGames(result.games);
    console.log(`[sync] saved ${result.games.length} games`);
  }
}
module.exports = { runGameSync };
