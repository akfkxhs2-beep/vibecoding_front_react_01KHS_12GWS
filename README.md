역할]

너는 초보 개발자를 지원하는 시니어 React 프론트엔드 개발자이자 UI/UX 설계자다.
첨부한 `game-discovery-platform-v10-media-gallery.zip` 프로젝트를 분석하고, 기존 디자인과 기능을 유지하면서 React 기반 프로젝트로 재구성해줘.

단순한 예제 화면이 아니라 실제로 실행하고 테스트할 수 있는 완성도 높은 반응형 웹사이트를 제작해야 한다.

──────────────────────────────────
[프로젝트 기본 정보]
──────────────────────────────────

프로젝트명: 000

개발 환경:
- Windows 11
- Visual Studio Code
- Vite
- React
- JavaScript
- CSS Modules 또는 일반 CSS
- 현재 단계에서는 백엔드와 DB를 사용하지 않음
- 별도의 서버 없이 `npm run dev`로 실행 가능해야 함

현재 데이터 저장 방식:
- 게임 데이터: React 내부 mock 데이터
- 게시글·댓글·찜 목록: localStorage
- 외부 이미지 로딩 실패 시 대체 UI 표시

향후 확장 예정:
- Backend: Python FastAPI
- DBMS: PostgreSQL 또는 MySQL
- REST API 연동
- 사용자 로그인 및 인증
- 실제 게임 데이터와 가격 정보 연동

중요:
현재 첨부 프로젝트에 포함된 Node.js·Express 서버는 사용하지 않는다.
현재 버전은 프론트엔드만으로 완전히 작동하도록 구현하되, 향후 FastAPI API로 쉽게 교체할 수 있는 구조로 작성한다.

──────────────────────────────────
[핵심 목표]
──────────────────────────────────

사용자가 다음 조건을 선택하면 조건에 맞는 게임을 검색하고 추천해주는 반응형 게임 발견 플랫폼을 제작한다.

검색 조건:
1. 게임 이름
2. 장르
3. 분위기
4. 플레이타임
5. Steam 평점
6. Metascore
7. 가격대
8. 플랫폼
9. 태그

PC, 태블릿, 모바일에서 모두 자연스럽게 작동해야 한다.

──────────────────────────────────
[첨부 프로젝트에서 유지할 기능]
──────────────────────────────────

1. 홈 화면
- 상단 로고와 내비게이션
- 홈
- 카테고리
- 인기 게임
- 커뮤니티
- 게임 이름·장르·분위기 검색창
- “오늘은 무슨 게임 할까?” 히어로 영역
- 오픈월드, RPG, 협동, 스토리, 소울라이크, JRPG 추천 태그
- 선택한 태그 기반 게임 추천
- 게임 룰렛
- 인기 게임 카드
- 플레이타임별 게임 찾기 이동 버튼

2. 게임 검색 및 필터
- 검색어 입력 시 실시간 필터링
- 장르 복수 선택
- 분위기 복수 선택
- 태그 복수 선택
- 플레이타임 복수 선택
- 평점 범위 선택
- 가격대 선택
- 플랫폼 선택
- 필터 초기화
- 검색 결과 개수 표시
- 조건에 맞는 게임이 없을 때 빈 결과 안내
- URL Query String에 검색 조건 반영
- 새로고침 후에도 URL 조건 유지
- 태그를 클릭하면 해당 태그 필터 적용

3. 플레이타임 필터
- 0~5시간
- 6~10시간
- 11~15시간
- 16~20시간
- 21~25시간
- 26~30시간
- 31~35시간
- 36~40시간
- 41~45시간
- 46~50시간
- 50시간 이상
- 메인 스토리 없음

4. 정렬 기능
- 추천순
- Steam 평점순
- Metascore순
- 낮은 가격순
- 높은 가격순
- 짧은 플레이타임순
- 긴 플레이타임순
- 이름순

5. 게임 카드
각 카드에는 다음 내용을 표시한다.
- 게임 대표 이미지
- 게임 이름
- 한 줄 설명
- 장르 및 태그
- 메인 스토리 플레이타임
- Steam 평가
- 현재 최저가격
- 할인율
- 플랫폼
- 찜하기 버튼

