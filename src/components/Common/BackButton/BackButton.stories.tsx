import type { Meta, StoryObj } from '@storybook/react';
import { BackButton } from './BackButton';

const meta: Meta<typeof BackButton> = {
    component: BackButton,
    title: 'atoms/BackButton',
    tags: ['autodocs'],
    argTypes: {}
};

export default meta;

type Story = StoryObj<typeof BackButton>;

export const Default: Story = {
    args: {}
};
