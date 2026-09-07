게임 발견 플랫폼 v10 - MEDIA GALLERY + LOCAL FIRST + SERVER READY

[지금 바로 실행]
1. ZIP 압축 해제
2. index.html 더블클릭
3. 서버/Node.js/Railway/DB 설치 없이 사용 가능

[게임 상세 페이지 미디어]
게임 카드를 눌러 상세 페이지로 들어가면 왼쪽 위 영역이 미디어 갤러리로 표시됩니다.

현재 로컬 모드:
- 현재 30개 게임에 트레일러 연결
- Steam 공식 게임 이미지 여러 장
- 아래 썸네일 클릭 -> 같은 자리에서 영상/사진 변경
- 좌우 화살표 및 키보드 ← → 로 이동
- 영상이 브라우저 정책상 재생되지 않을 경우 'YouTube에서 보기' 사용 가능
- 미디어는 인터넷에서 불러오기 때문에 인터넷 연결 필요

[나중에 서버를 연결했을 때]
/api/media/:steamAppId가 자동으로 Steam 데이터를 읽어서:
- Steam 스토어 트레일러
- 실제 인게임 스크린샷
을 상세 페이지 갤러리에 추가합니다.

따라서 앞으로 새 게임이 DB에 들어와도 Steam App ID만 있으면
상세 페이지를 게임마다 다시 코딩할 필요가 없습니다.

[데이터 모드]
무료 로컬 모드:
  HTML -> api-client.js -> data.js
  미디어 -> media-client.js -> 등록 트레일러 + Steam 정적 이미지

서버 모드:
  HTML -> /api/games -> DB
  미디어 -> /api/media/:appId -> Steam 스크린샷/영상
  실패하면 자동으로 로컬 데이터/미디어 사용

[관련 파일]
- media-client.js : 미디어 공급 방식 선택
- detail.js : 영상/사진 갤러리 UI
- server/providers/steam-media-provider.js : 미래 서버용 Steam 미디어 수집
- server/server.js : /api/media/:appId 라우트

[주의]
- 게임 영상/이미지는 프로젝트 ZIP 안에 복제하여 저장하지 않고 원본 서비스에서 로드합니다.
- 현재 로컬 모드의 사진은 Steam 공식 스토어 아트 중심입니다.
- 서버가 연결되면 실제 Steam 인게임 스크린샷을 자동으로 불러옵니다.
