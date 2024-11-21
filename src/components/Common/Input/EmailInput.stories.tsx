import type { Meta, StoryObj } from '@storybook/react';
import { EmailInput } from './EmailInput';

const meta: Meta<typeof EmailInput> = {
    title: 'Components/Inputs/EmailInput',
    component: EmailInput,
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof EmailInput>;

export const Default: Story = {};

export const Disabled: Story = {
    args: {
        disabled: true
    }
};

export const WithDefaultValue: Story = {
    args: {
        defaultValue: 'example@email.com'
    }
};
