import { Meta, StoryObj } from "@storybook/react-webpack5";
import ReportHeader from "./ReportHeader";

const meta: Meta<typeof ReportHeader> = {
    title: 'Atoms/ReportHeader',
    component: ReportHeader
}

export default meta;

type Story = StoryObj<typeof ReportHeader>;

export const Default: Story = {
    args: {
        corpName: '무신사',
        imgUrl: 'https://res.cloudinary.com/zuzu-homepage/image/upload/f_auto,q_auto/v1739446680/p4rn9qxymke0lda94pzk.jpg',
        corpCategory: '패션',
        corpKeyword: ['키워드1', '키워드2', '키워드3']
    }
}