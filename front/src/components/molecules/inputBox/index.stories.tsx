import { Meta, StoryObj } from "@storybook/react-webpack5";
import InputBox from "./InputBox";

const meta: Meta<typeof InputBox> = {
    title: 'Molecules/InputBox',
    component: InputBox
}

export default meta;

type Story = StoryObj<typeof InputBox>;

export const Default: Story = {
    args: {
        width: "800px",
        height: "50px",
        inputLabel: "asdasdasd",
        textLabel: "adsasa",
        visible: false
    }
}