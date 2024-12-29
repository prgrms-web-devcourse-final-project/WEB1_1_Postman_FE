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

type useInfiniteStorageFetchParams = {
    apiEndpoint: string;
    size: number;
};

export const useInfiniteStorageFetch = ({
    apiEndpoint,
    size
}: useInfiniteStorageFetchParams) => {
    const getLetterList = async ({ pageParam }: { pageParam: number }) => {
        console.log(`API 호출: page ${pageParam}, size ${size}`);
        const page = pageParam;
        const response = await getLetter({ apiEndpoint, page, size });
        console.log('데이터:', response.result);
        return response.result;
    };

    const {
        data,
        isError,
        status,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage
    } = useInfiniteQuery({
        queryKey: ['storageLetters', apiEndpoint],
        queryFn: getLetterList,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (
                !lastPage ||
                !lastPage.content ||
                lastPage.content.length === 0
            ) {
                return undefined;
            }
            if (lastPage.content.length < size) {
                return undefined;
            }
            return lastPage.page + 1;
        },
        enabled: apiEndpoint !== undefined,
        refetchOnReconnect: false,
        gcTime: 1000 * 60 * 5,
        staleTime: 1000 * 30
    });

    const groupedLetters = useMemo(() => {
        if (!data?.pages) {
            console.log('데이터없음');
            return [];
        }
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
        status,
        isError,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage
    };
};
