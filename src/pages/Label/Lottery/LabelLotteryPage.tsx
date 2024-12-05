import { Margin } from '@/components/Common/Margin/Margin';
import { Container } from '@/components/Common/Container/Container';

export const LabelLotteryPage = () => {
    return (
        <Container>
            <div className="h-[100vh] flex-center flex-col gap-[10px]">
                <div className="bg-slate-500 h-[200px] w-full px-[50px]"></div>

                <Margin top={30} />

                <p>뽑기 이벤트</p>
                <p>라벨 프로필사진 뽑아보세요</p>

                <Margin top={50} />

                <button className="w-full h-[49px] text-white flex-center rounded-full bg-sample-blue">
                    뽑기
                </button>
            </div>
        </Container>
    );
};