카드 클릭 시 게임 상세 페이지로 이동한다.
태그 클릭 시 카드 이동이 발생하지 않고 해당 필터만 적용한다.

6. 게임 상세 페이지
- 이전 페이지 버튼
- 게임 이름
- 상세 설명
- 장르 및 태그
- Steam 평가
- Metascore
- 메인 스토리 플레이타임
- Steam 가격
- Xbox 가격
- 정상가
- 할인가
- 할인율
- 더 저렴한 스토어 강조
- 스토어 이동 버튼
- 가격 정보 기준일 안내
- 추천 게임 목록

7. 미디어 갤러리
- 공식 트레일러
- YouTube 영상
- Steam 이미지
- 인게임 스크린샷
- 대표 미디어 영역
- 영상과 이미지 썸네일
- 썸네일 클릭 시 대표 화면 변경
- 이전·다음 화살표
- 키보드 좌우 방향키 이동
- 현재 순서 표시
- 미디어 설명 표시
- 영상 재생이 안 될 경우 YouTube에서 보기
- 이미지 오류 시 대체 화면
- 모바일에서는 터치하기 편한 UI 적용

8. 게임 룰렛
- 버튼 클릭 시 회전 애니메이션
- 중복 클릭 방지
- 선택한 필터가 있으면 해당 조건 안에서 추천
- 조건이 없으면 전체 게임 중 무작위 추천
- 룰렛 결과에서 게임 상세 페이지로 이동 가능
- `prefers-reduced-motion` 사용자는 과도한 애니메이션을 줄여서 표시

9. 찜하기
- 게임 카드와 상세 페이지에 찜 버튼 제공
- 로그인 없이 localStorage에 저장
- 찜한 게임 목록 페이지 제공
- 새로고침 후에도 데이터 유지
- 같은 게임 중복 저장 방지
- 찜 해제 가능

10. 커뮤니티
- 게시글 목록
- 공지 게시글 상단 고정
- 게시글 검색
- 제목 검색
- 작성자 검색
- 제목+내용 검색
- 게시글 상세 보기
- 글쓰기
- 댓글 작성
- 추천 버튼
- 조회수 표시
- 페이지네이션 UI
- 게시글과 댓글은 localStorage에 저장
- 입력값 검증
- 빈 제목·작성자·내용 등록 방지
- 사용자 입력값을 HTML 문자열로 직접 삽입하지 않아 XSS 위험 방지

──────────────────────────────────
[React 폴더 및 파일 구조]
──────────────────────────────────

기능별로 다음과 같이 분리한다.

000/
├─ public/
│  ├─ favicon.svg
│  └─ images/
│     └─ fallback-game.svg
├─ src/
│  ├─ assets/
│  │  └─ styles/
│  │     ├─ reset.css
│  │     ├─ variables.css
│  │     └─ global.css
│  ├─ components/
│  │  ├─ common/
│  │  │  ├─ Header.jsx
│  │  │  ├─ Footer.jsx
│  │  │  ├─ Layout.jsx
│  │  │  ├─ Button.jsx
│  │  │  ├─ LoadingSpinner.jsx
│  │  │  ├─ EmptyState.jsx
│  │  │  └─ ErrorBoundary.jsx
│  │  ├─ game/
│  │  │  ├─ GameCard.jsx
│  │  │  ├─ GameGrid.jsx
│  │  │  ├─ GameFilters.jsx
│  │  │  ├─ GameSearchBar.jsx
│  │  │  ├─ GameSort.jsx
│  │  │  ├─ GameRoulette.jsx
│  │  │  ├─ GameScore.jsx
│  │  │  ├─ PriceCard.jsx
│  │  │  ├─ FavoriteButton.jsx
│  │  │  └─ MediaGallery.jsx
│  │  └─ community/
│  │     ├─ PostList.jsx
│  │     ├─ PostRow.jsx
│  │     ├─ PostForm.jsx
│  │     ├─ PostSearch.jsx
│  │     ├─ CommentList.jsx
│  │     └─ CommentForm.jsx
│  ├─ pages/
│  │  ├─ HomePage.jsx
│  │  ├─ CategoryPage.jsx
│  │  ├─ GameDetailPage.jsx
│  │  ├─ FavoritesPage.jsx
│  │  ├─ CommunityPage.jsx
│  │  ├─ CommunityPostPage.jsx
│  │  ├─ CommunityWritePage.jsx
│  │  └─ NotFoundPage.jsx
│  ├─ hooks/
│  │  ├─ useGames.js
│  │  ├─ useGameFilters.js
│  │  ├─ useFavorites.js
│  │  ├─ useLocalStorage.js
│  │  └─ useCommunity.js
│  ├─ services/
│  │  ├─ apiClient.js
│  │  ├─ gameService.js
│  │  ├─ mediaService.js
│  │  └─ communityService.js
│  ├─ data/
│  │  ├─ games.js
│  │  ├─ categories.js
│  │  └─ communitySeed.js
│  ├─ utils/
│  │  ├─ filterGames.js
│  │  ├─ sortGames.js
│  │  ├─ formatPrice.js
│  │  ├─ timeBucket.js
│  │  ├─ validators.js
│  │  └─ storageKeys.js
│  ├─ constants/
│  │  ├─ routes.js
│  │  ├─ filters.js
│  │  └─ api.js
│  ├─ router/
│  │  └─ AppRouter.jsx
│  ├─ App.jsx
│  └─ main.jsx
├─ .env.example
├─ index.html
├─ package.json
├─ vite.config.js
└─ README.md

