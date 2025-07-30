import { Meta, StoryObj } from "@storybook/react-webpack5";
import ListHeader from "./ListHeader";

const meta: Meta<typeof ListHeader> = {
    title: 'Atoms/ListHeader',
    component: ListHeader
}

export default meta;

type Story = StoryObj<typeof ListHeader>;

export const Default: Story = {
    args: {
        headerList: [
            {label: 'test', width: '20%'},
            {label: 'test', width: '30%'},
            {label: 'test', width: '50%'},
        ]
    }
}