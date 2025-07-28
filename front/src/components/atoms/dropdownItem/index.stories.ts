import { Meta, StoryObj } from "@storybook/react-webpack5";
import DropdownItem from "./DropdownItem";

const meta: Meta<typeof DropdownItem> = {
    title: 'Atoms/DropdownItem',
    component: DropdownItem
}

export default meta;

type Story = StoryObj<typeof DropdownItem>;

export const Default: Story = {
    args: {
        label: 'test',
    }
}