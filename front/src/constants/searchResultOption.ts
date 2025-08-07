import React from "react";

// 드랍다운 데이터 리스트
export const dropdownOption: string[][] = [
    // 분야
    ['전체 분야', '패션', '물류', '핀테크', '유통', '콘텐츠', '플랫폼', '커머스', 'IT', '미디어', '제조', '기타'],
    // 매출
    ['전체 매출', '카테고리2', '카테고리3', '카테고리4', '카테고리5'],
    // 기업
    ['전체 기업', '상장사', '비상장사']
]

// 모드 데이터
type mode = 'radio' | 'checkBox';
export const modeOption: mode[] = ['checkBox', 'radio', 'radio']

// 리스트 더미 데이터
export const widthList = ['50%', '10%', '20%']
export const headerList = [
    {label: '기업명', width: '20%'},
    {label: '기업소개', width: '50%'},
    {label: '상장여부', width: '10%'},
    {label: '분야', width: '20%'}
]

export const typeList = ['text', 'text', 'tag', 'tag']

export const allItemList = [
    {
        name: '무신사 스탠다드 어쩌구저쩌구',
        src: 'https://res.cloudinary.com/zuzu-homepage/image/upload/f_auto,q_auto/v1739446680/p4rn9qxymke0lda94pzk.jpg',
        itemList: [
            {
                type: 'text',
                data: ['이 기업은 어쩌구저쩌구 아진짜 집에 가고 싶ㅁ랑로밍나ㅓ론ㅁ아ㅣ러ㅗㅇㅁ니ㅏㅓ롱니ㅏ러'],
            },
            {
                type: 'text',
                data: ['비상장'],
            },
            {
                type: 'text',
                data: ['580.0억'],
            },
            {
                type: 'text',
                data: ['120명'],
            },
            {
                type: 'tag',
                data: ['으앙', '끄앙', '므앙', '으앙', '끄앙'],
            },
            {
                type: 'tag',
                data: ['으앙', '끄앙', '므앙', '으앙', '끄앙'],
            },
        ]
    },
    {
        name: '무신사 스탠다드 어쩌구저쩌구',
        src: 'https://res.cloudinary.com/zuzu-homepage/image/upload/f_auto,q_auto/v1739446680/p4rn9qxymke0lda94pzk.jpg',
        itemList: [
            {
                type: 'text',
                data: ['이 기업은 어쩌구저쩌구 아진짜 집에 가고 싶ㅁ랑로밍나ㅓ론ㅁ아ㅣ러ㅗㅇㅁ니ㅏㅓ롱니ㅏ러'],
            },
            {
                type: 'text',
                data: ['비상장'],
            },
            {
                type: 'text',
                data: ['580.0억'],
            },
            {
                type: 'text',
                data: ['120명'],
            },
            {
                type: 'tag',
                data: ['으앙', '끄앙', '므앙', '으앙', '끄앙'],
            },
            {
                type: 'tag',
                data: ['으앙', '끄앙', '므앙', '으앙', '끄앙'],
            },
            
        ]
    },
    {
        name: '무신사 스탠다드 어쩌구저쩌구',
        src: 'https://res.cloudinary.com/zuzu-homepage/image/upload/f_auto,q_auto/v1739446680/p4rn9qxymke0lda94pzk.jpg',
        itemList: [
            {
                type: 'text',
                data: ['이 기업은 어쩌구저쩌구 아진짜 집에 가고 싶ㅁ랑로밍나ㅓ론ㅁ아ㅣ러ㅗㅇㅁ니ㅏㅓ롱니ㅏ러'],
            },
            {
                type: 'text',
                data: ['비상장'],
            },
            {
                type: 'text',
                data: ['580.0억'],
            },
            {
                type: 'text',
                data: ['120명'],
            },
            {
                type: 'tag',
                data: ['으앙', '끄앙', '므앙', '으앙', '끄앙'],
            },
            {
                type: 'tag',
                data: ['으앙', '끄앙', '므앙', '으앙', '끄앙'],
            },
            
        ]
    },
    {
        name: '무신사 스탠다드 어쩌구저쩌구',
        src: 'https://res.cloudinary.com/zuzu-homepage/image/upload/f_auto,q_auto/v1739446680/p4rn9qxymke0lda94pzk.jpg',
        itemList: [
            {
                type: 'text',
                data: [],
            },
            {
                type: 'text',
                data: [],
            },
            {
                type: 'text',
                data: [],
            },
            {
                type: 'text',
                data: [],
            },
            {
                type: 'tag',
                data: [],
            },
            {
                type: 'tag',
                data: [],
            },
        ]
    },
]
