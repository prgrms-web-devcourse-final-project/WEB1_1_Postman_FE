import React from 'react';
import '../src/index.css';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false // 스토리북에서는 재시도 비활성화
        }
    }
});

const preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        }
    },
    decorators: [
        (Story) => (
            // @ts-ignore - 스토리북 타입 무시
            <QueryClientProvider client={queryClient}>
                <Story />
            </QueryClientProvider>
        )
    ]
};

export default preview;
