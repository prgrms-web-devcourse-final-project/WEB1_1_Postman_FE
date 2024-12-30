import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';

const meta: Meta<typeof HomePage> = {
    component: HomePage,
    title: 'pages/HomePage',
    tags: ['autodocs'],
    argTypes: {},
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        )
    ]
};

export default meta;

type Story = StoryObj<typeof HomePage>;

export const Default: Story = {
    args: {}
};
