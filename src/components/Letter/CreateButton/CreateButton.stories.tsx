import type { Meta, StoryObj } from '@storybook/react';

import { CreateButton } from './CreateButton';

const meta: Meta<typeof CreateButton> = {
    component: CreateButton,
    title: 'CreateButton',
    tags: ['autodocs'],
    argTypes: {}
};
export default meta;

type Story = StoryObj<typeof CreateButton>;

export const Default: Story = {
    args: {
        handleClickHandler: () => {
            alert('즐겁다');
        }
    }
};
