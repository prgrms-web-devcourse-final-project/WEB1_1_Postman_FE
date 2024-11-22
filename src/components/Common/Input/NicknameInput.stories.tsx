import type { Meta, StoryObj } from '@storybook/react';
import { NicknameInput } from './NicknameInput';

const meta: Meta<typeof NicknameInput> = {
    title: 'Components/Inputs/NicknameInput',
    component: NicknameInput,
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof NicknameInput>;

export const Default: Story = {};

export const Disabled: Story = {
    args: {
        disabled: true
    }
};

export const WithDefaultValue: Story = {
    args: {
        defaultValue: 'username123'
    }
};
