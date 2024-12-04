import type { Meta, StoryObj } from '@storybook/react';

import { CreateButton } from './CreateButton';

const meta: Meta<typeof CreateButton> = {
    component: CreateButton,
    title: 'CreateButton',
    tags: ['autodocs'],
    argTypes: {},
    decorators: [
        (Story) => (
            <div style={{ width: '300px' }}>
                <Story />
            </div>
        )
    ]
};
export default meta;

type Story = StoryObj<typeof CreateButton>;

export const Active: Story = {
    args: {
        children: '활성',
        isActive: true,
        handleClickHandler: () => {
            alert('즐겁다');
        }
    }
};

export const NonActive: Story = {
    args: {
        children: '비활성',
        isActive: false,
        handleClickHandler: () => {
            alert('즐겁다');
        }
    }
};
