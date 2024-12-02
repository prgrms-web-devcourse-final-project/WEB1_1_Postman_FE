import { Margin } from '@/components/Common/Margin/Margin';

export const LabelLotteryPage = () => {
    return (
        <div className="h-[100vh] flex-center flex-col gap-[10px]">
            <div className="bg-slate-500 h-[200px] w-full px-[50px]"></div>

            <Margin top={30} />

            <p>뽑기 이벤트</p>
            <p>라벨 프로필사진 뽑아보세요</p>

            <Margin top={50} />

            <div>
                <button className="btn-base w-[240px] h-[60px]">뽑기</button>
                <Margin top={10} />
                <button className="btn-base w-[240px] h-[60px]">
                    친구공유
                </button>
            </div>
        </div>
    );
};
