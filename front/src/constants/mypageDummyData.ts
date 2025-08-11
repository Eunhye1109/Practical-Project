import React from "react";
import { mypageData } from "types/mypage.types";

// 빈더미데이터
export const nullList = []

// 관심기업 더미 데이터
export const corWidthList = ['30%', '40%', '5%', '5%']
export const corTypeList = ['text', 'text', 'btn', 'btn']
export const corHeaderList = [
    {label: '기업명', width: '20%'},
    {label: '기업소개', width: '30%'},
    {label: '메모', width: '40%'},
    {label: '수정', width: '5%'},
    {label: '저장', width: '5%'}
]

export const favoriteDummyData: mypageData = {
    logo: [
        'https://newneek.imgix.net/images/2019/08/09/1565318342_CCSqIYO811XXnjlYj1ssxZ6ycOrvrmPdibnprXuA.jpeg?fm=pjpg',
        'https://newneek.imgix.net/images/2019/08/09/1565318342_CCSqIYO811XXnjlYj1ssxZ6ycOrvrmPdibnprXuA.jpeg?fm=pjpg'
    ], // 로고 url
    corpData: [
        ['무신사', '무신사소개입니다.1', '이러한 이유로 무신사에 관심을 가지고 있습니다.'], // 순서대로 기업이름, 기업소개, 메모내용, 기업코드
        ['무신사', '무신사소개입니다.2', '이러한 이유로 무신사에 관심을 가지고 있습니다.']
    ],
    corpCode: ['7777777', '8888888']
}

export const docsHistoryDummyData: mypageData = {
    logo: [
        'https://newneek.imgix.net/images/2019/08/09/1565318342_CCSqIYO811XXnjlYj1ssxZ6ycOrvrmPdibnprXuA.jpeg?fm=pjpg',
        'https://newneek.imgix.net/images/2019/08/09/1565318342_CCSqIYO811XXnjlYj1ssxZ6ycOrvrmPdibnprXuA.jpeg?fm=pjpg'
    ], // 로고 url
    corpData: [
        ['무신사', '무신사소개입니다.1', '2025.08.14'], // 순서대로 기업이름, 기업소개, 메모내용, 기업코드
        ['무신사', '무신사소개입니다.2', '2025.08.14']
    ],
    corpCode: ['777777', '888888']
}

export const logoDummyData = [
    'https://newneek.imgix.net/images/2019/08/09/1565318342_CCSqIYO811XXnjlYj1ssxZ6ycOrvrmPdibnprXuA.jpeg?fm=pjpg',
    'https://newneek.imgix.net/images/2019/08/09/1565318342_CCSqIYO811XXnjlYj1ssxZ6ycOrvrmPdibnprXuA.jpeg?fm=pjpg',
]

export const corDummyDataList = [
    ['무신사', '엉어엉리멍ㄴ리;ㅏㄴㅁㅓ리;ㅏ', 'ㅁㄴㅇㄹㅁㅇㄴㄹㅁㄴㅇㄹㅇㄴㄹㄴㅇ', '저장', '해제'],
    ['무신사', '엉어엉리멍ㄴ리;ㅏㄴㅁㅓ리;ㅏ', 'ㅁㄴㅇㄹㅁㅇㄴㄹㅁㄴㅇㄹㅇㄴㄹㄴㅇ', '저장', '해제'],
]

//  더미 데이터
export const docsWidthList = ['55%', '15%', '5%', '5%']
export const docsTypeList = ['text', 'text', 'btn', 'btn']
export const docsHeaderList = [
    {label: '기업명', width: '20%'},
    {label: '기업소개', width: '55%'},
    {label: '조회일자', width: '15%'},
    {label: '관심', width: '5%'},
    {label: '보고서', width: '5%'}
]

export const docsDummyDataList = [
    ['무신사', '엉어엉리멍ㄴ리;ㅏㄴㅁㅓ리;ㅏ', '2025.08.14', '등록', '출력'],
    ['무신사', '엉어엉리멍ㄴ리;ㅏㄴㅁㅓ리;ㅏ', '2025.08.14', '등록', '출력'],
]