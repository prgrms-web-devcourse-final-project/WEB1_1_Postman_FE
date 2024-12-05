import type { Meta, StoryObj } from '@storybook/react';

import { LotteryAnimationContainer } from './LotteryAnimationContainer';

const meta: Meta<typeof LotteryAnimationContainer> = {
    component: LotteryAnimationContainer,
    title: 'LotteryAnimationContainer',
    tags: ['autodocs'],
    argTypes: {}
};
export default meta;

type Story = StoryObj<typeof LotteryAnimationContainer>;

export const Default: Story = {
    args: {}
};
