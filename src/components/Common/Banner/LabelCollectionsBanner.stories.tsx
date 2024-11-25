import { Meta, StoryObj } from '@storybook/react';
import { LabelCollectionsBanner } from './LabelCollectionsBanner';

const meta: Meta<typeof LabelCollectionsBanner> = {
    component: LabelCollectionsBanner,
    title: 'atoms/LabelCollectionsBanner',
    tags: ['autodocs'],
    parameters: {
        layout: 'centered'
    }
};

export default meta;

type Story = StoryObj<typeof LabelCollectionsBanner>;

export const Default: Story = {};
