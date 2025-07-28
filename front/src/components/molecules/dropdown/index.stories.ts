import { Meta, StoryObj } from "@storybook/react-webpack5";
import Dropdown from "./Dropdown";

const meta: Meta<typeof Dropdown> = {
    title: 'Molecules/Dropdown',
    component: Dropdown
}

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
    args: {
        width: '60%',
        categoryList: ['카테고리1', '카테고리2', '카테고리3', '카테고리4', '카테고리5'],
    }
}