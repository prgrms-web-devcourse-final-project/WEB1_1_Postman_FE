import type { Meta, StoryObj } from '@storybook/react';
import { PasswordInput } from './PasswordInput';

const meta: Meta<typeof PasswordInput> = {
    title: 'Components/Inputs/PasswordInput',
    component: PasswordInput,
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {};

export const Disabled: Story = {
    args: {
        required: true
    }
};
