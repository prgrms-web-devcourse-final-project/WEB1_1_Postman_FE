import type { Meta, StoryObj } from '@storybook/react';

import App from '../App';

const meta: Meta<typeof App> = {
    component: App,
    title: 'App',
    tags: ['autodocs'],
    argTypes: {}
};
export default meta;

type Story = StoryObj<typeof App>;

export const Default: Story = {
    args: {}
};
