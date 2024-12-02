import type { Meta, StoryObj } from '@storybook/react';

import { AnimationBottle } from './AnimationBottle';

const meta: Meta<typeof AnimationBottle> = {
    component: AnimationBottle,
    title: 'molecule/AnimationBottle',
    tags: ['autodocs'],
    argTypes: {}
};
export default meta;

type Story = StoryObj<typeof AnimationBottle>;

export const Default: Story = {
    args: {}
};
