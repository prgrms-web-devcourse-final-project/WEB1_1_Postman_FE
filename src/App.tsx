import ToastContainer from './components/Common/ToastContainer/ToastContainer';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { usePushNotification } from './hooks/usePushNotification ';

export const App = () => {
    const queryClient = new QueryClient();
    usePushNotification();
    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer />
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};
