// src/components/Common/ProfileImage/ProfileImage.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileImage } from './ProfileImage';

const meta = {
    title: 'Atoms/ProfileImage',
    component: ProfileImage,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
} satisfies Meta<typeof ProfileImage>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleProfileImage = {
    id: 'sample-1',
    name: '샘플 이미지',
    src: '/testimg.jpg'
};

export const Default: Story = {
    args: {
        imageItem: sampleProfileImage
    }
};

export const CustomSize: Story = {
    args: {
        width: '150px',
        height: '150px',
        imageItem: sampleProfileImage
    }
};
