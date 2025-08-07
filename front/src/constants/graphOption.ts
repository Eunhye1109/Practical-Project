import React from "react";

// 일반형 그래프제목 리스트
export const regularTypeTitle = ['매출과 이익 구조 비교', '수익성과 자산 효율성 추이', '부채·자본 구조의 구성 비율', '재무 안정성과 위험 수준 분석']

// 안정형 그래프제목 리스트
export const stableTypeTitle = ['기업 수익성과 안정성 한눈에 보기', '순이익', '자본총계', '부채 구조와 재무 안정성 점검', '영업이익', '유동자산', '유동부채', '레버리지비율', '수익성 지표 비교로 보는 기업 체력']

// 공격형 그래프제목 리스트
export const attackTypeTitle = ['매출과 이익의 성장 흐름', '수익성과 효율성의 추세 비교', '레버리지와 수익성 구조 분석', '매출과 자본의 성장 기반 비교', '수익성 지표 간 균형 평가', '이익과 자본의 관계 해석', '레버리지 기반 수익 구조', '부채와 매출 중심 성장 비교']

// 관리자형 그래프제목 리스트
export const adminTypeTitle = ['수익성과 효율성 흐름', '이익과 자본 구조 비교', '매출 대비 수익 흐름', '수익과 자본 구조의 균형', '자산과 자본의 구성 비율', '수익성과 유동성 흐름', '유동성과 자본의 구조 분석', '재무 위험 비율 구성']


// 일반형 그래프리스트
export const regularType: Record<number, string[]> = {
    0: ['매출액', '영업이익', '순이익'], // 그룹바
    1: ['ROE', 'ROA', '영업이익률'], // 라인
    2: ['부채총계', '자본총계', '유동부채'], // 스택
    3: ['부채비율', '자기자본비율', '레버리지비율'], // 복합형(라인/바)
};

// 안정형 그래프리스트
export const stableType = {
    // 조합 1
    0: ['ROE', '부채비율', '유동비율'], // 바+라인 복합형
    1: ['순이익'], // 바
    2: ['자본총계'], // 라인
    // 조합 2
    3: ['부채비율', '자기자본비율'], // 그룹바
    4: ['영업이익'], // 바
    5: ['유동자산'], // 바
    6: ['유동부채'], // 라인
    7: ['레버리지비율'], // 바
    // 조합 3
    8: ['ROE', 'ROA', '영업이익률', '매출액순이익률'] // 그룹바
};


// 공격형 그래프리스트
export const attackType: Record<number, string[]> = {
    0: ['매출액', '영업이익', '순이익'], // 그룹바
    1: ['ROE', 'ROA', '영업이익률'], // 라인
    2: ['ROE', '레버리지비율', '매출액순이익률'], // 복합형(라인/바)
    3: ['매출액', '영업이익', '자본총계'], // 스택
    4: ['영업이익률', '매출액순이익률', 'ROA'], // 라인
    5: ['순이익', '영업이익', '자본총계'], // 그룹바
    6: ['ROE', '레버리지비율', '자기자본비율'], // 파이
    7: ['부채총계', '자본총계', '매출액'], // 스택
}

// 관리자형 그래프리스트
export const adminType: Record<number, string[]> = {
    0: ['ROE', 'ROA', '영업이익률'], // 라인
    1: ['순이익', '자본총계', '부채총계'], // 그룹바
    2: ['영업이익', '순이익', '매출액'], // 그룹바
    3: ['ROE', '레버리지비율', '자기자본비율'], // 복합형(라인/바)
    4: ['부채총계', '자본총계', '유동자산'], // 스택
    5: ['매출액순이익률', 'ROA', '유동비율'], // 라인
    6: ['유동자산', '유동부채', '자본총계'], // 스택
    7: ['부채비율', '자기자본비율', '레버리지비율'], // 파이
}

// 일반형 텍스트 자료
export const regularTypeBodyText = (type: number) => {
  switch(type) {
    
    default:
      return {
        description: "",
        tips: []
      };

  }
}

// 안정형 텍스트 자료
export const stableTypeBodyText = (type: number) => {
  switch(type) {
    case 0:
        return {
            description: "기업 수익성과 안정성을 종합 비교",
            tips: [
                "ROE와 ROA가 높고 부채비율은 낮은 것이 이상적",
                "유동비율은 100% 이상이면 안정적"
            ]
        }
    case 1:
        return {
            description: '순이익',
            tips: [
                '순이익은 수익성을 직접 보여주어 ROE 등과 함께 보면 기업 실적 파악에 도움됨'
            ]
        }
    case 2:
        return {
            description: '자본총계',
            tips: [
                '자본총계는 재무 구조를 나타내어 부채비율 등과 함께 안정성 평가에 필수임'
            ]
        }
    case 3:
        return {
            description: "다양한 수익성 지표로 기업의 이익 창출력 분석",
            tips: [
                "ROE와 영업이익률 상승 추세를 주목",
                "각 지표 간 큰 차이는 원인 분석 필요"
            ]
        }
    case 4:
        return {
            description: '영업이익',
            tips: [
                '영업이익은 기업 수익성을 보여주어 재무 안정성 지표와 함께 보면 전반적 건전성 판단에 도움됨'
            ]
        }
    case 5:
        return {
            description: '유동자산',
            tips: [
                '유동자산은 단기 지급능력 평가에 필수이며 유동부채, 부채비율과 함께 봐야 정확함'
            ]
        }
    case 6:
        return {
            description: '유동부채',
            tips: [
                '유동부채는 단기 부채 부담을 보여주어 유동자산, 부채비율과 함께 분석해야 함'
            ]
        }
    case 7:
        return {
            description: '레버리지비율',
            tips: [
            '레버리지비율은 자본 대비 부채 활용도를 나타내어 부채비율 등과 함께 봐야 재무 위험성 평가 가능'
            ]
        }
    case 8:
        return {
            description: "다양한 수익성 지표로 기업의 이익 창출력 분석",
            tips: [
                "ROE와 영업이익률 상승 추세를 주목",
                "각 지표 간 큰 차이는 원인 분석 필요"
            ]
        }

    default:
      return {
        description: "",
        tips: []
      };
  }
}

// 공격형 텍스트 자료
export const attackTypeBodyText = (type: number) => {
  switch(type) {
    
    default:
      return {
        description: "",
        tips: []
      };

  }
}

// 관리자형 텍스트 자료
export const adminTypeBodyText = (type: number) => {
  switch(type) {
    
    default:
      return {
        description: "",
        tips: []
      };

  }
}
