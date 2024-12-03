import { LuMapPin } from 'react-icons/lu';
type SearchHistoryListProps = {
    place: string;
    date: string;
};

export const SearchHistoryList = ({ place, date }: SearchHistoryListProps) => {
    return (
        <div className="flex items-center py-2 justify-between w-full text-gray-400">
            <LuMapPin />
            <span className="flex-1">{place}</span>
            <span className="mr-2">{date}</span>
            <span className="cursor-pointer">x</span>
        </div>
    );
};
