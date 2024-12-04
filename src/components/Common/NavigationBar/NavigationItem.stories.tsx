import type { Meta, StoryObj } from '@storybook/react';
import { NavigationItem } from './NavigationItem';
import { FaReact } from 'react-icons/fa';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof NavigationItem> = {
    component: NavigationItem,
    title: 'atoms/NavigationItem',
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        )
    ],
    argTypes: {
        icon: { description: '아이콘입니다.' },
        label: { description: '탭을 설명하는 타이틀 입니다.' },
        path: { description: '페이지 경로 입니다.' }
    }
};
export default meta;

type Story = StoryObj<typeof NavigationItem>;

export const Deactive: Story = {
    args: {
        icon: <FaReact />,
        label: '설명',
        path: '/'
    }
};
