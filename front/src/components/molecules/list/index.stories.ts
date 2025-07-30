import { Meta, StoryObj } from "@storybook/react-webpack5";
import List from "./List";

const meta: Meta<typeof List> = {
    title: 'Molecules/List',
    component: List
}

export default meta;

type Story = StoryObj<typeof List>;

export const Default: Story = {
    args: {
        headerList: [
            {label: '기업명', width: '20%'},
            {label: '기업소개', width: '30%'},
            {label: '상장여부', width: '10%'},
            {label: '매출', width: '10%'},
            {label: '고용인원', width: '10%'},
            {label: '분야', width: '10%'},
            {label: '키워드', width: '10%'},
        ],
        allItemList: [
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
    }
}