컴포넌트마다 필요한 CSS 파일도 함께 분리한다.

예:
- GameCard.jsx
- GameCard.css
- MediaGallery.jsx
- MediaGallery.css

──────────────────────────────────
[라우팅]
──────────────────────────────────

다음 경로를 구성한다.

- `/` : 홈
- `/games` : 게임 검색 및 카테고리
- `/games/:gameId` : 게임 상세
- `/favorites` : 찜한 게임
- `/community` : 커뮤니티 목록
- `/community/write` : 글쓰기
- `/community/:postId` : 게시글 상세
- `*` : 404 페이지

React Router를 사용한다.
브라우저 뒤로가기와 앞으로가기가 정상 동작해야 한다.

──────────────────────────────────
[게임 데이터 모델]
──────────────────────────────────

mock 게임 데이터는 최소 30개를 작성한다.
첨부 프로젝트의 기존 게임 데이터를 가능한 한 유지한다.

각 게임은 다음 구조를 사용한다.

{
  id: "elden-ring",
  steamAppId: "1245620",
  name: "ELDEN RING",
  koreanName: "엘든 링",
  description: "게임 설명",
  genres: ["RPG", "액션"],
  moods: ["어두운", "도전적인"],
  tags: ["오픈월드", "소울라이크"],
  platforms: ["Steam", "Xbox"],
  mainStoryHours: 58,
  storyless: false,
  steamRating: 92.5,
  metascore: 96,
  releaseDate: "2022-02-25",
  coverImage: "이미지 URL",
  prices: {
    steam: {
      current: 64800,
      original: 64800,
      currency: "KRW",
      url: "스토어 URL"
    },
    xbox: {
      current: 64800,
      original: 64800,
      currency: "KRW",
      url: "스토어 URL"
    }
  },
  media: [
    {
      id: "media-1",
      type: "youtube",
      youtubeId: "영상 ID",
      label: "공식 트레일러",
      thumbnail: "썸네일 URL",
      externalUrl: "YouTube URL"
    },
    {
      id: "media-2",
      type: "image",
      url: "이미지 URL",
      label: "인게임 스크린샷",
      isScreenshot: true
    }
  ]
}

가격, 평점, 출시일 등 변경될 수 있는 정보에는 반드시 기준일과 “실제 가격과 다를 수 있음” 안내를 표시한다.

──────────────────────────────────
[백엔드 교체를 고려한 서비스 계층]
──────────────────────────────────

React 컴포넌트가 `games.js`를 직접 import하지 않게 한다.

반드시 다음 흐름을 사용한다.

React Component
→ Custom Hook
→ Service
→ 현재 mock 데이터
→ 향후 FastAPI REST API

현재 `gameService.js` 예시:

