import type { Meta, StoryObj } from '@storybook/react';

import { ItemSlider } from './ItemSlider';

const meta: Meta<typeof ItemSlider> = {
    component: ItemSlider,
    title: 'ItemSlider',
    tags: ['autodocs'],
    argTypes: {}
};
export default meta;

type Story = StoryObj<typeof ItemSlider>;

const textItems = [
    { name: '테스트 글꼴', id: '1' },
    { name: '테스트 글꼴', id: '2' },
    { name: '테스트 글꼴', id: '3' },
    { name: '테스트 글꼴', id: '4' },
    { name: '테스트 글꼴', id: '5' },
    { name: '테스트 글꼴', id: '6' },
    { name: '테스트 글꼴', id: '7' },
    { name: '테스트 글꼴', id: '9' },
    { name: '테스트 글꼴', id: '10' },
    { name: '테스트 글꼴', id: '11' },
    { name: '테스트 글꼴', id: '12' },
    { name: '테스트 글꼴', id: '13' },
    { name: '테스트 글꼴', id: '14' },
    { name: '테스트 글꼴', id: '15' }
];

const imageItems = [
    { id: '편지지_샘플_1', name: '이미지' },
    { id: '편지지_샘플_2', name: '이미지' },
    { id: '편지지_샘플_3', name: '이미지' },
    { id: '편지지_샘플_4', name: '이미지' },
    { id: '편지지_샘플_5', name: '이미지' }
];

export const TextSlider: Story = {
    args: {
        itemType: 'text',
        itemIDList: textItems,
        spaceBetween: 20
    }
};

export const ImageSlider: Story = {
    args: {
        itemType: 'image',
        itemIDList: imageItems,
        spaceBetween: 20
    }
};
