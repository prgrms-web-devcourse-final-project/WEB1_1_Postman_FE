import type { Meta, StoryObj } from '@storybook/react';
import { TopBar } from './TopBar';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof TopBar> = {
    component: TopBar,
    title: 'molecule/TopBar',
    tags: ['autodocs'],
    argTypes: {},
    decorators: [
        (Story) => (
            <div style={{ width: '351px', border: '1px solid #ccc' }}>
                <MemoryRouter>
                    <Story />
                </MemoryRouter>
            </div>
        )
    ]
};
export default meta;

type Story = StoryObj<typeof TopBar>;

export const Default: Story = {
    args: {
        handleSuccesClick: () => {
            alert('go');
        }
    }
};