- `getGames(filters)`
- `getGameById(gameId)`
- `getPopularGames()`
- `getRecommendedGames(filters)`
- `getGameMedia(gameId)`

현재는 mock Promise를 반환한다.
나중에는 내부 구현만 `fetch()` 또는 Axios 호출로 바꿀 수 있어야 한다.

환경변수:

VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_USE_MOCK_DATA=true

`VITE_USE_MOCK_DATA=true`이면 mock 데이터를 사용한다.
API 호출 실패 시 사용자에게 오류 메시지와 다시 시도 버튼을 표시한다.

현재 버전에서는 FastAPI 코드나 데이터베이스 연결 코드를 작성하지 않는다.
단, README에 향후 API 연결 위치와 예상 엔드포인트를 설명한다.

예상 FastAPI 엔드포인트:

- `GET /api/v1/games`
- `GET /api/v1/games/{game_id}`
- `GET /api/v1/games/{game_id}/media`
- `GET /api/v1/recommendations`
- `GET /api/v1/posts`
- `POST /api/v1/posts`
- `GET /api/v1/posts/{post_id}`
- `POST /api/v1/posts/{post_id}/comments`
- `POST /api/v1/auth/login`

──────────────────────────────────
[향후 DB 설계를 고려한 규칙]
──────────────────────────────────

PostgreSQL과 MySQL 중 하나로 쉽게 구현할 수 있도록 다음 엔티티를 기준으로 데이터 모델을 분리한다.

- users
- games
- genres
- game_genres
- moods
- game_moods
- tags
- game_tags
- platforms
- game_platforms
- store_prices
- game_media
- favorites
- community_posts
- community_comments
- post_recommendations

프론트엔드에서는 DB 구조에 직접 의존하지 않는다.
API 응답을 프론트엔드 모델로 변환하는 mapper 함수를 서비스 계층에 둔다.

──────────────────────────────────
[디자인 요구사항]
──────────────────────────────────

첨부 프로젝트의 디자인 특징을 유지한다.

- 다크 네이비 배경
- 블루·보라색 그라데이션
- 미래적인 게임 플랫폼 분위기
- 카드형 UI
- 둥근 모서리
- 은은한 테두리와 그림자
- 흰색 중심의 읽기 쉬운 타이포그래피
- 할인 가격은 녹색 계열 강조
- 주요 버튼은 보라색 또는 블루 계열
- 선택된 필터를 명확하게 표시
- 과도한 애니메이션은 사용하지 않음

반응형 기준:
- Desktop: 1200px 이상
- Tablet: 768px~1199px
- Mobile: 767px 이하

모바일 요구사항:
- 내비게이션 메뉴 버튼 제공
- 필터 패널 접기·펼치기
- 게임 카드는 한 열 또는 두 열
- 버튼 터치 영역 최소 44px
- 긴 게임 제목 말줄임 처리
- 가로 스크롤 발생 금지
- 미디어 썸네일은 가로 스크롤 허용

──────────────────────────────────
[접근성 및 품질 요구사항]
──────────────────────────────────

- 모든 이미지에 의미 있는 alt 작성
- 아이콘만 있는 버튼에 aria-label 작성
- 키보드로 메뉴, 필터, 카드, 갤러리 조작 가능
- 포커스 표시 제거 금지
- 색상만으로 선택 상태를 전달하지 않음
- `<button>`과 `<a>` 역할을 구분
- 외부 링크에는 `target="_blank"`와 `rel="noopener noreferrer"` 적용
- 사용자 입력값 검증
- 사용자 입력을 `dangerouslySetInnerHTML`로 출력하지 않음
- 배열 렌더링 시 안정적인 고유 key 사용
- 컴포넌트 언마운트 후 상태 변경 방지
- 콘솔 오류와 경고가 없어야 함
- 이미지 로딩 실패 처리
- 로딩·오류·빈 결과 상태를 각각 구현

──────────────────────────────────
[라이브러리 사용 규칙]
──────────────────────────────────

기본 사용 가능:
- react
- react-dom
- react-router-dom

위 라이브러리 이외의 패키지는 임의로 추가하지 않는다.
추가 패키지가 반드시 필요하다면 먼저 다음 내용을 설명한다.

