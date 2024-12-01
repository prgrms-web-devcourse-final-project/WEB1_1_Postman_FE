import type { Meta, StoryObj } from '@storybook/react';
import { SuccessModal } from './SuccessModal';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof SuccessModal> = {
    component: SuccessModal,
    title: 'atoms/SuccessModal',
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

type Story = StoryObj<typeof SuccessModal>;

export const Default: Story = {
    args: {}
};
