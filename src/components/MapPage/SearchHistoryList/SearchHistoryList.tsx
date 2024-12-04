import { LuMapPin } from 'react-icons/lu';
type SearchHistoryListProps = {
    place: string;
    date: string;
    index: number;
    onDelete: (index: number) => void;
    onClick: (place: string) => void;
};

export const SearchHistoryList = ({
    place,
    date,
    index,
    onDelete,
    onClick
}: SearchHistoryListProps) => {
    return (
        <div
            className="flex items-center py-2 px-4 justify-between w-full cursor-pointer text-gray-400 hover:bg-slate-200"
            onClick={() => {
                onClick(place);
            }}
        >
            <LuMapPin />
            <span className="flex-1">{place}</span>
            <span className="mr-2">{date}</span>
            <span
                className="cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(index);
                }}
            >
                x
            </span>
        </div>
    );
};
