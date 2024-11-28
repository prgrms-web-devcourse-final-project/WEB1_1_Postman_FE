import { ProfileImage } from '@/components/Common/ProfileImage/ProfileImage';
import { DayCounter } from '@/components/Common/DayCounter/DayCounter';
import { LuMapPin } from 'react-icons/lu';
type MapLetterDetailProps = {
    title: string;
    content: string;
    date: string;
    place: string;
    hint: string;
};

export const MapLetterDetail = ({
    title,
    content,
    date,
    place,
    hint
}: MapLetterDetailProps) => {
    return (
        <>
            <div className="absolute bottom-4 translate-x-40">
                <ProfileImage width="50px" height="50px" />
            </div>
            <p className="absolute left-24 top-60 font-bold">{title}</p>
            <p className="absolute left-24 top-[19rem]">{content}</p>
            <div className="absolute bottom-48 flex items-center left-24">
                <LuMapPin /> {place}
            </div>

            <div className="absolute bottom-20 rounded-3xl w-[580px] h-[100px] bg-gray-300">
                <p className="font-bold m-4">장소 힌트</p>
                <p className="overflow-hidden whitespace-nowrap text-ellipsis m-4">
                    {hint}
                </p>
            </div>
            <div className="absolute bottom-4 translate-x-60 flex-col">
                <p className="ml-2">{date}</p>
                <DayCounter width="70px" height="20px" />
            </div>
        </>
    );
};
