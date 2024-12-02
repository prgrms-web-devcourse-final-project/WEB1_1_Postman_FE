import type { Meta, StoryObj } from '@storybook/react';

import { LetterInfoContainer } from './LetterInfoContainer';

const meta: Meta<typeof LetterInfoContainer> = {
    component: LetterInfoContainer,
    title: 'MOLECULE/LetterInfoContainer',
    tags: ['autodocs'],
    argTypes: {}
};
export default meta;

type Story = StoryObj<typeof LetterInfoContainer>;

export const Default: Story = {
    args: {
        id: 123,
        title: '익명 편지',
        distance: 400,
        date: '24.11.15',
        daysLeft: 21
    }
};
