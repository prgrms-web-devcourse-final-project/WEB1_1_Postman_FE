import type { Meta, StoryObj } from '@storybook/react';

import { NotificationBadge } from './NotificationBadge';

const meta: Meta<typeof NotificationBadge> = {
    component: NotificationBadge,
    title: 'atoms/NotificationBadge',
    tags: ['autodocs'],
    argTypes: {}
};
export default meta;

type Story = StoryObj<typeof NotificationBadge>;

export const Default: Story = {
    args: { count: 1 }
};

export const Max: Story = {
    args: { count: 100 }
};
