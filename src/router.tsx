import { createBrowserRouter, Outlet } from 'react-router-dom';
import { NavigationBar } from '@/components/Common/NavigationBar/NavigationBar';
import {
    ErrorPage,
    HomePage,
    CreateLetterPage,
    MapExplorerPage,
    MyPage,
    LoginPage,
    RegisterPage,
    ArchivedPage,
    LabelCollectionsPage,
    LetterDetailPage,
    NotificationPage,
    SentPage,
    SharePage
} from './pages';

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
                <Outlet />
                <NavigationBar />
            </>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/letter/create',
                element: <CreateLetterPage />
            },
            {
                path: '/mapexplorer',
                element: <MapExplorerPage />
            },
            {
                path: '/mypage',
                element: <MyPage />,
                children: [
                    {
                        path: 'letters',
                        children: [
                            { path: 'keyword', element: <ArchivedPage /> },
                            { path: 'map', element: <ArchivedPage /> }
                        ]
                    },
                    { path: 'labels', element: <LabelCollectionsPage /> }
                ]
            },
            {
                path: '/labelcollections',
                element: <LabelCollectionsPage />
            },
            {
                path: '/notification',
                element: <NotificationPage />
            },
            {
                path: '/sent',
                element: <SentPage />
            },
            {
                path: '/share',
                element: <SharePage />
            }
        ]
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    },
    {
        path: '/letter/:type/:id',
        element: <LetterDetailPage />
    }
]);
