import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchFullScreen } from './/SearchFullScreen';

const meta: Meta<typeof SearchFullScreen> = {
    title: 'MOLECULE/SearchFullScreen',
    component: SearchFullScreen,
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

type Story = StoryObj<typeof SearchFullScreen>;

export const Default: Story = {
    args: {}
};
