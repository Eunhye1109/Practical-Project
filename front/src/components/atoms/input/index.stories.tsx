import { Meta, StoryObj } from "@storybook/react-webpack5";
import Input from "./Input";

const meta: Meta<typeof Input> = {
    title: 'Atoms/Input',
    component: Input
}

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {} 
} 