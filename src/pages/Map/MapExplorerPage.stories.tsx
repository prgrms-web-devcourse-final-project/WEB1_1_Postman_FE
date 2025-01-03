import type { Meta, StoryObj } from '@storybook/react';
import MapExplorerPage from './MapExplorerPage';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const meta: Meta<typeof MapExplorerPage> = {
    title: 'Pages/MapExplorerPage',
    component: MapExplorerPage,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <Story />
                </MemoryRouter>
            </QueryClientProvider>
        )
    ],
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
