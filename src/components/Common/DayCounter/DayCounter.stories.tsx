import type { Meta, StoryObj } from '@storybook/react';
import { DayCounter } from './DayCounter';

const meta: Meta<typeof DayCounter> = {
    component: DayCounter,
    title: 'atoms/DayCounter',
    tags: ['autodocs'],
    argTypes: {}
};

export default meta;

type Story = StoryObj<typeof DayCounter>;

export const Default: Story = {
    args: {
        daysLeft: 21
    }
};
