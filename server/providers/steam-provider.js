async function sync(currentGames){
  // FUTURE INTEGRATION POINT
  // --------------------------------------
  // 여기에 Steam의 공식/허용된 데이터 소스를 연결합니다.
  // 목표:
  // 1) 새로운 유료 게임 탐지
  // 2) 기존 게임 가격/할인 갱신
  // 3) 이미지/장르/출시일 갱신
  // 4) 필요 시 Xbox 가격 공급자와 매칭
  //
  // 아직 외부 API 키/서버가 없어도 사이트가 동작해야 하므로
  // 지금은 기존 데이터를 그대로 반환합니다.
  return { games: currentGames, changed: 0 };
}
module.exports = { sync };
