import { DayCounter } from '@/components/Common/DayCounter/DayCounter';
import { formatDate } from '@/util/formatDate';

type MapLetterDetailProps = {
    letterData: {
        title: string;
        content: string;
        description: string;
        createdAt: string;
        profileImg: string;
        font: string;
        paper: string;
        label: string;
        isOwner: boolean;
    };
};

export const MapLetterDetail = ({ letterData }: MapLetterDetailProps) => {
    console.log(letterData);
    const { title, content, description, createdAt, profileImg } = letterData;
    return (
        <>
            <p className="absolute top-[15rem] font-bold">{title}</p>
            <p className="absolute top-[30rem]">{content}</p>
            <div className="absolute bottom-16  min-w-[375px] max-w-[477px]  h-[100px]">
                <div className="absolute bottom-20 rounded-3xl w-full h-[100px] bg-gray-300">
                    <p className="font-bold m-4">장소 힌트</p>
                    <p className="overflow-hidden whitespace-nowrap text-ellipsis m-4">
                        {description}
                    </p>
                </div>
                <div className="absolute bottom-4 translate-x-60 flex-col">
                    <div className="absolute bottom-4 translate-x-40">
                        {profileImg}
                    </div>
                    <p className="ml-2">{formatDate(createdAt)}</p>
                    <DayCounter daysLeft={21} width="70px" height="20px" />
                </div>
            </div>
        </>
    );
};
