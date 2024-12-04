import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';

type SearchResult = {
    lat: string;
    lon: string;
    name: string;
    display_name: string;
};

type SearchHistory = {
    place: string;
    date: string;
};

const fetchNominatimSearch = async (query: string): Promise<SearchResult[]> => {
    const res = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
            q: query,
            format: 'json',
            addressdetails: 1
        }
    });
    return res.data;
};

export default function useNominatimSearch(query: string) {
    const [recentSearches, setRecentSearches] = useState<SearchHistory[]>(
        () => {
            const savedSearches = localStorage.getItem('recentSearches');
            return savedSearches ? JSON.parse(savedSearches) : [];
        }
    );

    const { data, isLoading, error } = useQuery<SearchResult[]>({
        queryKey: ['nominatimSearch', query],
        queryFn: () => fetchNominatimSearch(query),
        enabled: !!query
    });

    useEffect(() => {
        if (data && query) {
            addRecentSearch(query);
        }
    }, [data, query]);

    const addRecentSearch = (newQuery: string) => {
        const formattedDate = new Intl.DateTimeFormat('ko-KR', {
            month: '2-digit',
            day: '2-digit',
            timeZone: 'Asia/Seoul'
        }).format(new Date());

        const [month, day] = formattedDate.split('/');
        const newSearch = {
            place: newQuery,
            date: `${month}.${day}.`
        };

        setRecentSearches((prev) => {
            const updatedSearches = Array.from(
                new Set([
                    JSON.stringify(newSearch),
                    ...prev.map((s) => JSON.stringify(s))
                ])
            )
                .slice(0, 10)
                .map((s) => JSON.parse(s));

            localStorage.setItem(
                'recentSearches',
                JSON.stringify(updatedSearches)
            );
            return updatedSearches;
        });
    };

    return { data, isLoading, error, recentSearches, setRecentSearches };
}
