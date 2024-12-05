import { Margin } from '@/components/Common/Margin/Margin';
import React, { useState } from 'react';

type ReportModalProps = {
    id: string;
    closeModal: () => void;
};

export const ReportModal = ({ id, closeModal }: ReportModalProps) => {
    const [selectedReason, setSelectedReason] = useState<string>('');
    const [customReason, setCustomReason] = useState<string>('');

    const reportReasons = [
        '유해한 편지 내용',
        '선정적인 내용',
        '스팸성(광고) 내용',
        '만남 유도',
        '개인정보 과도한 노출',
        '의미없는 도배',
        '기타'
    ];

    const handleReasonChange = (reason: string) => {
        setSelectedReason(reason);
        if (reason !== '기타') {
            setCustomReason('');
        }
    };

    const handleCustomReasonChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCustomReason(event.target.value);
    };

    return (
        <div>
            <div className="flex flex-col bg-white rounded-2xl items-center justify-center w-full h-full p-4">
                <Margin top={10} />
                <span className="font-bold mb-4 text-2xl">
                    편지 신고하기{id}
                </span>
                <span className="text-sm text-gray-700 mb-4">
                    신고 이유 및 설명
                </span>

                <form className="flex flex-col items-start gap-4">
                    {reportReasons.map((reason, index) => (
                        <label
                            key={index}
                            className="flex items-center text-lg"
                        >
                            <input
                                type="radio"
                                name="reportReason"
                                value={reason}
                                checked={selectedReason === reason}
                                onChange={() => handleReasonChange(reason)}
                                className="mr-2"
                            />
                            {reason}
                        </label>
                    ))}
                    {selectedReason === '기타' && (
                        <input
                            type="text"
                            placeholder="신고 사유를 입력해주세요."
                            value={customReason}
                            onChange={handleCustomReasonChange}
                            className="border rounded-lg p-2 w-full mt-2"
                        />
                    )}
                </form>
                <div className="flex-center gap-2">
                    <button
                        onClick={closeModal}
                        className="mt-6 bg-slate-300 w-24 text-white px-4 py-2 rounded-lg"
                    >
                        닫기
                    </button>
                    <button
                        className="mt-6 bg-red-500 w-24 text-white px-4 py-2 rounded-lg"
                        disabled={
                            !selectedReason ||
                            (selectedReason === '기타' &&
                                customReason.trim() === '')
                        }
                    >
                        신고하기
                    </button>
                </div>
            </div>
        </div>
    );
};
