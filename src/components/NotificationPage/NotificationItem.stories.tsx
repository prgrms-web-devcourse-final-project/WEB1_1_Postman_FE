import type { Meta, StoryObj } from '@storybook/react';

import { NotificationItem } from './NotificationItem';

const meta: Meta<typeof NotificationItem> = {
    component: NotificationItem,
    title: 'molecule/NotificationItem',
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: [
                'NEW_LETTER',
                'TARGET_LETTER',
                'REPLY_LETTER',
                'WARNING',
                'BAN'
            ]
        },
        createdAt: { control: 'date' },
        isRead: { control: 'boolean' },
        letterId: { control: 'text' }
    }
};
export default meta;

type Story = StoryObj<typeof NotificationItem>;

export const Default: Story = {
    args: {
        type: 'NEW_LETTER', // 기본값으로 "새로운 편지" 타입
        createdAt: '2024-12-03T11:20:38.6242079', // 현재 시간으로 초기화
        isRead: false, // 읽지 않은 상태로 설정
        letterId: 1212 // 임의의 편지 ID
    }
};

export const read: Story = {
    args: {
        type: 'NEW_LETTER', // 기본값으로 "새로운 편지" 타입
        createdAt: '2024-12-03T11:20:38.6242079', // 현재 시간으로 초기화
        isRead: true, // 읽지 않은 상태로 설정
        letterId: 1212 // 임의의 편지 ID
    }
};
