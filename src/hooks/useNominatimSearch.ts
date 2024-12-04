import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useSearchStore } from '@/stores/useSearchStore';

type SearchResult = {
    lat: string;
    lon: string;
    name: string;
    display_name: string;
};

const fetchNominatimSearch = async (query: string): Promise<SearchResult[]> => {
    const res = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
            q: query,
            format: 'json',
            addressdetails: 1,
            countrycodes: 'KR'
        }
    });
    return res.data;
};

export default function useNominatimSearch(query: string) {
    const { setSearchedLocation } = useSearchStore();
    const { data, isLoading, error } = useQuery<SearchResult[]>({
        queryKey: ['nominatimSearch', query],
        queryFn: () => fetchNominatimSearch(query),
        enabled: !!query
    });
    useEffect(() => {
        if (data && query) {
            setSearchedLocation(data[0] || null);
        }
    }, [data, query, setSearchedLocation]);
    return { data, isLoading, error };
}
