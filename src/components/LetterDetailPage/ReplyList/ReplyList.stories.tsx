import type { Meta, StoryObj } from '@storybook/react';
import { ReplyList } from './ReplyList';

const meta: Meta<typeof ReplyList> = {
    component: ReplyList,
    title: 'atoms/ReplyList',
    tags: ['autodocs'],
    argTypes: {
        replies: {
            description: '답장 목록 데이터',
            table: {
                type: {
                    summary: '{ id: number; title: string; date: string }[]'
                }
            }
        }
    }
};

export default meta;

type Story = StoryObj<typeof ReplyList>;

export const Default: Story = {
    args: {
        replies: [
            {
                id: 1,
                title: '친구의 여행 이야기cccccccccccccccccccccccc',
                date: '2024-11-15'
            },
            {
                id: 2,
                title: '업무 관련 답장',
                date: '2024-11-16'
            },
            {
                id: 3,
                title: '가족 근황',
                date: '2024-11-17'
            },
            {
                id: 4,
                title: '가족 근황',
                date: '2024-11-17'
            }
        ]
    }
};

export const EmptyList: Story = {
    args: {
        replies: []
    }
};
