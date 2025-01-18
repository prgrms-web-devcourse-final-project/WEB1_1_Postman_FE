import { useTimeOfDay } from '@/hooks/useTimeOfDay';
import {
    daytimeIslandImg,
    nightfallIslandImg,
    midnightIslandImg
} from '../../../assets/island/index.ts';
import {
    daytimeWaveImg,
    nightfallWaveImg,
    midnightWaveImg
} from '../../../assets/wave/index.ts';

export const WaveContainer = () => {
    /** 현재 시간 */
    const nowTime = useTimeOfDay();

    const islandImg = {
        daytime: daytimeIslandImg,
        nightfall: nightfallIslandImg,
        midnight: midnightIslandImg
    };

    const waveImg = {
        daytime: daytimeWaveImg,
        nightfall: nightfallWaveImg,
        midnight: midnightWaveImg
    };

    return (
        <div className="z-0">
            <img
                src={islandImg[nowTime]}
                className="absolute bottom-[400px] right-20"
            />

            <div className="absolute h-full w-full animate-shake animate-infinite animate-duration-[5000ms] animate-ease-linear">
                <div
                    className="absolute h-full w-[120%] bg-cover bg-center custom-mask left-[50%] translate-x-[-50%]"
                    style={{ backgroundImage: `url(${waveImg[nowTime]})` }}
                />
            </div>
        </div>
    );
};
