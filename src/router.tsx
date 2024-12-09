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
    ReplyLetterDetailPage,
    NotificationPage,
    SentPage,
    ProfileSharePage,
    LabelLotteryPage,
    SelectItemPage,
    SuccessLetterPage,
    ProfilePage,
    StoragePage,
    KeywordLetterDetailPage,
    MapLetterDetailPage,
    MapLetterArchieveDetailContainerPage
} from './pages';
import { tokenStorage } from './service/auth/tokenStorage';
import { AuthProvider } from './AuthProvider';
import { Container } from '@/components/Common/Container/Container';
import { Margin } from './components/Common/Margin/Margin';

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
    <div className="flex flex-col h-full">
        <Container px={6} pb={6}>
            <Outlet />
        </Container>
        <Margin bottom={78} />
        <NavigationBar />
    </div>
);

const SimpleLayout = () => (
    <div>
        <Outlet />
    </div>
);

const AuthLayout = () => (
    <div className="flex flex-col h-full">
        <Container px={6} pb={6}>
            <Outlet />
        </Container>
    </div>
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
                path: '/mypage',
                element: <MyPage />
            },
            {
                path: 'storage',
                children: [
                    {
                        path: 'keyword',
                        element: <StoragePage initialType={'keyword'} />
                    },
                    {
                        path: 'map',
                        element: <StoragePage initialType={'map'} />
                    },
                    {
                        path: 'bookmark',
                        element: <StoragePage initialType={'bookmark'} />
                    }
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
                path: '/profileshare',
                element: <ProfileSharePage />
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
        path: '/',
        element: (
            <ProtectedRoute>
                <SimpleLayout />
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/mapexplorer',
                element: <MapExplorerPage />
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
            { path: 'success', element: <SuccessLetterPage /> },
            {
                path: '/letter/map/:lat/:lot/:letterId',
                element: <MapLetterDetailPage />
            },
            {
                path: '/letter/map/:dataType/:letterId',
                element: <MapLetterArchieveDetailContainerPage />
            },
            {
                path: '/letter/keyword/:letterType/:dataType/:letterId',
                element: <KeywordLetterDetailPage />
            }
        ]
    },
    {
        path: '/',
        element: (
            <PublicRoute>
                <AuthLayout />
            </PublicRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/login',
                element: <LoginPage />
            },
            {
                path: '/register',
                element: <RegisterPage />
            }
        ]
    }
]);
