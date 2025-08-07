import { Meta, StoryObj } from "@storybook/react-webpack5";
import ListItem from "./ListItem";

const meta: Meta<typeof ListItem> = {
    title: 'Atoms/ListItem',
    component: ListItem
}

export default meta;

type Story = StoryObj<typeof ListItem>;

export const Default: Story = {
    
}