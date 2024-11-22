import type { Meta, StoryObj } from '@storybook/react';
import { NavigationItem } from './NavigationItem';
import { FaReact } from 'react-icons/fa';

const meta: Meta<typeof NavigationItem> = {
    component: NavigationItem,
    title: 'atoms/NavigationItem',
    tags: ['autodocs'],
    argTypes: {
        icon: {
            description: '아이콘입니다.'
        },
        label: {
            description: '탭을 설명하는 타이틀 입니다.'
        },
        isActive: {
            description: '선택 상태'
        }
    }
};
export default meta;

type Story = StoryObj<typeof NavigationItem>;

export const deactive: Story = {
    args: {
        icon: <FaReact />,
        label: 'title',
        isActive: false
    }
};

export const active: Story = {
    args: {
        icon: <FaReact />,
        label: 'title',
        isActive: true
    }
};
