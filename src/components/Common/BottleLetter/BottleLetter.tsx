import React from 'react';
import { Bottle } from './Bottle/Bottle';
import { Label } from './Label/Label';

// 테스트 편지 데이터 타입
interface LetterType {
    letterId?: number;
    createdDate?: string;
    font?: string;
    keywords?: string[];
    content?: string;
    paper?: string;
    label: string;
}
// 테스트 Props
interface BottleLetterProps {
    Letter: LetterType;
}

// 유리병 관련 이벤트는 나중에 추가해야 될 것 같습니다
export const BottleLetter = ({ Letter }: BottleLetterProps) => {
    return (
        <div className="relative w-full h-full">
            <div className="absolute top-0 left-0 w-full h-full">
                <Bottle />
                <div className="w-[50%] h-[50%] absolute top-[25%] left-[30%] rotate-[-30deg] ">
                    <Label imgSrc={Letter.label} />
                </div>
            </div>
        </div>
    );
};
