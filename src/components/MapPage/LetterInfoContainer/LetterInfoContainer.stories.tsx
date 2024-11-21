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
        title: '익명 편지',
        keyword: '가을 바람',
        date: '24.11.15',
        clickEvent: () => {
            alert('즐겁다');
        }
    }
};
