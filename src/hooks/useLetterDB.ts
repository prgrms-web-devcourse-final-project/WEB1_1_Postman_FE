import { useCallback } from 'react';
import { useToastStore } from '@/hooks';

type Letter = {
    id: string;
    title: string;
    content: string;
    font: string;
    theme: number;
    lastModified: Date;
};

export const useLetterDB = () => {
    const { addToast } = useToastStore();

    const initDB = async () => {
        try {
            return await new Promise<IDBDatabase>((resolve, reject) => {
                const request = window.indexedDB.open('LetterDB', 1);

                request.onupgradeneeded = (event) => {
                    const db = (event.target as IDBOpenDBRequest).result;
                    if (!db.objectStoreNames.contains('letters')) {
                        db.createObjectStore('letters', { keyPath: 'id' });
                    }
                };

                request.onsuccess = (event) => {
                    resolve((event.target as IDBOpenDBRequest).result);
                };

                request.onerror = () => {
                    reject(new Error('DB 연결에 실패했습니다'));
                };
            });
        } catch (error) {
            addToast('DB 연결에 실패했습니다', 'error');
            throw error;
        }
    };

    const saveLetter = useCallback(async (letter: Letter) => {
        try {
            const db = await initDB();
            const tx = db.transaction('letters', 'readwrite');
            const store = tx.objectStore('letters');

            await new Promise<void>((resolve, reject) => {
                const request = store.put(letter);
                request.onsuccess = () => resolve();
                request.onerror = () =>
                    reject(new Error('저장에 실패했습니다'));
            });
        } catch (error) {
            addToast('저장에 실패했습니다', 'error');
            console.error(error);
        }
    }, []);

    const getLetter = useCallback(async (id: string) => {
        try {
            const db = await initDB();
            const tx = db.transaction('letters', 'readonly');
            const store = tx.objectStore('letters');

            return await new Promise<Letter>((resolve, reject) => {
                const request = store.get(id);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () =>
                    reject(new Error('불러오기에 실패했습니다'));
            });
        } catch (error) {
            addToast('불러오기에 실패했습니다', 'error');
            console.error(error);
        }
    }, []);

    return { saveLetter, getLetter };
};