1. 패키지 이름
2. 필요한 이유
3. 패키지 없이 구현 가능한지
4. 설치 명령어

상태 관리는 우선 React의 `useState`, `useMemo`, `useContext`, Custom Hook을 사용한다.
Redux, Zustand 등은 현재 단계에서 사용하지 않는다.

──────────────────────────────────
[코딩 규칙]
──────────────────────────────────

- 함수형 컴포넌트 사용
- 컴포넌트는 하나의 역할만 담당
- 반복되는 UI는 재사용 컴포넌트로 작성
- 비즈니스 로직은 컴포넌트에서 분리
- 필터링과 정렬은 순수 함수로 작성
- 상수와 localStorage key는 별도 파일로 관리
- 초보자가 이해할 수 있는 핵심 주석 작성
- 의미 없는 주석은 작성하지 않음
- 변수와 함수 이름은 영어로 작성
- 화면 문구는 자연스러운 한국어 사용
- 절대경로 alias `@/` 설정
- 하드코딩된 숫자와 문자열 최소화
- 기존 첨부 파일을 React 코드 안에 그대로 복사만 하지 말고 기능별로 재구성

──────────────────────────────────
[작업 순서]
──────────────────────────────────

다음 순서로 작업한다.

1. 첨부 ZIP의 화면, 데이터, 기능 분석
2. 기존 기능 목록 정리
3. React 프로젝트 구조 생성
4. 공통 레이아웃 및 라우터 구현
5. mock 게임 데이터 이전
6. 홈 화면 구현
7. 게임 검색·필터·정렬 구현
8. 게임 상세 페이지 구현
9. 미디어 갤러리 구현
10. 룰렛과 추천 기능 구현
11. 찜하기 구현
12. 커뮤니티 구현
13. 반응형 디자인 적용
14. 접근성 및 오류 처리
15. 빌드 오류 수정
16. README 작성
17. 최종 테스트

기존 파일은 바로 삭제하지 말고 먼저 분석한다.
필요한 파일만 생성하거나 수정한다.

──────────────────────────────────
[검증 항목]
──────────────────────────────────

완료 후 다음 사항을 직접 확인한다.

- `npm install` 성공
- `npm run dev` 성공
- `npm run build` 성공
- 모든 페이지 이동 정상
- 검색 정상
- 여러 필터 동시 적용 정상
- 필터 초기화 정상
- 정렬 정상
- 게임 카드 상세 이동 정상
- 룰렛 중복 클릭 방지 정상
- 갤러리 썸네일 및 방향키 정상
- 이미지 오류 대체 화면 정상
- 찜 목록 localStorage 저장 정상
- 게시글과 댓글 localStorage 저장 정상
- 새로고침 후 데이터 유지
- 존재하지 않는 게임 ID 처리
- 존재하지 않는 게시글 ID 처리
- 모바일 메뉴 정상
- 320px 화면에서 가로 스크롤 없음
- 콘솔 오류 없음

──────────────────────────────────
[실행 명령어]
──────────────────────────────────

프로젝트 생성 및 실행 명령어를 README에 작성한다.

npm install
npm run dev
npm run build
npm run preview

Windows PowerShell과 VS Code 터미널에서 실행할 수 있도록 설명한다.

──────────────────────────────────
[결과 보고 형식]
──────────────────────────────────

모든 작업이 끝난 후 다음 형식으로 보고한다.

1. 첨부 프로젝트에서 확인한 기존 기능
2. 생성한 전체 폴더 구조
3. 생성·수정한 파일 목록
4. 페이지별 구현 기능
5. localStorage에 저장되는 항목
6. 향후 FastAPI 연동 시 수정할 파일
7. 향후 PostgreSQL/MySQL 적용 위치
8. 설치 및 실행 명령어
9. 확인 방법
10. 발생할 수 있는 오류와 해결 방법

한 번에 전체 코드를 무작정 출력하지 말고, 실제 프로젝트 파일을 생성·수정하면서 단계적으로 진행해줘.
각 단계가 끝날 때 작업 내용과 다음 단계를 간단히 알려줘.
기존 디자인과 기능이 누락되지 않도록 마지막에 요구사항 체크리스트와 실제 구현을 비교해줘. 
