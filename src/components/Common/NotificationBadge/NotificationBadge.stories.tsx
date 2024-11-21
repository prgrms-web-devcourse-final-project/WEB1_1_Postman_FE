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

export const notificationMin: Story = {
    args: { badgeType: 'notification', count: 1 }
};

export const notificationMax: Story = {
    args: { badgeType: 'notification', count: 100 }
};

export const dday: Story = {
    args: { badgeType: 'dday', count: 5 }
};
