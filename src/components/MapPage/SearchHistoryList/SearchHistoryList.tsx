import { LuMapPin } from 'react-icons/lu';
type SearchHistoryListProps = {
    place: string;
    date: string;
    index: number;
    onDelete: (index: number) => void;
};

export const SearchHistoryList = ({
    place,
    date,
    index,
    onDelete
}: SearchHistoryListProps) => {
    return (
        <div className="flex items-center py-2 justify-between w-full text-gray-400">
            <LuMapPin />
            <span className="flex-1">{place}</span>
            <span className="mr-2">{date}</span>
            <span className="cursor-pointer" onClick={() => onDelete(index)}>
                x
            </span>
        </div>
    );
};
