// 검색 결과 타입
export interface SearchListDTO {
    corpName: string; // 기업이름
    gptSummary: string; // 기업 소개
    stockType: string; // 상장/비상장
    major: string; // 분야
    keywords: string[]; // 키워드
    corpCode: string; // 기업코드
}

export interface GraphData {
    '연도': string | null | undefined,
    '순이익': number | null | undefined,  
    '영업이익': number | null | undefined,
    '매출액': number | null | undefined,   
    '부채총계': number | null | undefined,
    '자본총계': number | null | undefined,
    '유동자산': number | null | undefined,
    '유동부채': number | null | undefined,
    'ROE': number | null | undefined,                   
    'ROA': number | null | undefined,                   
    '영업이익률': number | null | undefined,      
    '매출액순이익률': number | null | undefined,      
    '부채비율': number | null | undefined,            
    '유동비율': number | null | undefined,        
    '자기자본비율': number | null | undefined,          
    '레버리지비율': number | null | undefined 
}

// 리포트 데이터 양식
export interface reportFullData {
  // 기업 기본 소개
  header: {
    corpName: string, // 기업명
    imgUrl: string, // 로고 url
    major: string, // 분야
    keyword: string[]
  },
  // 기업 상세 소개
  infoBox: {
    corpSummary: string, // 기업 소개
    infoData: string[] // ceo이름, 상장/비상장, 연간매출, 직원수, 설립일자 순서대로 담아주시면 됩니다.
  },
  // 종합 재무지표 -> 총 5개 필요 [{}, {}, {}, {}, {}] 형태
  rader: Array<{
    subject: string, // 지표이름
    A: number, // 업계평균값
    B: number, // 해당기업값
    fullMark: number // 최대치(이건 100으로 고정)
  }>,
  // AI 기업 분석 -> 총 2개 필요 [{}, {}] 형태
  aiSumary: Array<{
    emotion: string, // 긍정/부정
    sumary: string // AI 분석 요약 내용
  }>,
  // 유사 상장사 -> 총 3개 필요 [{}, {}, {}] 형태
  similarCorp: Array<{
    corpName: string, // 기업이름
    logo: string, // 로고 url
    probability: string, // 유사도
    basis: string // 유사도 근거
  }>,
  // 15개 지표 -> 지금 사용중인 양식 그대로
  graphData: GraphData[],
  // 연관기사 -> 총 3개 필요 [{}, {}, {}] 형태
  newsData: Array<{
    date: string, // 기사 날짜 -> 2025.00.00 양식
    title: string, //기사제목
    body: string, // 기사 본문
    url: string // 기사 링크
  }>
}

