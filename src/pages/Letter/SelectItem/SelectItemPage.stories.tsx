import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import SelectItemPage from './SelectItemPage';

const meta: Meta<typeof SelectItemPage> = {
    component: SelectItemPage,
    title: 'SelectItemPage',
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

type Story = StoryObj<typeof SelectItemPage>;

export const Default: Story = {
    args: {}
};
