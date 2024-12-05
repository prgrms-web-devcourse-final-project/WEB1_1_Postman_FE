import { LuMapPin } from 'react-icons/lu';
type RelatedSearchTermsListProps = {
    place: string;
    onClick: (place: string) => void;
};
export const RelatedSearchTermsList = ({
    place,
    onClick
}: RelatedSearchTermsListProps) => {
    return (
        <div
            className="flex items-center py-2 px-4 h-12 justify-between w-full cursor-pointer text-gray-400 hover:bg-slate-200 "
            onClick={() => {
                onClick(place);
            }}
        >
            <LuMapPin />
            <span className="flex-1 ml-2 truncate">{place}</span>
        </div>
    );
};
