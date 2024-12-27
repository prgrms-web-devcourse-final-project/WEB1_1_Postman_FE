import { useCallback } from 'react';

type Letter = {
    id: string;
    title: string;
    content: string;
    font: string;
    theme: number;
    lastModified: Date;
};

export const useLetterDB = () => {
    const initDB = async () => {
        return new Promise<IDBDatabase>((resolve) => {
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
                throw new Error('DB 연결에 실패했습니다');
            };
        });
    };

    const saveLetter = useCallback(async (letter: Letter) => {
        const db = await initDB();
        const tx = db.transaction('letters', 'readwrite');
        const store = tx.objectStore('letters');

        return new Promise<void>((resolve) => {
            const request = store.put(letter);
            request.onsuccess = () => resolve();
            request.onerror = () => {
                throw new Error('저장에 실패했습니다');
            };
        });
    }, []);

    const getLetter = useCallback(async (id: string) => {
        const db = await initDB();
        const tx = db.transaction('letters', 'readonly');
        const store = tx.objectStore('letters');

        return new Promise<Letter>((resolve) => {
            const request = store.get(id);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => {
                throw new Error('불러오기에 실패했습니다');
            };
        });
    }, []);

    return { saveLetter, getLetter };
};
