
const COMMUNITY_SEED = [
  {id:1008,notice:true,title:"[공지] 게임 발견 커뮤니티 이용 안내",author:"관리자",date:"09.07",views:842,recs:34,content:"게임 추천, 할인 정보, 공략, 질문 등을 자유롭게 나누는 공간입니다.\n서로 존중하며 이용해주세요.",comments:[]},
  {id:1007,notice:false,title:"엘든링 처음 시작하는데 직업 뭐가 좋아요?",author:"빛바랜자",date:"13:21",views:128,recs:5,content:"소울류 처음인데 엘든링 시작해보려고 합니다.\n초보자가 하기 편한 직업이 뭔지 추천 부탁드립니다.",comments:[{author:"검은칼",text:"처음이면 방랑기사 무난합니다.",date:"13:28"},{author:"마법사",text:"원거리 좋아하면 점성술사도 편해요.",date:"13:36"}]},
  {id:1006,notice:false,title:"RDR2 지금 할인 가격이면 살만함?",author:"아서팬",date:"12:58",views:241,recs:11,content:"스토리 게임 좋아하는데 지금 할인 가격이면 바로 사도 될까요?",comments:[{author:"서부맨",text:"스토리 좋아하면 무조건 추천.",date:"13:02"}]},
  {id:1005,notice:false,title:"발더스게이트3 1회차 몇 시간 걸렸나요",author:"주사위굴림",date:"12:22",views:173,recs:7,content:"메인 위주로만 가면 70시간 정도 맞나요? 서브퀘도 조금 하고 싶습니다.",comments:[]},
  {id:1004,notice:false,title:"스팀 세일 정보 공유합니다",author:"할인사냥꾼",date:"11:47",views:390,recs:28,content:"RDR2, 문명6 등 할인 중인 게임들이 보이네요.\n상세 페이지 가격 비교 기능으로 보니까 편합니다.",comments:[{author:"겜린이",text:"정보 감사합니다.",date:"12:01"}]},
  {id:1003,notice:false,title:"페르소나5 로얄 vs 페르소나3 리로드",author:"JRPG좋아",date:"10:53",views:221,recs:4,content:"둘 중 하나만 산다면 어떤 걸 더 추천하시나요?",comments:[]},
  {id:1002,notice:false,title:"5시간 안쪽으로 끝나는 게임도 더 넣어주세요",author:"퇴근후겜",date:"10:20",views:89,recs:9,content:"직장인이라 긴 게임은 부담스럽네요. 짧고 굵은 게임 추천 부탁드립니다.",comments:[]},
  {id:1001,notice:false,title:"게임 태그 검색 기능 생각보다 좋네요",author:"카테고리맨",date:"09:41",views:74,recs:3,content:"게임 카드 태그 누르면 바로 해당 카테고리로 넘어가는 방식 마음에 듭니다.",comments:[]}
];

function loadCommunityPosts(){
  const saved = localStorage.getItem("gameDiscoveryCommunityPosts");
  if(saved){
    try{return JSON.parse(saved)}catch(e){}
  }
  localStorage.setItem("gameDiscoveryCommunityPosts",JSON.stringify(COMMUNITY_SEED));
  return JSON.parse(JSON.stringify(COMMUNITY_SEED));
}
function saveCommunityPosts(posts){
  localStorage.setItem("gameDiscoveryCommunityPosts",JSON.stringify(posts));
}
function nextPostId(posts){
  return posts.reduce((m,p)=>Math.max(m,Number(p.id)||0),1000)+1;
}
function todayCommunity(){
  const d=new Date();
  return String(d.getMonth()+1).padStart(2,"0")+"."+String(d.getDate()).padStart(2,"0");
}
