import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useSearchStore } from '@/stores/useSearchStore';
import useDebounce from '@/hooks/useDebounde';
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
            countrycodes: 'KR',
            limit: 10,
            type: 'geocode'
        }
    });
    return res.data;
};

export default function useNominatimSearch(query: string) {
    const { setSearchedLocation, setRelatedSearchTerms } = useSearchStore();
    const debouncedQuery = useDebounce(query, 500);

    const { data, isLoading, error } = useQuery<SearchResult[]>({
        queryKey: ['nominatimSearch', debouncedQuery],
        queryFn: () => fetchNominatimSearch(debouncedQuery),
        enabled: !!debouncedQuery
    });
    useEffect(() => {
        if (data && query) {
            setSearchedLocation(data[0] || null);

            const relatedTerms = data.map((result) => result.display_name);
            setRelatedSearchTerms(relatedTerms);
        }
    }, [
        data,
        query,
        debouncedQuery,
        setSearchedLocation,
        setRelatedSearchTerms
    ]);
    return { data, isLoading, error };
}
