import React from 'react';
import {
    daytimeBottleImg,
    nightfallBottleImg,
    midnightBottleImg
} from '../../assets/bottle/index';
import { Label } from '../Common/BottleLetter/Label/Label';
import { useNavigate } from 'react-router-dom';
import { useTimeOfDay } from '@/hooks/useTimeOfDay';

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

    /** 디테일 키워드 편지로 이동 */
    const handleClickBottle = () => {
        navigate(`letter/keyword/${letterType}/received/${letterId}`);
    };

    /** 현재 시간 */
    const nowTime = useTimeOfDay();

    const bottleImg = {
        daytime: daytimeBottleImg,
        nightfall: nightfallBottleImg,
        midnight: midnightBottleImg
    };

    return (
        <div className="absolute top-[120px] left-[60px] -rotate-[45deg]">
            {/* 믈결 애니메이션 */}
            <div className="absolute h-[300px] w-[300px] rounded-[135px] animate-spin animate-duration-[14000ms] bg-transparent overflow-hidden" />
            <div className="absolute h-[300px] w-[300px] rounded-[135px] animate-spin animate-duration-[12000ms] bg-transparent overflow-hidden" />
            <div className="absolute h-[300px] w-[300px] rounded-[135px] animate-spin animate-duration-[10000ms] bg-transparent overflow-hidden">
                <div className="relative top-[7px] h-[300px] w-[300px] animate-spin animate-duration-[10000ms] animate-reverse">
                    <div className="rotate-[40deg] flex justify-center h-[300px]">
                        <img
                            src={bottleImg[nowTime]}
                            className="object-contain relative top-[35px]"
                            onClick={handleClickBottle}
                        />
                        <div
                            onClick={handleClickBottle}
                            className="h-[35%] absolute top-[100px] left-[170px] rotate-[20deg]"
                        >
                            <Label imgSrc={labelUrl} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
