import React from 'react';
import { Label } from '../Common/BottleLetter/Label/Label';
import { useNavigate } from 'react-router-dom';
import { HomeBottle } from './HomeBottle';

interface HomeBottleLetterProps {
    letterType: 'LETTER' | 'REPLY_LETTER';
    labelUrl: string;
    letterId: number;
}

export const HomeBottleLetter = ({
    letterType,
    labelUrl,
    letterId
}: HomeBottleLetterProps) => {
    const navigate = useNavigate();

    const handleClickBottle = () => {
        navigate(`letter/keyword/${letterType}/received/${letterId}`);
    };

    // 키워드 편지 경로
    // /letter/keyword/LETTER/received/49

    // + 답장의 경우 경로?
    // + 아직 지도 편지 답장 경로는 설정하지 않았습니다.
    // /letter/map/received/3
    // /letter/keyword/REPLY_LETTER/received/5

    return (
        <div className="relative w-full h-full">
            <div className="flex-center w-full h-full">
                <div className="h-full w-fit" onClick={handleClickBottle}>
                    <HomeBottle />
                </div>
                <div
                    className="h-[40%] absolute top-[15%] left-[55%] rotate-[-20deg]"
                    onClick={handleClickBottle}
                >
                    <Label imgSrc={labelUrl} />
                </div>
            </div>
        </div>
    );
};
