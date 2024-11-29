import { RiDeleteBin5Line } from 'react-icons/ri';
type DeleteButtonProps = {
    id: string;
    onClick: (id: string) => void;
};

export const DeleteButton = ({ id, onClick }: DeleteButtonProps) => {
    return (
        <button
            onClick={() => onClick(id)}
            className="btn-base flex-center gap-1 p-2 "
        >
            <RiDeleteBin5Line />
            삭제하기
        </button>
    );
};
