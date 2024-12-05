import { Container } from '@/components/Common/Container/Container';
import { Margin } from '@/components/Common/Margin/Margin';
import { TitleClosedTopBar } from '@/components/Common/TitleClosedTopBar/TitleClosedTopBar';
import { LotteryAnimationContainer } from '@/components/LabelLotteryPage/LotteryAnimationContainer';

export const LabelLotteryPage = () => {
    return (
        <Container>
            <Margin top={20} />

            <TitleClosedTopBar />

            <Margin top={80}>
                <div className="h-[250px] w-full">
                    <LotteryAnimationContainer />
                </div>

                <div className="flex-center flex-col">
                    <p className="mt-4 text-title2 text-sample-blue">
                        뽑기 이벤트
                    </p>
                    <p className="text-body1 text-sample-textgray">
                        라벨 프로필사진 뽑아보세요
                    </p>
                </div>

                <Margin top={50} />

                <div className="flex-center px-20">
                    <button className="mt-4 w-full h-[49px] text-white flex-center rounded-full bg-sample-blue">
                        뽑기
                    </button>
                </div>
            </Margin>
        </Container>
    );
};
