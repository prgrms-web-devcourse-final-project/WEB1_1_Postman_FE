import { RiDeleteBin5Line } from 'react-icons/ri';
type DeleteButtonProps = {
    onClick: () => void;
};

export const DeleteButton = ({ onClick }: DeleteButtonProps) => {
    return (
        <button onClick={onClick} className="btn-base flex-center gap-1 p-2 ">
            <RiDeleteBin5Line />
            삭제하기
        </button>
    );
};
