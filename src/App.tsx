import ToastContainer from './components/Common/ToastContainer/ToastContainer';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';

export const App = () => {
    return (
        <div>
            <ToastContainer />
            <RouterProvider router={router} />
        </div>
    );
};
