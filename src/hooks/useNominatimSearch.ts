import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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
            addressdetails: 1
        }
    });
    return res.data;
};

export default function useNominatimSearch(query: string) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['nominatimSearch', query],
        queryFn: () => fetchNominatimSearch(query),
        enabled: !!query
    });

    return { data, isLoading, error };
}
