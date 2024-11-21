import type { Meta, StoryObj } from '@storybook/react';

import { ListAlarmItem } from './ListAlarmItem';

const meta: Meta<typeof ListAlarmItem> = {
    component: ListAlarmItem,
    title: 'molecule/ListAlarmItem',
    tags: ['autodocs'],
    argTypes: {
        image: {
            description: '들어가는 이미지'
        },
        title: {
            description: '알림 제목'
        },
        contents: {
            description: '알림 컨텐츠'
        }
    }
};
export default meta;

type Story = StoryObj<typeof ListAlarmItem>;

export const Default: Story = {
    args: {}
};

export const Default2: Story = {
    args: {
        title: '빨리 읽으세요',
        contents: '편지가 500통 도착했습니다!'
    }
};
