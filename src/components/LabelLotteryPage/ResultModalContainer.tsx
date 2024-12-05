import { useNavigate } from 'react-router-dom';
import { TitleClosedTopBar } from '../Common/TitleClosedTopBar/TitleClosedTopBar';
import { Margin } from '../Common/Margin/Margin';

type ResultModalContainerProps = {
    result: boolean;
    clickEvent: () => void;
};

export const ResultModalContainer = ({
    result,
    clickEvent
}: ResultModalContainerProps) => {
    const navigate = useNavigate();

    /** 공유 이미지 추출 이벤트 */
    const handleShareButton = () => {};

    /** 당첨 */
    const winning = (
        <>
            <div className="flex-center flex-col gap-2">
                <span>물결</span>

                <img
                    className="h-[150px] object-cover mb-5"
                    src="/라벨_샘플_01.png"
                    alt=""
                />

                <span>물결 라벨이 나왔어요!</span>
            </div>

            <div className="px-24">
                <button
                    onClick={() => {
                        navigate('/labelcollections');
                    }}
                    className="mt-5 w-full h-[49px] text-white flex-center rounded-full bg-sample-blue"
                >
                    보관함에서 확인
                </button>

                <button
                    onClick={handleShareButton}
                    className="mt-4 mb-4 w-full h-[49px] text-sample-blue flex-center rounded-full border border-sample-blue"
                >
                    공유
                </button>
            </div>
        </>
    );

    /** 낙첨 */
    const lose = (
        <>
            <Margin top={10} bottom={10}>
                <div className="flex-center flex-col gap-10">
                    <img
                        className="h-[100px] object-cover"
                        src="/꽝.svg"
                        alt=""
                    />

                    <span>아쉽지만 다음 기회에..</span>
                </div>
            </Margin>
        </>
    );

    return (
        <div>
            <TitleClosedTopBar clickEvent={clickEvent} />

            {result ? winning : lose}
        </div>
    );
};
