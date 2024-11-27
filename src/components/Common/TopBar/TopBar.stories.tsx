import type { Meta, StoryObj } from '@storybook/react';

import { TopBar } from './TopBar';

const meta: Meta<typeof TopBar> = {
    component: TopBar,
    title: 'TopBar',
    tags: ['autodocs'],
    argTypes: {},
    decorators: [
        (Story) => (
            <div style={{ width: '351px', border: '1px solid #ccc' }}>
                <Story />
            </div>
        )
    ]
};
export default meta;

type Story = StoryObj<typeof TopBar>;

export const Default: Story = {
    args: {
        onClick: () => {
            alert('즐겁다');
        }
    }
};
