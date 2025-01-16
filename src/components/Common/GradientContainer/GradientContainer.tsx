import { useTimeOfDay } from '@/hooks/useTimeOfDay';

/** 그라디언트 배경을 주는 container */
export const GradientContainer = () => {
    /** 현재 시간 */
    const nowTime = useTimeOfDay();

    const gradientStyle = {
        daytime:
            'linear-gradient(to top, #58A1EB 0%, #91CFF8 50%, #C6E6FC 100%)',
        nightfall:
            'linear-gradient(to top, #F06E6D 0%, #F8C065 50%, #FBE262 80%, #F8C065 100%)',
        midnight:
            'linear-gradient(to top, #334067 0%, #60A4B2 50%, #60A4B2 80%, #334067 100%)'
    };

    return (
        <div
            className="h-full max-w-[475px] min-w-[375px] w-full absolute"
            style={{ background: gradientStyle[nowTime] }}
        ></div>
    );
};
