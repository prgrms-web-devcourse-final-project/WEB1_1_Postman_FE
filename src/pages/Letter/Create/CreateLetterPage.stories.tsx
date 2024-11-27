import type { Meta, StoryObj } from '@storybook/react';

import { CreateLetterPage } from './CreateLetterPage';

const meta: Meta<typeof CreateLetterPage> = {
    component: CreateLetterPage,
    title: 'Pages/CreateLetterPage',
    tags: ['autodocs'],
    argTypes: {}
};
export default meta;

type Story = StoryObj<typeof CreateLetterPage>;

export const Default: Story = {
    args: {}
};
