import type { Meta, StoryObj } from '@storybook/react';
import { CreateLetterPage } from './CreateLetterPage';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof CreateLetterPage> = {
    component: CreateLetterPage,
    title: 'Pages/CreateLetterPage',
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

type Story = StoryObj<typeof CreateLetterPage>;

export const Default: Story = {
    args: {}
};
