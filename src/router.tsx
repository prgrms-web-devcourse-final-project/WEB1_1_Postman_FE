import { lazy, ReactNode } from 'react';
import { createBrowserRouter, Outlet, Navigate } from 'react-router-dom';
import { NavigationBar } from '@/components/Common/NavigationBar/NavigationBar';
import {
    ErrorPage,
    CreateLetterPage,
    MyPage,
    LoginPage,
    RegisterPage,
    LabelCollectionsPage,
    NotificationPage,
    SentPage,
    LabelLotteryPage,
    SuccessLetterPage,
    ProfilePage,
    StoragePage,
    KeywordLetterDetailPage,
    MapLetterDetailPage,
    MapLetterArchieveDetailContainerPage,
    KakaoRedirectPage
} from './pages';

const MapExplorerPage = lazy(() => import('@/pages/Map/MapExplorerPage'));
const HomePage = lazy(() => import('@/pages/Home/HomePage'));
const SelectItemPage = lazy(
    () => import('@/pages/Letter/SelectItem/SelectItemPage')
);
const ProfileSharePage = lazy(
    () => import('@/pages/User/Profile/ProfileSharePage')
);

import { tokenStorage } from './service/auth/tokenStorage';
import { AuthProvider } from './AuthProvider';
import { Container } from '@/components/Common/Container/Container';
import { CreateMapLetterPage } from './pages/Map/Create/CreateMapLetterPage';
import { MapSelectItemPage } from './pages/Map/Select/MapSelectItemPage';
import { ErrorBoundary } from './ErrorBoundary';

type RouteProps = {
    children: ReactNode;
};

// 보호 라우트 (로그인 필요)
export const ProtectedRoute = ({ children }: RouteProps) => {
    const Token = tokenStorage.getAccessToken();
    if (Token === null) {
        return <Navigate to="/login" replace />;
    }
    return (
        <ErrorBoundary>
            <AuthProvider>{children}</AuthProvider>
        </ErrorBoundary>
    );
};

// 비보호 라우트 (비로그인 접근 가능)
export const PublicRoute = ({ children }: RouteProps) => {
    return <ErrorBoundary>{children}</ErrorBoundary>;
};

const CommonLayout = () => (
    <div className="flex flex-col h-full">
        <Container px={5}>
            <div className="pb-4">
                <Outlet />
            </div>
        </Container>
        <NavigationBar />
    </div>
);

const SimpleLayout = () => (
    <>
        <Outlet />
    </>
);

const AuthLayout = () => (
    <div className="flex flex-col h-full">
        <Container px={6} pb={6}>
            <Outlet />
        </Container>
    </div>
);

const MapLayout = () => (
    <div className="flex flex-col h-full">
        <Container>
            <Outlet />
        </Container>
        <NavigationBar />
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
                path: 'storage/:selectedLetterType',
                element: <StoragePage />
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
            {
                path: 'map/:lat/:lot/create',
                element: <CreateMapLetterPage />
            },
            {
                path: 'keyword/reply/create/:letterId',
                element: <CreateLetterPage />
            }, // 키워드 답장 편지
            {
                path: 'map/reply/create/:letterId',
                element: <CreateLetterPage />
            }, // 지도 답장 편지
            {
                path: 'create',
                element: <CreateLetterPage />
            },
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
            },
            {
                path: '/letter/map/select',
                element: <MapSelectItemPage />
            },
            {
                path: '/letter/map/:dataType/bookmark/:letterId',
                element: <MapLetterArchieveDetailContainerPage />
            }
        ]
    },
    {
        path: '/',
        element: (
            <PublicRoute>
                <MapLayout />
            </PublicRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/mapexplorer',
                element: <MapExplorerPage />
            },
            {
                path: '/letter/keyword/:letterType/:replyLetterId',
                element: <KeywordLetterDetailPage />
            },
            {
                path: '/letter/map/:letterType/:replyLetterId',
                element: <MapLetterArchieveDetailContainerPage />
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
                path: '/login/kakao',
                element: <KakaoRedirectPage />
            },
            {
                path: '/register',
                element: <RegisterPage />
            }
        ]
    }
]);
