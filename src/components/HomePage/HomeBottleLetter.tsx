import React from 'react';
import { Bottle } from '../Common/BottleLetter/Bottle/Bottle';
import { Label } from '../Common/BottleLetter/Label/Label';
import { useNavigate } from 'react-router-dom';

interface HomeBottleLetterProps {
    letterType: 'keyword' | 'reply';
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
        navigate(`/letter/${letterType}/${letterId}`);
    };

    return (
        <div className="relative w-full h-full">
            <div className="w-full h-full flex-center">
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
