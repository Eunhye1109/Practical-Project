import { Meta, StoryObj } from "@storybook/react-webpack5";
import DropdownList from "./DropdownList";

const meta: Meta<typeof DropdownList> = {
    title: 'Molecules/DropdownList',
    component: DropdownList
}

export default meta;

type Story = StoryObj<typeof DropdownList>;

export const Default: Story = {
    args: {
        itemList: [
            'test1', 'test2', 'test3', 'test4'
        ],
        mode: 'radio',
    }
}