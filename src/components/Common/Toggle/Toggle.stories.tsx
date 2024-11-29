import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
    component: Toggle,
    title: 'atoms/Toggle',
    tags: ['autodocs'],
    argTypes: {
        onToggle: { action: 'toggled' },
        leftLabel: {
            control: 'text',
            defaultValue: '전체'
        },
        rightLabel: {
            control: 'text',
            defaultValue: '답장'
        }
    }
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
    args: {
        isChecked: false,
        leftLabel: '전체',
        rightLabel: '답장'
    }
};

export const Checked: Story = {
    args: {
        isChecked: true,
        leftLabel: '편지지',
        rightLabel: '글씨체'
    }
};
