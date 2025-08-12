import React from "react";

// 안정형 그래프제목 리스트
export const stableTypeTitle = ['부채 안정성 지수', '비상금 지갑 크기', '지갑 속 현금 사정', '3년간 빚 부담의 평균선', '3년간 버틸 여력의 평균선', '재무 체력 변화 한눈에 보기']

// 공격형 그래프제목 리스트
export const attackTypeTitle = ['매출·이익 가속도', '수익 파워 지수', '순이익 점프율', '매출 벌이 속도', '순이익 벌이 속도', '재무 체력 변화 한눈에 보기']

// 혼합형 그래프제목 리스트
export const adminTypeTitle = ['재무 밸런스 점검표', '안정성과 수익 더블체크', '매출 성장 곡선', '재무 체력 변화 한눈에 보기']

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
            description: "빚 부담이 줄었을까 늘었을까?",
            tips: [
                '도출 방법',
                "최근 3개년 부채비율 평균"
            ]
        }
    case 1:
        return {
            description: '단기 채무를 감당할 여력이 있을까?',
            tips: [
                '도출 방법',
                '최근 3개년 유동비율과 레버리지 비율 추이'
            ]
        }
    case 2:
        return {
            description: '당장 현금이 얼마나 있나?',
            tips: [
                '도출 방법',
                '유동부채 절대값, 유동자산 절대값 비교'
            ]
        }
    case 3:
        return {
            description: "지난 3년 평균 빚이 안전선 안에 있을까?",
            tips: [
                '도출 방법',
                "(부채비율_2022 + 부채비율_2023 + 부채비율_2024) ÷ 3"
            ]
        }
    case 4:
        return {
            description: '지난 3년 동안 버틸 힘이 유지됐을까?',
            tips: [
                '도출 방법',
                '(유동비율_2022 + 유동비율_2023 + 유동비율_2024) ÷ 3'
            ]
        }
    case 5:
        return {
            description: '체력이 회복 중일까, 악화 중일까?',
            tips: [
                '도출 방법',
                'ROE, 레버리지비율, 부채비율, 유동비율 '
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
            description: "실적이 얼마나 빠르게 늘고 있을까?",
            tips: [
                '도출 방법',
                "3개년 매출액과 영업이익"
            ]
        }
    case 1:
        return {
            description: '영업이익률이 업계 평균보다 높을까?',
            tips: [
                '도출 방법',
                'ROA (총자산수익률): 가진 모든 자산으로 돈을 얼마나 잘 벌었는지',
                'ROA = (당기순이익 ÷ 총자산) × 100',
                'ROE (자기자본이익률): 주주 돈으로 얼마를 벌었는지',
                'ROE = (당기순이익 ÷ 자기자본) × 100',
                '영업이익률: 매출 중에서 실제로 남긴 영업이익 비율',
                '영업이익률 = (영업이익 ÷ 매출액) × 100',
                '(현금, 주식) 배당수익률(%)": 17.9',
            ]
        }
    case 2:
        return {
            description: '최근 순이익이 얼마나 뛰었을까?',
            tips: [
                '도출 방법',
                '3개년 순이익 추이'
            ]
        }
    case 3:
        return {
            description: "“앞으로 얼마나 더 벌 수 있나?”",
            tips: [
                '도출 방법',
                "(금년도 매출액 − 전년도 매출액) ÷ 전년도 매출액 × 100"
            ]
        }
    case 4:
        return {
            description: '앞으로 더 벌 수 있나?',
            tips: [
                '도출 방법',
                '(금년도 순이익 − 전년도 순이익) ÷ 전년도 순이익 × 100'
            ]
        }
    case 5:
        return {
            description: '체력이 회복 중일까, 악화 중일까?',
            tips: [
                '도출 방법',
                'ROE, 레버리지비율, 부채비율, 유동비율'
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
            description: "수익·안정·성장의 균형이 잘 지켜지고 있을까?",
            tips: [
                "-"
            ]
        }
    case 1:
        return {
            description: '부채 관리와 수익 창출이 균형 잡혔을까?',
            tips: [
                '-'
            ]
        }
    case 2:
        return {
            description: '매출과 이익이 꾸준히 늘고 있을까?',
            tips: [
                '-'
            ]
        }
    case 3:
        return {
            description: "체력이 회복 중일까, 악화 중일까?",
            tips: [
                '도출 방법',
                "ROE, 레버리지비율, 부채비율, 유동비율"
            ]
        }
    
    default:
      return {
        description: "",
        tips: []
      };

  }
}
