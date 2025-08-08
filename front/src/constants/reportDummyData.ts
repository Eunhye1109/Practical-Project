import React from "react";
import { ReportFullData } from "types/report.types";

export const reportFullDummyData: ReportFullData = {
  // 기업 기본 소개
  header: {
    corpName: '무신사',
    imgUrl: 'https://res.cloudinary.com/zuzu-homepage/image/upload/f_auto,q_auto/v1739446680/p4rn9qxymke0lda94pzk.jpg',
    major: '패션',
    keyword: ['키워드1', '키워드2', '키워드3']
  },
  // 기업 상세 소개
  infoBox: {
    corpSummary: 'asdfasdfad',
    infoData: ['김호성', '비상장', '500억원', '200명', '2025.08.14']
  },
  // 종합 재무지표 -> 총 5개 필요 [{}, {}, {}, {}, {}] 형태
  rader: [
    {
        subject: '수익성',
        A: 50,
        B: 70,
        fullMark: 100,
    },
    {
        subject: '안정성',
        A: 98,
        B: 50,
        fullMark: 100,
    },
    {
        subject: '성장성',
        A: 86,
        B: 50,
        fullMark: 100,
    },
    {
        subject: '효율성',
        A: 99,
        B: 100,
        fullMark: 100,
    },
    {
        subject: '유동성',
        A: 85,
        B: 90,
        fullMark: 100,
    },
    ],
  // AI 기업 분석 -> 총 2개 필요 [{}, {}] 형태
  aiSumary: [
    {emotion: '긍정', sumary: '아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아'},
    {emotion: '부정', sumary: '아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아'},
    ],
  // 유사 상장사 -> 총 3개 필요 [{}, {}, {}] 형태
  similarCorp: [
    {
        corpName: '무신사',
        logo: 'https://res.cloudinary.com/zuzu-homepage/image/upload/f_auto,q_auto/v1739446680/p4rn9qxymke0lda94pzk.jpg',
        probability: '98%',
        basis: '이러이러한 이유로 이러이러한 유사점을 찾을 수 있었다'
    },
    {
        corpName: '무신사',
        logo: 'https://res.cloudinary.com/zuzu-homepage/image/upload/f_auto,q_auto/v1739446680/p4rn9qxymke0lda94pzk.jpg',
        probability: '98%',
        basis: '이러이러한 이유로 이러이러한 유사점을 찾을 수 있었다'
    },
    {
        corpName: '무신사',
        logo: 'https://res.cloudinary.com/zuzu-homepage/image/upload/f_auto,q_auto/v1739446680/p4rn9qxymke0lda94pzk.jpg',
        probability: '98%',
        basis: '이러이러한 이유로 이러이러한 유사점을 찾을 수 있었다'
    }
    ],
  // 15개 지표 -> 지금 사용중인 양식 그대로
  graphData: [
    {
        '연도': "2022",                // 연도
        '순이익': 25418778000000,  // 순이익
        '영업이익': 25319329000000, // 영업이익
        '매출액': 211867483000000,   // 매출액
        '부채총계': 50667559000000, // 부채총계
        '자본총계': 209416191000000,     // 자본총계
        '유동자산': 59062658000000,    // 유동자산
        '유동부채': 46086047000000, // 유동부채
        'ROE': 12.14,                   // 자기자본이익률 (Return on Equity)
        'ROA': 9.77,                    // 총자산이익률 (Return on Assets)
        '영업이익률': 11.95,       // 영업이익률
        '매출액순이익률': 12.0,        // 매출액순이익률
        '부채비율': 24.19,             // 부채비율
        '유동비율': 128.16,         // 유동비율
        '자기자본비율': 80.52,           // 자기자본비율
        '레버리지비율': 124.19         // 레버리지비율
    },
    {
        '연도': "2023",
        '순이익': 25397099000000,  
        '영업이익': -11526297000000,
        '매출액': 170374090000000,   
        '부채총계': 72069515000000,
        '자본총계': 224787774000000,
        '유동자산': 68548442000000,
        '유동부채': 41775101000000,
        'ROE': 11.3,                   
        'ROA': 8.56,                   
        '영업이익률': -6.77,      
        '매출액순이익률': 14.91,      
        '부채비율': 32.06,            
        '유동비율': 164.09,        
        '자기자본비율': 75.72,          
        '레버리지비율': 132.06        
    },
    {
        '연도': "2024",
        '순이익': null,
        '영업이익': 12361034000000,
        '매출액': 209052241000000,
        '부채총계': 88569470000000,
        '자본총계': 236396657000000,
        '유동자산': 82320322000000,
        '유동부채': 80157976000000,
        'ROE': 9.98,                   
        'ROA': 7.26,                   
        '영업이익률': 5.91,       
        '매출액순이익률': 11.28,      
        '부채비율': 37.47,            
        '유동비율': 102.7,         
        '자기자본비율': 72.75,          
        '레버리지비율': 137.47        
    }
  ],
  // 그래프 분석
  aiGraphSummary: [
    'afsdfasdfadsfasdasd1',
    'afsdfasdfadsfasdsada2',
    'afsdfasdfadsfasdasdadsa3'
  ],
  // 연관기사 -> 총 3개 필요 [{}, {}, {}] 형태
  newsData: [
    {date: '2025.08.14', title: '테스트 뉴스기사 제목입니다1.테스트 뉴스기사 제목입니다1.테스트 뉴스기사 제목입니다1.테스트 뉴스기사 제목입니다1.', body: '테스트 뉴스 기사 본문입니다.', url: 'https://www.naver.com/'},
    {date: '2025.08.14', title: '테스트 뉴스기사 제목입니다2.', body: '테스트 뉴스 기사 본문입니다.', url: 'https://www.naver.com/'},
    {date: '2025.08.14', title: '테스트 뉴스기사 제목입니다3.', body: '테스트 뉴스 기사 본문입니다.', url: 'https://www.naver.com/'},
    ]
}

