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
        logo: 'https://res.cloudinary.com/zuzu-homepage/image/upload/f_auto,q_auto/v1739446680/p4rn9qxymke0lda94pzk.jpg',
        data: ['테스트1', '테스트2', '테스트3', '테스트4'],
        typeList: ['text', 'text', 'btn', 'tag'],
        widthList: ['15%', '20%', '40%', '35%']
    }
}