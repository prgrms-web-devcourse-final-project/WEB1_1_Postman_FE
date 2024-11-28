import { ProfileImage } from '@/components/Common/ProfileImage/ProfileImage';
import { DayCounter } from '@/components/Common/DayCounter/DayCounter';

type MapLetterDetailProps = {
    title: string;
    content: string;
    date: string;
};

export const MapLetterDetail = ({
    title,
    content,
    date
}: MapLetterDetailProps) => {
    return (
        <>
            <div className="absolute bottom-4 translate-x-40">
                <ProfileImage width="50px" height="50px" />
            </div>
            <p className="absolute left-24 top-60">{title}</p>
            <p className="absolute left-24 top-[19rem]">{content}</p>
            <div className="absolute bottom-4 translate-x-60 flex-col">
                <p className="ml-2">{date}</p>
                <DayCounter width="70px" height="20px" />
            </div>
        </>
    );
};
