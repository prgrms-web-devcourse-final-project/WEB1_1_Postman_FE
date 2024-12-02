import type { Meta, StoryObj } from '@storybook/react';
import { MapExplorerPage } from './MapExplorerPage';
import { HiOutlinePencilAlt } from 'react-icons/hi';

const meta: Meta<typeof MapExplorerPage> = {
    title: 'Pages/MapExplorerPage',
    component: MapExplorerPage,
    tags: ['autodocs'],
    argTypes: {
        buttonClick: {
            description: '지도를 클릭하여 편지 작성',
            action: 'clicked'
        }
    }
};

export default meta;

type Story = StoryObj<typeof MapExplorerPage>;

export const Default: Story = {
    args: {}
};
