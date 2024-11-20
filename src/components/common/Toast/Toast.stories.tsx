import type { Meta, StoryObj } from '@storybook/react';

import Toast from './Toast';

const meta: Meta<typeof Toast> = {
    component: Toast,
    title: 'molecule/Toast',
    tags: ['autodocs'],
    argTypes: {}
};
export default meta;

type Story = StoryObj<typeof Toast>;

export const Success: Story = {
    args: {
        children: <>성공</>,
        variant: 'success'
    }
};

export const Warning: Story = {
    args: {
        children: <>주의</>,
        variant: 'warning'
    }
};

export const Error: Story = {
    args: {
        children: <>실패</>,
        variant: 'error'
    }
};
