import { useNavigate } from 'react-router-dom';
import { IoCloseOutline } from '@react-icons/all-files/io5/IoCloseOutline';

type TitleClosedTopBarProps = {
    title?: string;
    clickEvent?: () => void;
};

/** 제목과 닫기 버튼이 있는 TopBar */
export const TitleClosedTopBar = ({
    title = '',
    clickEvent
}: TitleClosedTopBarProps) => {
    const navicate = useNavigate();

    const handleClick = () => {
        if (clickEvent) {
            clickEvent(); // 전달된 함수 실행
        } else {
            navicate(-1); // 기본 동작으로 이전 페이지로 이동
        }
    };

    return (
        <div className="flex items-center justify-between w-full">
            <h1 className="text-[20px] font-semibold text-[#5C5C5C]">
                {title}
            </h1>

            <button onClick={handleClick}>
                <IoCloseOutline className="size-[34px] text-[#5C5C5C]" />
            </button>
        </div>
    );
};
