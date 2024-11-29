import ToastContainer from './components/Common/ToastContainer/ToastContainer';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { PostLetterForm } from './components/Letter/Post/PostLetterForm';
import { TopBar } from '@/components/Common/TopBar/TopBar';

export const App = () => {
    return (
        <>
            <ToastContainer />
            <RouterProvider router={router} />
            <TopBar
                onClick={() => {
                    alert('back~');
                }}
            />
            <PostLetterForm />
            즐거운 최종 프로젝트!!!
        </>
    );
};