export const reportHeaderDummyData = {
    corpName: '무신사',
    imgUrl: 'https://res.cloudinary.com/zuzu-homepage/image/upload/f_auto,q_auto/v1739446680/p4rn9qxymke0lda94pzk.jpg',
    corpCategory: '패션',
    corpKeyword: ['키워드1', '키워드2', '키워드3']
}

export const reportInfoDummyData = {
    corpSumary: 'asdfasdfad',
    infoData: ['김호성', '비상장', '500억원', '200명', '2025.08.14']
}

export const radarGraphDummyData = [
  {
    subject: '수익성',
    A: 50,
    B: 70,
    fullMark: 100,
  },
  {
    subject: '안정성',
    A: 98,
    B: 50,
    fullMark: 100,
  },
  {
    subject: '성장성',
    A: 86,
    B: 50,
    fullMark: 100,
  },
  {
    subject: '효율성',
    A: 99,
    B: 100,
    fullMark: 100,
  },
  {
    subject: '유동성',
    A: 85,
    B: 90,
    fullMark: 100,
  },
];

// AI 기업 분석
export const aiSumaryDummyData = [
  {emotion: '긍정', sumary: '아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아'},
  {emotion: '부정', sumary: '아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아'},
]

// 연관 기사
export const newsDummyData = [
  {date: '2025.08.14', title: '테스트 뉴스기사 제목입니다1.테스트 뉴스기사 제목입니다1.테스트 뉴스기사 제목입니다1.테스트 뉴스기사 제목입니다1.', body: '테스트 뉴스 기사 본문입니다.', url: 'https://www.naver.com/'},
  {date: '2025.08.14', title: '테스트 뉴스기사 제목입니다2.', body: '테스트 뉴스 기사 본문입니다.', url: 'https://www.naver.com/'},
  {date: '2025.08.14', title: '테스트 뉴스기사 제목입니다3.', body: '테스트 뉴스 기사 본문입니다.', url: 'https://www.naver.com/'},
]

// 유사상장사
export const similarCorpDummyData = [
  {
    corpName: '무신사',
    logo: 'https://res.cloudinary.com/zuzu-homepage/image/upload/f_auto,q_auto/v1739446680/p4rn9qxymke0lda94pzk.jpg',
    probability: '98%',
    basis: '이러이러한 이유로 이러이러한 유사점을 찾을 수 있었다'
  },
  {
    corpName: '무신사',
    logo: 'https://res.cloudinary.com/zuzu-homepage/image/upload/f_auto,q_auto/v1739446680/p4rn9qxymke0lda94pzk.jpg',
    probability: '98%',
    basis: '이러이러한 이유로 이러이러한 유사점을 찾을 수 있었다'
  },
  {
    corpName: '무신사',
    logo: 'https://res.cloudinary.com/zuzu-homepage/image/upload/f_auto,q_auto/v1739446680/p4rn9qxymke0lda94pzk.jpg',
    probability: '98%',
    basis: '이러이러한 이유로 이러이러한 유사점을 찾을 수 있었다'
  }
]