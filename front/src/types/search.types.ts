// 검색 결과 타입
export interface SearchListDTO {
    corpCode: string; // 기업코드
    corpName: string; // 기업이름
    ceoName: string; // ceo 이름
    stockType: string; // 상장/비상장
    establishDate: string; // 설립일
    keywords: string[]; // 키워드
    gptSummary: string; // 기업 소개
}