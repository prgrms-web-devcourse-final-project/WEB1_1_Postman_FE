import { useState, useEffect } from 'react';
import { useGetRecommendLetter } from '@/hooks/useGetRecommendLetter';
import { useGetRecentRelyLetter } from '@/hooks/useGetRecentRelyLetter';

export type ReplyLetter = {
    type: 'MAP' | 'KEYWORD';
    labelUrl: string;
    letterId: number;
};

export type RecommendLetter = {
    letterId: number;
    title: string;
    label: string;
};

export function useGetThreeLetterData(toggle: boolean) {
    const [letters, setLetters] = useState<ReplyLetter[] | RecommendLetter[]>(
        []
    );

    const {
        refetch: refetchRecommendedLetters,
        isLoading: isRecommendedLetterLoading,
        isError: isRecommendedLetterError
    } = useGetRecommendLetter();

    const {
        refetch: refetchRecentRelyLetters,
        isLoading: isRecentRelyLetterLoading,
        isError: isRecentRelyLetterError
    } = useGetRecentRelyLetter();

    useEffect(() => {
        const fetchData = toggle
            ? refetchRecommendedLetters
            : refetchRecentRelyLetters;
        fetchData().then((response) => {
            setLetters(response?.data?.result || []);
        });
    }, [toggle, refetchRecommendedLetters, refetchRecentRelyLetters]);

    return {
        letters,
        isLoading: isRecommendedLetterLoading || isRecentRelyLetterLoading,
        isError: isRecommendedLetterError || isRecentRelyLetterError
    };
}
