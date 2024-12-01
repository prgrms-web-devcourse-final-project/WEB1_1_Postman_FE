import type { Meta, StoryObj } from '@storybook/react';
import { SelectItem } from './SelectItem';
import { MemoryRouter } from 'react-router-dom';
import React, { useState } from 'react';

const meta: Meta<typeof SelectItem> = {
    component: SelectItem,
    title: 'organisms/SelectItem',
    tags: ['autodocs'],
    argTypes: {},
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={['/']}>
                <Story />
            </MemoryRouter>
        )
    ]
};
export default meta;

type Story = StoryObj<typeof SelectItem>;

export const Default: Story = {
    render: () => {
        const [isActive, setIsActive] = useState(false);

        return <SelectItem isActive={isActive} setIsActive={setIsActive} />;
    }
};
