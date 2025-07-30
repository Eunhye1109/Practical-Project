import { Meta, StoryObj } from "@storybook/react-webpack5";
import SearchBar from "./SearchBar";

const meta: Meta<typeof SearchBar> = {
    title: 'Molecules/SearchBar',
    component: SearchBar
}

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
    args: {
        itemList: [
            // 분야
            ['분야 전체', '카테고리1', '카테고리2', '카테고리3', '카테고리4', '카테고리5'],
            // 매출
            ['카테고리1', '카테고리2', '카테고리3', '카테고리4', '카테고리5'],
            // 기업
            ['카테고리1', '카테고리2', '카테고리3', '카테고리4', '카테고리5']
        ],
        modeList: ['checkBox', 'radio', 'radio'],
        label: '기업명을 입력해주세요.'
    }
}