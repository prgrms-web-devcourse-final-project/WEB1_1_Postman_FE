import { DayCounter } from '@/components/Common/DayCounter/DayCounter';
import { Margin } from '@/components/Common/Margin/Margin';
import { formatDate } from '@/util/formatDate';
import clsx from 'clsx';
import { DeleteButton } from '../../Delete/DeleteButton';
import { TextArea } from '@/components/Common/TextArea/TextArea';
import { useGetMapReplyList } from '@/hooks/useGetMapReplyList';
import { ReplyList } from '../../ReplyList/ReplyList';

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
    letterId: string;
};

export const MapLetterArchieveDetail = ({
    letterData,
    letterId
}: MapLetterDetailProps) => {
    const { title, content, createdAt, font, description, profileImg } =
        letterData;

    const {
        data: mapReplyListData,
        isLoading: isMapReplyListDataLoading,
        error: mapReplyListDataError
    } = useGetMapReplyList({
        letterId: Number(letterId) || 0,
        page: 1,
        size: 9
    });

    console.log(mapReplyListData);
    if (isMapReplyListDataLoading) {
        return <div>로딩 중...</div>;
    }

    if (mapReplyListDataError instanceof Error) {
        return <div>오류...: {mapReplyListDataError.message}</div>;
    }

    return (
        <div className={clsx(font ? font : 'font-sans')}>
            <Margin top={20} />
            <div className="relative z-20 flex flex-col justify-center w-9/12 m-auto py-9">
                <div className="absolute top-0 right-0">
                    <DeleteButton />
                </div>
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

            {mapReplyListData?.content ? (
                <div className="mt-16 mx-auto">
                    <ReplyList
                        title={title}
                        keywordReplyListData={mapReplyListData.content}
                    />
                </div>
            ) : null}
        </div>
    );
};
