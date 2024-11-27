import type { Meta, StoryObj } from '@storybook/react';
import { ProfileImage } from './ProfileImage';

const meta: Meta<typeof ProfileImage> = {
    component: ProfileImage,
    title: 'atoms/ProfileImage',
    tags: ['autodocs'],
    argTypes: {}
};

export default meta;

type Story = StoryObj<typeof ProfileImage>;

export const Default: Story = {
    args: {}
};
