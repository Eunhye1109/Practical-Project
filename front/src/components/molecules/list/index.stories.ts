import { Meta, StoryObj } from "@storybook/react-webpack5";
import List from "./List";

const meta: Meta<typeof List> = {
    title: 'Molecules/List',
    component: List
}

export default meta;

type Story = StoryObj<typeof List>;

export const Default: Story = {
    
}