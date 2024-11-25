import type { Meta, StoryObj } from '@storybook/react';

import { NavigationBar } from './NavigationBar';

const meta: Meta<typeof NavigationBar> = {
    component: NavigationBar,
    title: 'molecule/NavigationBar',
    tags: ['autodocs'],
    argTypes: {}
};
export default meta;

type Story = StoryObj<typeof NavigationBar>;

export const Default: Story = {
    args: {}
};
