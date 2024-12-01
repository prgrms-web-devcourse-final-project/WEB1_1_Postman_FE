import type { Meta, StoryObj } from '@storybook/react';
import { SelectItem } from './SelectItem';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof SelectItem> = {
    component: SelectItem,
    title: 'organisms/SelectItem',
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

type Story = StoryObj<typeof SelectItem>;

export const Default: Story = {
    args: {}
};
