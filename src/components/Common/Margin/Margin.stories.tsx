import type { Meta, StoryObj } from '@storybook/react';

import { Margin } from './Margin';

const meta: Meta<typeof Margin> = {
    component: Margin,
    title: 'atoms/Margin',
    tags: ['autodocs'],
    argTypes: {}
};
export default meta;

type Story = StoryObj<typeof Margin>;

export const Default: Story = {
    args: {
        children: <>{'즐겁다'}</>
    }
};
