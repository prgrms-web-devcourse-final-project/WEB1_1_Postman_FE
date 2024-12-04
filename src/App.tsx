import ToastContainer from './components/Common/ToastContainer/ToastContainer';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';

export const App = () => {
    return (
        <>
            <ToastContainer />
            <RouterProvider router={router} />
        </>
    );
};
