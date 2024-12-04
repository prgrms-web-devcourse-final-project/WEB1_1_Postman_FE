import { useEffect } from 'react';
import { useToastStore } from './useToastStore';

type AutoSaveCallback = () => void;

export const useAutoSave = (callback: AutoSaveCallback, interval: number) => {
    const { addToast } = useToastStore();

    useEffect(() => {
        const autoSave = setInterval(() => {
            setTimeout(() => {
                try {
                    callback();
                    addToast('임시저장에 성공했습니다.', 'success');
                } catch (error) {
                    addToast('임시저장에 실패했습니다.', 'error');
                    console.error(error);
                }
            }, 0);
        }, interval);

        return () => {
            clearInterval(autoSave);
        };
    }, [callback, interval, addToast]);
};
