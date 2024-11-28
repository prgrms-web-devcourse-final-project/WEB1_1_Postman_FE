import type { Meta, StoryObj } from '@storybook/react';

import { TopButtonContainer } from './TopButtonContainer';

const meta: Meta<typeof TopButtonContainer> = {
    component: TopButtonContainer,
    title: 'molecule/TopButtonContainer',
    tags: ['autodocs'],
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: 'homePage에서 상단에 위치하는 버튼 입니다.'
            }
        }
    }
};
export default meta;

type Story = StoryObj<typeof TopButtonContainer>;

export const Default: Story = {
    args: {}
};
