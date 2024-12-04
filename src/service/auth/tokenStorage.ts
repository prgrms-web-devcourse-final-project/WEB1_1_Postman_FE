const ACCESS_TOKEN_KEY = 'accessToken';

export const tokenStorage = {
    getAccessToken: () => {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    },

    setAccessToken: (token: string): void => {
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    },

    clearTokens: (): void => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
};
