import { Margin } from '@/components/Common/Margin/Margin';

type DeleteModalProps = {
    id: string;
    closeModal: () => void;
};

export const DeleteModal = ({ id, closeModal }: DeleteModalProps) => {
    return (
        <div className="flex flex-col bg-white rounded-2xl items-center justify-center w-full h-full p-4">
            <Margin top={10} />
            <span className="font-bold mb-4 text-2xl">
                {id}편지를 삭제하시겠습니까?
            </span>

            <div className="flex-center gap-2">
                <button
                    onClick={closeModal}
                    className="mt-6 bg-slate-300 w-24 text-white px-4 py-2 rounded-lg"
                >
                    닫기
                </button>
                <button className="mt-6 bg-slate-500 w-24 text-white px-4 py-2 rounded-lg">
                    삭제하기
                </button>
            </div>
        </div>
    );
};
