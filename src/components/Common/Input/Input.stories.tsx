import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
    title: 'Components/Inputs/BaseInput',
    component: Input,
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {
        text: 'Default Input',
        name: 'defaultInput'
    }
};

export const Disabled: Story = {
    args: {
        text: 'Disabled Input',
        name: 'disabledInput',
        disabled: true
    }
};

export const WithError: Story = {
    args: {
        text: 'Input with Error',
        name: 'errorInput',
        errorMessage: '이곳에 에러 메시지가 표시됩니다.'
    }
};
