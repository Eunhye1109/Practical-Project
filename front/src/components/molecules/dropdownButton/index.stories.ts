import { Meta, StoryObj } from "@storybook/react-webpack5";
import DropdownButton from "./DropdownButton";

const meta: Meta<typeof DropdownButton> = {
    title: 'Molecules/DropdownButton',
    component: DropdownButton
}

export default meta;

type Story = StoryObj<typeof DropdownButton>;

export const Default: Story = {
    args: {
        label: 'testBtton'
    }
}