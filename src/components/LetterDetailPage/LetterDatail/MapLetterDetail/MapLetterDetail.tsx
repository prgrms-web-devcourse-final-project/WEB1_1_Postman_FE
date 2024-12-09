import { DayCounter } from '@/components/Common/DayCounter/DayCounter';
import { Margin } from '@/components/Common/Margin/Margin';
import { TextArea } from '@/components/Common/TextArea/TextArea';
import { useToastStore } from '@/hooks';
import { usePostNearByLetterStorage } from '@/hooks/usePostNearByLetterStorage';
import { formatDate } from '@/util/formatDate';
import { getLetter } from '@/service/storage/getLetter';
import { useGetCheckMapReplyLetter } from '@/hooks/useGetCheckMapReplyLetter';
import clsx from 'clsx';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ReportButton } from '../../Report/ReportButton';

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
    const { letterId } = useParams<{ letterId: string }>();
    const {
        title,
        content,
        description,
        createdAt,
        profileImg,
        font,
        isOwner
    } = letterData;
    const navigate = useNavigate();
    const [isStored, setIsStored] = useState(false);

    const { data: isReplied } = useGetCheckMapReplyLetter({
        letterId: Number(letterId)
    });

    useEffect(() => {
        const checkStoredLetter = async () => {
            const storedLetters = await getLetter({
                apiEndpoint: '/map/archived',
                page: 1,
                size: 100
            });

            const letter = storedLetters.result.content.find(
                (letter) => letter.letterId === Number(letterId)
            );
            if (letter) {
                setIsStored(true);
            }
        };

        checkStoredLetter();
    }, [letterId]);

    const postMutation = usePostNearByLetterStorage(Number(letterId) || 0);

    const { addToast } = useToastStore();

    const onStorageClick = () => {
        if (!isStored) {
            postMutation.mutate(undefined, {
                onSuccess: (response) => {
                    if (response.isSuccess) {
                        if (response.code === 'COMMON201') {
                            addToast('편지 저장에 성공했습니다', 'success');
                            setIsStored(true);
                            localStorage.setItem(
                                `storedLetter-${letterId}`,
                                'true'
                            );
                        } else if (response.code === 'MAP4009') {
                            addToast('편지가 이미 저장되어 있습니다.', 'error');
                            setIsStored(true);
                            localStorage.setItem(
                                `storedLetter-${letterId}`,
                                'true'
                            );
                        }
                    } else {
                        addToast('편지 저장에 실패했습니다.', 'error');
                    }
                }
            });
        }
    };

    const onReplyClick = () => {
        navigate(`/letter/map/reply/create/${letterId}`);
    };

    return (
        <>
            <div className="absolute top-8 right-16 cursor-pointer">
                <ReportButton />
            </div>
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
                        <TextArea
                            value={content}
                            font={font}
                            isReadonly={true}
                        />
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
                    <Margin bottom={2} />
                </div>
                {!isOwner && (
                    <>
                        <div className="flex">
                            <button
                                className="btn-base flex-center rounded-3xl h-[40px]"
                                onClick={onStorageClick}
                            >
                                {isStored ? '보관됨' : '보관하기'}
                            </button>
                            {!isReplied && (
                                <button
                                    className="btn-base flex-center rounded-3xl h-[40px]"
                                    onClick={onReplyClick}
                                >
                                    편지에 답장하기
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};
