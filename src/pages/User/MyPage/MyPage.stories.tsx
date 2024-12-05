import type { Meta, StoryObj } from '@storybook/react';

import { MyPage } from './MyPage';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof MyPage> = {
    component: MyPage,
    title: 'pages/Mypage',
    tags: ['autodocs'],
    argTypes: {},
    decorators: [
        (Story) => (
            <BrowserRouter>
                <Story />
            </BrowserRouter>
        )
    ]
};
export default meta;

type Story = StoryObj<typeof MyPage>;

export const Default: Story = {
    args: {}
};
