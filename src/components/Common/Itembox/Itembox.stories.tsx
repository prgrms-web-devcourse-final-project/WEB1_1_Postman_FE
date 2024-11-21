import type { Meta, StoryObj } from '@storybook/react';
import { Itembox } from './Itembox';
import { Bottle } from './../BottleLetter/Bottle/Bottle';
import { Label } from './../BottleLetter/Label/Label';
import { BottleLetter } from './../BottleLetter/BottleLetter';

const meta: Meta<typeof Itembox> = {
    component: Itembox,
    title: 'Itembox',
    tags: ['autodocs'],
    argTypes: {}
};
export default meta;

type Story = StoryObj<typeof Itembox>;

const Letter = {
    letterId: 1,
    createdDate: '날짜',
    font: '글씨체',
    keywords: ['공감', '행복', '후련함'],
    content: '편지 내용',
    paper: '이미지 url',
    label: '라벨_샘플.png'
};

export const BottleBox: Story = {
    args: { children: <Bottle /> }
};

export const LabelBox: Story = {
    args: { children: <Label imgSrc="라벨_샘플.png" /> }
};

export const BottleLetterBox: Story = {
    args: { children: <BottleLetter Letter={Letter} /> }
};
