import { DayCounter } from '@/components/Common/DayCounter/DayCounter';
import { Margin } from '@/components/Common/Margin/Margin';
import { TextArea } from '@/components/Common/TextArea/TextArea';
import { formatDate } from '@/util/formatDate';
import clsx from 'clsx';

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
    const { title, content, description, createdAt, profileImg, font } =
        letterData;
    return (
        <div className={clsx(font ? font : 'font-sans')}>
            <Margin top={20} />
            <div className="relative z-20 flex flex-col justify-center w-9/12 m-auto py-9">
                <img
                    src={profileImg}
                    className="w-[15%] h-[15%] absolute top-[-7%] "
                />
                <h1>{title}</h1>
                <img src={'/to_line.f4c129e6.svg'} className="w-full" />

                <div className="relative">
                    <TextArea value={content} font={font} isReadonly={true} />
                </div>

                <Margin top={30} />
                <div className="flex justify-between w-full ">
                    <p className="font-bold ">장소 힌트</p>
                    <div>
                        <p className="">{formatDate(createdAt)}</p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <span className="block w-9/12 break-words whitespace-normal">
                        {description}
                    </span>
                    <span>{DayCounter({ createdAt })}</span>
                </div>
                <Margin bottom={30} />
            </div>
        </div>
    );
};
