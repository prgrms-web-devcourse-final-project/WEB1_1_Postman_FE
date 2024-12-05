import { LuMapPin } from 'react-icons/lu';
import { LiaTimesSolid } from 'react-icons/lia';

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
            className="flex items-center justify-between w-full h-12 px-4 py-2 text-gray-400 cursor-pointer hover:bg-slate-200"
            onClick={() => {
                onClick(place);
            }}
        >
            <LuMapPin />
            <span className="flex-1 ml-2 truncate">{place}</span>
            <span className="mr-2">{date}</span>
            <span
                className="cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(index);
                }}
            >
                <LiaTimesSolid />
            </span>
        </div>
    );
};
