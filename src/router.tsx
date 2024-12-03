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
    SuccessLetterPage,
    ProfilePage
} from './pages';
import { Margin } from './components/Common/Margin/Margin';
import { TopButtonContainer } from '@/components/HomePage/TopButtonContainer/TopButtonContainer';

const CommonLayout = () => (
    <>
        <Margin top={50}>
            <Outlet />
        </Margin>
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
                            { path: 'map', element: <ArchivedPage /> },
                            { path: 'bookmark', element: <ArchivedPage /> }
                        ]
                    },
                    { path: 'labels', element: <LabelCollectionsPage /> }
                ]
            },
            {
                path: 'profile',
                element: <ProfilePage />
            },
            {
                path: '/labelcollections',
                element: <LabelCollectionsPage />
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
    },
    {
        path: '/notification',
        element: <NotificationPage />
    }
]);
