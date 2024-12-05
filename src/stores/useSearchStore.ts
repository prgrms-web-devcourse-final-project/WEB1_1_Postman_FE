import { create } from 'zustand';

type SearchHistory = {
    place: string;
    date: string;
};

type SearchResult = {
    lat: string;
    lon: string;
    name: string;
    display_name: string;
};

type SearchStore = {
    recentSearches: SearchHistory[];
    searchedLocation: SearchResult | null;
    relatedSearchTerms: string[];
    loadRecentSearches: () => void;
    saveSearchTerm: (searchTerm: string) => void;
    clearAllSearches: () => void;
    deleteSearchTerm: (index: number) => void;
    setSearchedLocation: (result: SearchResult | null) => void;
    clearSearchedLocation: () => void;
    setRelatedSearchTerms: (terms: string[]) => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
    recentSearches: [],
    searchedLocation: null,
    relatedSearchTerms: [],

    loadRecentSearches: () => {
        const storedSearches = localStorage.getItem('recentSearches');
        if (storedSearches) {
            set({ recentSearches: JSON.parse(storedSearches) });
        }
    },

    saveSearchTerm: (searchTerm: string) => {
        if (searchTerm.trim()) {
            const today = new Date();
            const month = today.getMonth() + 1;
            const day = today.getDate();
            set((state) => {
                const updatedSearches = [
                    { place: searchTerm, date: `${month}.${day}.` },
                    ...state.recentSearches.filter(
                        (item) => item.place !== searchTerm
                    )
                ];
                localStorage.setItem(
                    'recentSearches',
                    JSON.stringify(updatedSearches)
                );
                return { recentSearches: updatedSearches };
            });
        }
    },

    clearAllSearches: () => {
        localStorage.removeItem('recentSearches');
        set({ recentSearches: [] });
    },

    deleteSearchTerm: (index: number) => {
        set((state) => {
            const updatedSearches = [...state.recentSearches];
            updatedSearches.splice(index, 1);
            localStorage.setItem(
                'recentSearches',
                JSON.stringify(updatedSearches)
            );
            return { recentSearches: updatedSearches };
        });
    },

    setSearchedLocation: (result: SearchResult | null) => {
        set({ searchedLocation: result });
    },
    clearSearchedLocation: () => {
        set({ searchedLocation: null });
    },

    setRelatedSearchTerms: (terms: string[]) => {
        set({ relatedSearchTerms: terms });
    }
}));
