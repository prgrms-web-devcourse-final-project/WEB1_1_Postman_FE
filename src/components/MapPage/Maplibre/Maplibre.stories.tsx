import type { Meta, StoryObj } from '@storybook/react';
import { Maplibre } from './Maplibre';
const meta: Meta<typeof Maplibre> = {
    component: Maplibre,
    title: 'components/Maplibre',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: '검색 기능이 없는 기본 Maplibre 지도입니다.'
            }
        }
    }
};
export default meta;

type Story = StoryObj<typeof Maplibre>;

export const Default: Story = {};
