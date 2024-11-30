import type { Meta, StoryObj } from '@storybook/react';

import { Bottle } from './Bottle';

const meta: Meta<typeof Bottle> = {
    component: Bottle,
    title: 'Bottle',
    tags: ['autodocs'],
    argTypes: {}
};
export default meta;

type Story = StoryObj<typeof Bottle>;

export const Default: Story = {
    args: {}
};
