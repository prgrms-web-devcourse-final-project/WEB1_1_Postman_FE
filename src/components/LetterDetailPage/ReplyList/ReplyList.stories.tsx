import { BrowserRouter } from 'react-router-dom';
import { Meta, StoryObj } from '@storybook/react';
import { ReplyList } from './ReplyList';

const meta: Meta<typeof ReplyList> = {
    component: ReplyList,
    title: 'atoms/ReplyList',
    decorators: [
        (Story) => (
            <BrowserRouter>
                <Story />
            </BrowserRouter>
        )
    ],
    tags: ['autodocs'],
    argTypes: {}
};

export default meta;

type Story = StoryObj<typeof ReplyList>;

export const Default: Story = {
    args: {}
};
