import { ReactNode, useEffect, useState } from 'react';
import { tokenStorage } from './service/auth/tokenStorage';
import { useUserInfo } from './hooks/useUserInfo';

interface AuthLayoutProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthLayoutProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const { handleGetUserInfo } = useUserInfo();

    useEffect(() => {
        const initializeAuth = async () => {
            const accessToken = tokenStorage.getAccessToken();
            if (accessToken === null) {
                return;
            }
            const success = await handleGetUserInfo();
            if (success) {
                setIsLoading(false);
            }
        };
        initializeAuth();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return children;
};
