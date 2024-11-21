import type { Meta, StoryObj } from '@storybook/react';

import { Overlay } from './Overlay';

const meta: Meta<typeof Overlay> = {
    component: Overlay,
    title: 'atoms/Overlay',
    tags: ['autodocs'],
    argTypes: {}
};
export default meta;

type Story = StoryObj<typeof Overlay>;

export const Default: Story = {
    args: {
        children: <>즐겁단</>
    }
};
