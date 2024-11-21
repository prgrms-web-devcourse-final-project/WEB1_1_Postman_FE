import { Meta, StoryObj } from '@storybook/react';
import { ArchivedlBanner } from './ArchivedlBanner';

const meta: Meta<typeof ArchivedlBanner> = {
    component: ArchivedlBanner,
    title: 'atoms/ArchivedlBanner',
    tags: ['autodocs'],
    parameters: {
        layout: 'centered'
    }
};

export default meta;

type Story = StoryObj<typeof ArchivedlBanner>;

export const Default: Story = {};
