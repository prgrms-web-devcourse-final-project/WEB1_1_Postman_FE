import type { Meta, StoryObj } from '@storybook/react';

import { HomePage } from './HomePage';

const meta: Meta<typeof HomePage> = {
    component: HomePage,
    title: 'pages/HomePage',
    tags: ['autodocs'],
    argTypes: {}
};
export default meta;

type Story = StoryObj<typeof HomePage>;

export const Default: Story = {
    args: {}
};
