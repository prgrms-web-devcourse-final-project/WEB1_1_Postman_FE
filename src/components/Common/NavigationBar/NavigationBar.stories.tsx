import type { Meta, StoryObj } from '@storybook/react';
import { NavigationBar } from './NavigationBar';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof NavigationBar> = {
    component: NavigationBar,
    title: 'molecule/NavigationBar',
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        )
    ],
    argTypes: {}
};
export default meta;

type Story = StoryObj<typeof NavigationBar>;

export const Default: Story = {
    args: {}
};
