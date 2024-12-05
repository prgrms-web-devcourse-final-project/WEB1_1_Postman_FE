import { IoCloseOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

type TitleClosedTopBarProps = {
    title?: string;
};

export const TitleClosedTopBar = ({ title = '' }: TitleClosedTopBarProps) => {
    const navicate = useNavigate();

    return (
        <div className="w-full flex items-center justify-between">
            <h1 className="text-[20px] font-semibold text-[#5C5C5C]">
                {title}
            </h1>

            <button onClick={() => navicate(-1)}>
                <IoCloseOutline className="size-[34px] text-[#5C5C5C]" />
            </button>
        </div>
    );
};
