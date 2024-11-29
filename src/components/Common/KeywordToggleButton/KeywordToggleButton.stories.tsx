import type { Meta, StoryObj } from '@storybook/react';

import { KeywordToggleButton } from './KeywordToggleButton';

const meta: Meta<typeof KeywordToggleButton> = {
    component: KeywordToggleButton,
    title: 'atoms/KeywordToggleButton',
    tags: ['autodocs'],
    argTypes: {}
};
export default meta;

type Story = StoryObj<typeof KeywordToggleButton>;

export const Default: Story = {
    args: {
        keyword: '키워드'
    }
};

export const Active: Story = {
    args: {
        keyword: '키워드',
        isActive: true
    }
};
