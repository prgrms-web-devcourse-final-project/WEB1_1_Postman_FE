import { useCallback } from 'react';
import { useToastStore } from './useToastStore';

type Letter = {
    id: string;
    title: string;
    content: string;
    font: string;
    theme: number;
    lastModified: Date;
};

export const useIndexedDB = () => {
    const { addToast } = useToastStore();

    const initDB = async () => {
        return new Promise<IDBDatabase>((resolve, reject) => {
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
                reject('DB 연결 실패');
            };
        });
    };

    // 편지 저장하기
    const saveLetter = useCallback(async (letter: Letter) => {
        try {
            const db = await initDB();
            const tx = db.transaction('letters', 'readwrite');
            const store = tx.objectStore('letters');

            return new Promise<void>((resolve, reject) => {
                const request = store.put(letter);
                request.onsuccess = () => resolve();
                request.onerror = () => reject('저장 실패');
            });
        } catch (error) {
            addToast('저장 중 에러:', 'error');
        }
    }, []);

    // 편지 불러오기
    const getLetter = useCallback(async (id: string) => {
        try {
            const db = await initDB();
            const tx = db.transaction('letters', 'readonly');
            const store = tx.objectStore('letters');

            return new Promise<Letter>((resolve, reject) => {
                const request = store.get(id);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject('불러오기 실패');
            });
        } catch (error) {
            addToast('불러오기 중 에러:', 'error');
        }
    }, []);
    return { saveLetter, getLetter };
};
