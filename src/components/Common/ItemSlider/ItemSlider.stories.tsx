import type { Meta, StoryObj } from '@storybook/react';
import { ItemSlider } from './ItemSlider';
import SkyTheme from '@/asset/letter1/letter1.svg?react';
import HaertTheme from '@/asset/letter2/letter2.svg?react';
import FlowerTheme from '@/asset/letter3/letter3.svg?react';

const meta: Meta<typeof ItemSlider> = {
    component: ItemSlider,
    title: 'molecule/ItemSlider',
    tags: ['autodocs'],
    argTypes: {}
};
export default meta;

type Story = StoryObj<typeof ItemSlider>;

const textItems = [
    { name: 'font-sans', id: '1', fontName: '기본 폰트' },
    { name: 'font-bagelfatone', id: '2', fontName: '베이글 폰트' },
    { name: 'font-cookierun', id: '3', fontName: '쿠키런 폰트' },
    { name: 'font-pyeongchangpeace', id: '4', fontName: '평창 폰트' },
    { name: 'font-sagak', id: '5', fontName: '필기체 폰트' },
    { name: 'font-serif', id: '6', fontName: '세리프 폰트' }
];

const imageItems = [
    { id: '1', src: SkyTheme, name: '이미지' },
    { id: '2', src: HaertTheme, name: '이미지' },
    { id: '3', src: FlowerTheme, name: '이미지' }
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
