import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

type TitleBackTopBarProps = {
    title?: string;
    clickEvent?: () => void;
};

/** 제목과 뒤로가기 버튼이 있는 TopBar */
export const TitleBackTopBar = ({
    title = '',
    clickEvent
}: TitleBackTopBarProps) => {
    const navicate = useNavigate();

    const handleClick = () => {
        if (clickEvent) {
            clickEvent(); // 전달된 함수 실행
        } else {
            navicate(-1); // 기본 동작으로 이전 페이지로 이동
        }
    };

    return (
        <div className="w-full flex">
            <button onClick={handleClick}>
                <IoIosArrowBack className="size-[34px] text-sample-black" />
            </button>

            <h1 className="absolute left-[50%] translate-x-[-50%] text-title1 text-sample-black">
                {title}
            </h1>
        </div>
    );
};
