import { Container } from '@/components/Common/Container/Container';
import { Margin } from '@/components/Common/Margin/Margin';
import { Modal } from '@/components/Common/Modal/Modal';
import { TitleClosedTopBar } from '@/components/Common/TitleClosedTopBar/TitleClosedTopBar';
import { LotteryAnimationContainer } from '@/components/LabelLotteryPage/LotteryAnimationContainer';
import { ResultModalContainer } from '@/components/LabelLotteryPage/ResultModalContainer';
import { useState } from 'react';

export const LabelLotteryPage = () => {
    const [open, setOpen] = useState(false);

    /** 뽑기 버튼 클릭 이벤트 */
    const handleClickLottery = () => {
        setOpen(true);
    };

    return (
        <Container>
            <Margin top={20} />

            <TitleClosedTopBar />

            <Margin top={80}>
                <div className="h-[250px] w-full">
                    <LotteryAnimationContainer />
                </div>

                <div className="flex-col flex-center">
                    <p className="mt-4 text-title2 text-sample-blue">
                        뽑기 이벤트
                    </p>
                    <p className="text-body1 text-sample-textgray">
                        라벨 프로필사진 뽑아보세요
                    </p>
                </div>

                <Margin top={50} />

                <div className="px-20 flex-center">
                    <button
                        onClick={handleClickLottery}
                        className="mt-4 w-full h-[49px] text-white flex-center rounded-full bg-sample-blue"
                    >
                        뽑기
                    </button>
                </div>
            </Margin>

            {open ? (
                <Modal height="h-fit" clickEvent={() => {}}>
                    <ResultModalContainer
                        result={false}
                        clickEvent={() => {
                            setOpen(false);
                        }}
                    />
                </Modal>
            ) : null}
        </Container>
    );
};
