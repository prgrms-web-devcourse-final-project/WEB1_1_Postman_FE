import { ReactNode } from 'react';
import { createBrowserRouter, Outlet, Navigate } from 'react-router-dom';
import { NavigationBar } from '@/components/Common/NavigationBar/NavigationBar';
import {
    ErrorPage,
    HomePage,
    CreateLetterPage,
    MapExplorerPage,
    MyPage,
    LoginPage,
    RegisterPage,
    LabelCollectionsPage,
    LetterDetailPage,
    ReplyLetterDetailPage,
    NotificationPage,
    SentPage,
    SharePage,
    LabelLotteryPage,
    SelectItemPage,
    SuccessLetterPage,
    ProfilePage,
    StoragePage
} from './pages';
import { Margin } from './components/Common/Margin/Margin';
import { tokenStorage } from './service/auth/tokenStorage';
import { AuthProvider } from './AuthProvider';

type RouteProps = {
    children: ReactNode;
};

// 보호 라우트 (로그인 필요)
export const ProtectedRoute = ({ children }: RouteProps) => {
    const Token = tokenStorage.getAccessToken();
    if (Token === null) {
        return <Navigate to="/login" replace />;
    }
    return <AuthProvider>{children}</AuthProvider>;
};

// 비보호 라우트 (비로그인 접근 가능)
export const PublicRoute = ({ children }: RouteProps) => {
    return children;
};

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
        element: (
            <ProtectedRoute>
                <CommonLayout />
            </ProtectedRoute>
        ),
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
                element: <MyPage />
            },
            {
                path: 'storage',
                children: [
                    { path: 'keyword', element: <StoragePage /> },
                    { path: 'map', element: <StoragePage /> },
                    { path: 'bookmark', element: <StoragePage /> }
                ]
            },
            {
                path: 'labels',
                element: <LabelCollectionsPage />
            },
            {
                path: 'profile',
                element: <ProfilePage />
            },
            {
                path: '/sent',
                element: <SentPage />
            },
            {
                path: '/share',
                element: <SharePage />
            },
            {
                path: '/letter/:type/:letterId',
                element: <LetterDetailPage />
            },
            {
                path: '/letter/:type/reply/:replyLetterId',
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
        ]
    },
    {
        path: '/letter',
        element: (
            <ProtectedRoute>
                <SimpleLayout />
            </ProtectedRoute>
        ),
        children: [
            { path: 'create', element: <CreateLetterPage /> },
            { path: 'select', element: <SelectItemPage /> },
            { path: 'success', element: <SuccessLetterPage /> }
        ]
    },
    {
        path: '/login',
        element: (
            <PublicRoute>
                <LoginPage />
            </PublicRoute>
        )
    },
    {
        path: '/register',
        element: (
            <PublicRoute>
                <RegisterPage />
            </PublicRoute>
        )
    }
]);
