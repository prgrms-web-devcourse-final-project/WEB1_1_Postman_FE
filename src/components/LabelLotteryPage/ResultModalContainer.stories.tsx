import type { Meta, StoryObj } from '@storybook/react';

import { ResultModalContainer } from './ResultModalContainer';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof ResultModalContainer> = {
    component: ResultModalContainer,
    title: 'organisms/ResultModalContainer',
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

type Story = StoryObj<typeof ResultModalContainer>;

export const Default: Story = {
    args: {
        result: true,
        clickEvent: () => {}
    }
};

export const lose: Story = {
    args: {
        result: false,
        clickEvent: () => {}
    }
};
