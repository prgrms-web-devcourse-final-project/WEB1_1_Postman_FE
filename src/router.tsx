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
    ReplyLetterDetailPage,
    NotificationPage,
    SentPage,
    SharePage,
    LabelLotteryPage,
    SelectItemPage,
    SuccessLetterPage
} from './pages';
import { Margin } from './components/Common/Margin/Margin';

const CommonLayout = () => (
    <>
        <Outlet />
        <Margin top={50} />
        <NavigationBar />
    </>
);

const SimpleLayout = () => (
    <>
        <Outlet />
    </>
);

export const router = createBrowserRouter([
    {
        path: '/',
        element: <CommonLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <HomePage />
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
        path: '/letter',
        element: <SimpleLayout />,
        children: [
            {
                path: 'create',
                element: <CreateLetterPage />
            },
            { path: 'select', element: <SelectItemPage /> },
            { path: 'success', element: <SuccessLetterPage /> }
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
    },
    {
        path: '/letter/reply/:id',
        element: <ReplyLetterDetailPage />
    },
    {
        path: '/lottery',
        element: <LabelLotteryPage />
    }
]);
