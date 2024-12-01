import type { Meta, StoryObj } from '@storybook/react';
import { MaplibreWithSearch } from './MaplibreWithSearch';

const meta: Meta<typeof MaplibreWithSearch> = {
    component: MaplibreWithSearch,
    title: 'components/Maplibre/WithSearch',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: '검색 기능이 포함된 Maplibre 지도입니다.'
            }
        }
    }
};
export default meta;

type Story = StoryObj<typeof MaplibreWithSearch>;

export const WithSearch: Story = {
    args: {
        searchText: '서울'
    },
    parameters: {
        docs: {
            description: {
                story: '검색어가 포함된 지도입니다.'
            }
        }
    }
};
