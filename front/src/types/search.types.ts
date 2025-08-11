// 검색 결과 타입
export interface SearchListDTO {
    corpName: string; // 기업이름
    gptSummary: string; // 기업 소개
    stockType: string; // 상장/비상장
    major: string; // 분야
    keywords: string[]; // 키워드
    corpCode: string; // 기업코드
}