import { Meta, StoryObj } from '@storybook/react-webpack5'
import SearchInput from './SearchInput'

const meta: Meta<typeof SearchInput> = {
    title: 'Molecules/SearchInput',
    component: SearchInput
}

export default meta;

type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
    args: {

    } 
} 