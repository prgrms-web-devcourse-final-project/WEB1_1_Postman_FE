import React from 'react';
import { Bottle } from '../Common/BottleLetter/Bottle/Bottle';
import { Label } from '../Common/BottleLetter/Label/Label';

// 테스트 Props
interface HomeBottleLetterProps {
    labelUrl: string;
    letterId: number;
}

// 유리병 관련 이벤트는 나중에 추가해야 될 것 같습니다
export const HomeBottleLetter = ({
    labelUrl,
    letterId
}: HomeBottleLetterProps) => {
    console.log(letterId);

    return (
        <div className="relative w-full h-full">
            <div className="absolute top-0 left-0 w-full h-full">
                <Bottle />
                <div className="w-[50%] h-[50%] absolute top-[25%] left-[30%] rotate-[-30deg] ">
                    <Label imgSrc={labelUrl} />
                </div>
            </div>
        </div>
    );
};
