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
            className="flex items-center justify-between w-full h-12 px-4 py-2 text-gray-400 cursor-pointer hover:bg-slate-200 "
            onClick={() => {
                onClick(place);
            }}
        >
            <LuMapPin />
            <span className="flex-1 ml-2 truncate">{place}</span>
        </div>
    );
};
