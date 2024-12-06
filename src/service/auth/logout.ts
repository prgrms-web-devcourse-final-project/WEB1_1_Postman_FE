import { tokenStorage } from './tokenStorage';

export function logout(): void {
    tokenStorage.clearTokens();
}
