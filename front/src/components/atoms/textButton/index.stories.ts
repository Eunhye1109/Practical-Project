import { Meta, StoryObj } from "@storybook/react-webpack5";
import TextButton from "./TextButton";

const meta: Meta<typeof TextButton> = {
    title: 'Atoms/TextButton',
    component: TextButton
}

export default meta;

type Story = StoryObj<typeof TextButton>;

export const Default: Story = {
    args: {
        label: 'test',
        mode: "selected"
    }
}