import { useState } from 'react';
import { useToastStore } from './useToastStore';

export function useLocalStorage<T>(key: string, initialValue: T) {
    const { addToast } = useToastStore();
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            addToast('정보를 불러오는데 실패했습니다.', 'success');
            console.error(error);
            return initialValue;
        }
    });

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            addToast('정보를 저장하는데 실패했습니다.', 'error');
            console.error(error);
        }
    };

    return { storedValue, setValue };
}
