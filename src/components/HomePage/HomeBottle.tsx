import React from 'react';
import bottleImg from '../../../public/라벨택_유리병.svg';
import { Label } from '../Common/BottleLetter/Label/Label';
import { useNavigate } from 'react-router-dom';

interface HomeBottleProps {
    letterType: 'LETTER' | 'REPLY_LETTER';
    labelUrl: string;
    letterId: number;
}

export const HomeBottle = ({
    letterType,
    labelUrl,
    letterId
}: HomeBottleProps) => {
    const navigate = useNavigate();

    const handleClickBottle = () => {
        navigate(`letter/keyword/${letterType}/received/${letterId}`);
    };

    return (
        <div className="absolute top-[115px] left-[90px] -rotate-[45deg]">
            {/* 믈결 애니메이션 */}
            <div className="absolute h-[300px] w-[300px] rounded-[135px] animate-spin animate-duration-[14000ms] bg-transparent overflow-hidden" />
            <div className="absolute h-[300px] w-[300px] rounded-[135px] animate-spin animate-duration-[12000ms] bg-transparent overflow-hidden" />
            <div className="absolute h-[300px] w-[300px] rounded-[135px] animate-spin animate-duration-[10000ms] bg-transparent overflow-hidden">
                <div className="relative top-[7px] h-[300px] w-[300px] animate-spin animate-duration-[10000ms] animate-reverse">
                    <div className="rotate-[40deg] flex justify-center h-[300px]">
                        <img
                            src={bottleImg}
                            className="object-contain relative top-[35px]"
                            onClick={handleClickBottle}
                        />
                        <div
                            className="h-[35%] absolute top-[105px] left-[190px] rotate-[20deg]"
                            onClick={handleClickBottle}
                        >
                            <Label imgSrc={labelUrl} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
