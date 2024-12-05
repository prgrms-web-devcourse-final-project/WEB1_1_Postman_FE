import type { Meta, StoryObj } from '@storybook/react';
import { WelcomeMessageContainer } from './WelcomeMessageContainer';

const meta: Meta<typeof WelcomeMessageContainer> = {
    component: WelcomeMessageContainer,
    title: 'molecule/WelcomeMessageContainer',
    tags: ['autodocs'],
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'homePage에서 타이틀을 나타냅니다.'
            }
        }
    }
};
export default meta;

type Story = StoryObj<typeof WelcomeMessageContainer>;

export const Default: Story = {
    args: {
        nickname: '홍길동',
        newLetter: true
    },
    parameters: {
        docs: {
            description: {
                component: '새로 받은 편지가 있는 상태'
            }
        }
    }
};

export const NoLetter: Story = {
    args: {
        nickname: '홍길동',
        newLetter: false
    },
    parameters: {
        docs: {
            description: {
                component: '새로 받은 편지가 없는 상태'
            }
        }
    }
};
