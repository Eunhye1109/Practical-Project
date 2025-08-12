export interface GraphData {
    '연도': string | null | undefined,
    '순이익': number | null | undefined,  
    '영업이익': number | null | undefined,
    '매출액': number | null | undefined,   
    '부채총계': number | null | undefined,
    '자본총계': number | null | undefined,
    '유동자산': number | null | undefined,
    '유동부채': number | null | undefined,
    'jan_salary_am': number | null | undefined, // 1인 평균 급여
    'sm': number | null | undefined, // 직원 수
    'ROE': number | null | undefined,                   
    'ROA': number | null | undefined,                   
    '영업이익률': number | null | undefined,      
    '매출액순이익률': number | null | undefined,      
    '부채비율': number | null | undefined,            
    '유동비율': number | null | undefined,        
    '자기자본비율': number | null | undefined,          
    '레버리지비율': number | null | undefined,
    '매출액성장률': number | null | undefined,          
    '순이익성장률': number | null | undefined,
    "주당 현금배당금(원)": number | null | undefined | string,
    "현금배당수익률(%)": number | null | undefined | string,
    "주식배당수익률(%)": number | null | undefined | string,
}

// 리포트 데이터 양식
export interface ReportFullData {
  corpCode: string,
  corpName: string,
  // 기업 기본 소개
  header: {
    corpName: string, // 기업명
    logoUrl: string, // 로고 url
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
    summary: string // AI 분석 요약 내용
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
  // ai 그래프 분석
  aiGraphSummary: string[],
  // 연관기사 -> 총 3개 필요 [{}, {}, {}] 형태
  newsData: Array<{
    date: string, // 기사 날짜 -> 2025.00.00 양식
    title: string, //기사제목
    body: string, // 기사 본문
    link: string // 기사 링크
  }>,
  signalScore?: {
    corpName: string,
    signalScore: string
  },
  message?: string
}
