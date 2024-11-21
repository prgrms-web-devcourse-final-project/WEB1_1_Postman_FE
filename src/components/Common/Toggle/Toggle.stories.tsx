import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
    component: Toggle,
    title: 'atoms/Toggle',
    tags: ['autodocs'],
    argTypes: {
        onToggle: { action: 'toggled' }
    }
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
    args: {
        isChecked: false
    }
};

export const Checked: Story = {
    args: {
        isChecked: true
    }
};
