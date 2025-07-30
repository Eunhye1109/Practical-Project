import { Meta, StoryObj } from "@storybook/react-webpack5";
import ListItem from "./ListItem";

const meta: Meta<typeof ListItem> = {
    title: 'Atoms/ListItem',
    component: ListItem
}

export default meta;

type Story = StoryObj<typeof ListItem>;

export const Default: Story = {
    args: {
        name: '기업 이름222222222',
        src: 'https://res.cloudinary.com/zuzu-homepage/image/upload/f_auto,q_auto/v1739446680/p4rn9qxymke0lda94pzk.jpg',
        itemList: [
            {
                type: 'text',
                data: ['으아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아'],
            },
            {
                type: 'tag',
                data: ['으앙', '끄앙', '므앙', '으앙', '끄앙'],
            },
            {
                type: 'btn',
                data: ['해제'],
            },
        ]
    }
}