import type { Meta, StoryObj } from '@storybook/react';

import { NavigateContainer } from './NavigateContainer';

const meta: Meta<typeof NavigateContainer> = {
    component: NavigateContainer,
    title: 'MOLECULE/NavigateContainer',
    tags: ['autodocs'],
    argTypes: {}
};
export default meta;

type Story = StoryObj<typeof NavigateContainer>;

export const Default: Story = {
    args: {
        count: 4
    }
};
