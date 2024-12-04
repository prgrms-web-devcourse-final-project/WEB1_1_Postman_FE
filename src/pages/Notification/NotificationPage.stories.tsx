import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { NotificationPage } from './NotificationPage';

const meta: Meta<typeof NotificationPage> = {
    component: NotificationPage,
    title: 'pages/NotificationPage',
    tags: ['autodocs'],
    argTypes: {},
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        )
    ]
};
export default meta;

type Story = StoryObj<typeof NotificationPage>;

export const Default: Story = {
    args: {}
};
