import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getLetter } from '@/service/storage/getLetter';

interface Letter {
    letterId: number;
    title: string;
    label: string;
    letterType: string;
    boxType: string;
    createdAt: string;
}

export const useInfiniteStorageFetch = (apiEndpoint: string, size: number) => {
    const getLetterList = async ({ pageParam }: { pageParam: number }) => {
        const page = pageParam;
        const response = await getLetter({ apiEndpoint, page, size });
        return response.result;
    };

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        isFetching,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ['storageLetters', apiEndpoint],
        queryFn: getLetterList,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (!lastPage || lastPage.content.length < size) {
                return undefined;
            }
            return lastPage.page + 1;
        },
        refetchOnMount: false,
        gcTime: 1000 * 60 * 5,
        staleTime: 1000 * 30
    });

    const groupedLetters = useMemo(() => {
        if (!data?.pages) return [];

        const allLetters = data.pages.flatMap((page) => page.content);

        const grouped = allLetters.reduce(
            (acc: { [key: string]: Letter[] }, letter) => {
                const date = new Date(letter.createdAt)
                    .toISOString()
                    .split('T')[0];

                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date].push(letter);
                return acc;
            },
            {}
        );

        return Object.entries(grouped)
            .map(([date, letters]) => ({
                date,
                letters: letters.sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                )
            }))
            .sort(
                (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
            );
    }, [data]);

    return {
        groupedLetters,
        isLoading,
        isError,
        fetchNextPage,
        isFetching,
        isFetchingNextPage
    };
};
