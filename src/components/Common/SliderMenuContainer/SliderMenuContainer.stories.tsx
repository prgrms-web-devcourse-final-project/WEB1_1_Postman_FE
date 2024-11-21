import type { Meta, StoryObj } from '@storybook/react';

import { SliderMenuContainer } from './SliderMenuContainer';

const meta: Meta<typeof SliderMenuContainer> = {
    component: SliderMenuContainer,
    title: 'SliderMenuContainer',
    tags: ['autodocs'],
    argTypes: {
        open: {
            control: 'boolean',
            description: '슬라이더 메뉴가 열려있는 상태인지 여부'
        },
        snapPoints: {
            control: 'object',
            description: '슬라이더 메뉴가 멈출 지점들 (예: [300, 450, 600])'
        },
        blocking: {
            control: 'boolean',
            description: '배경 클릭 차단 여부 (true이면 배경 클릭 불가)'
        },
        children: {
            control: false,
            description: '슬라이더 내부에 들어갈 콘텐츠'
        }
    }
};
export default meta;

type Story = StoryObj<typeof SliderMenuContainer>;

export const Default: Story = {
    args: {
        children: <div>컨텐츠 영역입니다.</div>
    }
};
