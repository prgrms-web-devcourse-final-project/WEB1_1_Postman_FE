import type { Meta, StoryObj } from '@storybook/react';
import { DeleteModal } from './DeleteModal';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof DeleteModal> = {
    component: DeleteModal,
    title: 'molecule/DeleteModal',
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

type Story = StoryObj<typeof DeleteModal>;

export const Default: Story = {
    args: {}
};
