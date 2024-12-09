import React from 'react';
import { Bottle } from '../Common/BottleLetter/Bottle/Bottle';
import { Label } from '../Common/BottleLetter/Label/Label';
import { useNavigate } from 'react-router-dom';

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
    console.log(letterId);
    const navigate = useNavigate();

    const handleClickBottle = () => {
        navigate(`letter/keyword/${letterType}/received/${letterId}`);
    };

    console.log('letterId - ', letterType);
    console.log('letterId - ', letterId);

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
                    <Bottle />
                </div>
                <div className="w-[60%] h-[60%] absolute top-[15%] left-[55%] rotate-[-20deg] ">
                    <Label imgSrc={labelUrl} />
                </div>
            </div>
        </div>
    );
};
