import React from "react";

// 안정형 그래프제목 리스트
export const stableTypeTitle = ['자본, 부채 구조', '부채비율 3년 평균', '유동비율 3년 평균', '유동 비율 & 레버리지', '유동성 상태', '재무 건전성']

// 공격형 그래프제목 리스트
export const attackTypeTitle = ['매출과 영업이익 추이', '매출 성장률', '순이익 성장률', '수익성 비교', '순이익 추이', '재무 건전성']

// 혼합형 그래프제목 리스트
export const adminTypeTitle = ['균형 비율', '수익성, 효율', '매출, 영업이익 추이', '재무 건전성']

// 안정형 그래프리스트
export const stableType = {
    // 조합 1
    0: ['부채비율', '자기자본비율'], // 바+라인 복합형
    1: ['부채비율'], // 바
    2: ['유동비율'], // 라인
    // 조합 2
    3: ['유동비율', '레버리지비율'], // 그룹바
    4: ['유동자산', '유동부채'], // 바
    // 조합 3
    5: ['유동비율', '부채비율', '레버리지비율', 'ROE'] // 그룹바
};


// 공격형 그래프리스트
export const attackType: Record<number, string[]> = {
    // 조합1
    0: ['매출액', '영업이익'], // 그룹바
    1: ['매출성장률'], // 라인
    2: ['순이익성장률'], // 복합형(라인/바)
    // 조합2
    3: ['ROE', 'ROA', '영업이익률'], // 스택
    4: ['순이익'], // 라인
    // 조합3
    5: ['유동비율', '부채비율', '레버리지비율', 'ROE']
}

// 혼합형 그래프리스트
export const adminType: Record<number, string[]> = {
    // 조합1
    0: ['ROE', 'ROA', '영업이익률', '부채비율', '유동비율'], // 라인
    // 조합2
    1: ['ROE', '영업이익률', '매출액순이익률'], // 그룹바
    2: ['매출액', '영업이익'], // 그룹바
    // 조합3
    3: ['유동비율', '부채비율', '레버리지비율', 'ROE']
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
            description: "회사의 빚과 자본이 얼마나 균형을 이루고 있는지 보여줍니다.",
            tips: [
                "빛과 자본의 군형"
            ]
        }
    case 1:
        return {
            description: '부채비율 3년 평균',
            tips: [
                '부채 안정성'
            ]
        }
    case 2:
        return {
            description: '유동비율 3년 평균',
            tips: [
                '지급능력 유지력'
            ]
        }
    case 3:
        return {
            description: "회사 재무가 안전한지, 빚이 과한지 간단히 확인할 수 있습니다.",
            tips: [
                "재무 안전지대"
            ]
        }
    case 4:
        return {
            description: '단기적으로 회사가 현금처럼 쓸 수 있는 자산과 갚아야 할 빚을 비교합니다.',
            tips: [
                '단기 버틸 힘'
            ]
        }
    case 5:
        return {
            description: '재무 상태와 수익성을 종합해 위험 신호를 한눈에 알려줍니다.',
            tips: [
                '위험경고'
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

    case 0:
        return {
            description: "회사가 얼마나 팔고, 그중 얼마나 이익으로 남겼는지 보여줍니다.",
            tips: [
                "규모와 벌이"
            ]
        }
    case 1:
        return {
            description: '매출 성장률',
            tips: [
                '팔이 늘었나?'
            ]
        }
    case 2:
        return {
            description: '순이익 성장률',
            tips: [
                '실제 벌이 성장?'
            ]
        }
    case 3:
        return {
            description: "자본과 자산을 얼마나 효율적으로 돈 버는 데 쓰는지 비교합니다.",
            tips: [
                "자본, 자산 활용 효율"
            ]
        }
    case 4:
        return {
            description: '모든 비용과 세금을 빼고 실제로 남은 돈의 흐름을 보여줍니다.',
            tips: [
                '순수 남는 돈'
            ]
        }
    case 5:
        return {
            description: '재무 상태와 수익성을 종합해 위험 신호를 한눈에 알려줍니다.',
            tips: [
                '위험경고'
            ]
        }
    
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
    case 0:
        return {
            description: "수익성, 안정성, 성장성을 함께 살펴 회사의 종합 건강 상태를 보여줍니다.",
            tips: [
                "성장, 안정 종합 위치"
            ]
        }
    case 1:
        return {
            description: '매출에서 이익이 얼마나 잘 나오는지와 돈 버는 구조를 확인합니다.',
            tips: [
                '돈 버는 구조'
            ]
        }
    case 2:
        return {
            description: '얼마나 팔고, 그중 얼마를 실제 벌이로 남겼는지 보여줍니다.',
            tips: [
                '규모와 벌이'
            ]
        }
    case 3:
        return {
            description: "재무 상태와 수익성을 종합해 위험 신호를 한눈에 알려줍니다.",
            tips: [
                "위험경고"
            ]
        }
    
    default:
      return {
        description: "",
        tips: []
      };

  }
}
