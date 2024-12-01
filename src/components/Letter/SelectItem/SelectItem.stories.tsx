import type { Meta, StoryObj } from '@storybook/react';

import { SelectItem } from './SelectItem';

const meta: Meta<typeof SelectItem> = {
    component: SelectItem,
    title: 'organisms/moSelectItem',
    tags: ['autodocs'],
    argTypes: {}
};
export default meta;

type Story = StoryObj<typeof SelectItem>;

export const Default: Story = {
    args: {}
};
