import { Margin } from '@/components/Common/Margin/Margin';
import { useMutation } from '@tanstack/react-query';
import { ApiResponseType } from '@/types/apiResponse';
import { PostReportKeywordLetterResponseType } from '@/types/report';
import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useToastStore } from '@/hooks';
import { postReportKeywordLetter } from '@/service/Report/postReportKeywordLetter';
import { postReportKeywordReplyLetter } from '@/service/Report/postReportKeywordReplyLetter';
import { postReportMapLetter } from '@/service/Report/postReportMapLetter';
import { usePostReportMapReplyLetter } from '@/hooks/usePostReportMapReplyLetter';

type ReportModalProps = {
    closeModal: () => void;
};

export const ReportModal = ({ closeModal }: ReportModalProps) => {
    const [selectedReason, setSelectedReason] = useState<string>('');
    const [customReason, setCustomReason] = useState<string>('');
    const { pathname } = useLocation();
    const mapType = pathname.split('/')[2];
    const letterType = pathname.split('/')[3];
    const { letterId, lat, replyLetterId } = useParams<{
        letterId: string;
        lat: string;
        replyLetterId: string;
    }>();
    const navigate = useNavigate();
    const { addToast } = useToastStore();

    const reportKeywordLetterMutation = useMutation<
        ApiResponseType<PostReportKeywordLetterResponseType>,
        Error,
        void
    >({
        mutationFn: async () => {
            const description =
                selectedReason === '기타' ? customReason : selectedReason;
            return await postReportKeywordLetter({
                letterId: Number(letterId || replyLetterId),
                description
            });
        }
    });

    const reportKeywordReplyLetterMutation = useMutation<
        ApiResponseType<PostReportKeywordLetterResponseType>,
        Error,
        void
    >({
        mutationFn: async () => {
            const description =
                selectedReason === '기타' ? customReason : selectedReason;
            return await postReportKeywordReplyLetter({
                replyLetterId: Number(letterId || replyLetterId),
                description
            });
        }
    });

    const reportMapLetterMutation = useMutation<
        ApiResponseType<PostReportKeywordLetterResponseType>,
        Error,
        void
    >({
        mutationFn: async () => {
            const description =
                selectedReason === '기타' ? customReason : selectedReason;
            return await postReportMapLetter({
                letterId: Number(letterId || replyLetterId),
                description
            });
        }
    });

    const reportMapReplyLetterMutation = usePostReportMapReplyLetter(
        Number(letterId || replyLetterId),
        selectedReason === '기타' ? customReason : selectedReason
    );

    const onReport = () => {
        if (mapType === 'map' && letterType === 'received') {
            reportMapReplyLetterMutation.mutate(undefined, {
                onSuccess: () => {
                    closeModal();
                    addToast(
                        '지도 답장이 성공적으로 신고되었습니다.',
                        'success'
                    );
                    navigate('/storage?type=map');
                },
                onError: () => {
                    addToast('이미 신고가 접수되었습니다.', 'error');
                }
            });
        } else if (lat) {
            reportMapLetterMutation.mutate(undefined, {
                onSuccess: () => {
                    closeModal();
                    addToast(
                        '지도 편지가 성공적으로 신고되었습니다.',
                        'success'
                    );
                    navigate('/mapexplorer');
                },
                onError: () => {
                    addToast('이미 신고가 접수되었습니다.', 'error');
                }
            });
        } else if (letterType === 'LETTER') {
            reportKeywordLetterMutation.mutate(undefined, {
                onSuccess: () => {
                    closeModal();
                    addToast(
                        '키워드 편지가 성공적으로 신고되었습니다.',
                        'success'
                    );
                    navigate('/storage?type=keyword');
                },
                onError: () => {
                    addToast('이미 신고가 접수되었습니다.', 'error');
                }
            });
        } else if (letterType === 'REPLY_LETTER') {
            reportKeywordReplyLetterMutation.mutate(undefined, {
                onSuccess: () => {
                    closeModal();
                    addToast(
                        '키워드 답장이 성공적으로 신고되었습니다.',
                        'success'
                    );
                    navigate('storage?type=keyword');
                },
                onError: () => {
                    addToast('이미 신고가 접수되었습니다.', 'error');
                }
            });
        }
    };

    const reportReasons = [
        '유해한 편지 내용',
        '선정적인 내용',
        '스팸성(광고) 내용',
        '만남 유도',
        '개인정보 과도한 노출',
        '의미없는 도배',
        '기타'
    ];

    const onReasonChange = (reason: string) => {
        setSelectedReason(reason);
        if (reason !== '기타') {
            setCustomReason('');
        }
    };

    const onCustomReasonChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCustomReason(event.target.value);
    };

    return (
        <div>
            <div className="flex flex-col bg-white rounded-2xl items-center justify-center w-52 h-full p-4">
                <Margin top={10} />
                <span className="font-bold mb-4 text-xl">편지 신고하기</span>

                <form className="flex flex-col items-start gap-4">
                    {reportReasons.map((reason, index) => (
                        <label key={index} className="flex items-center text-m">
                            <input
                                type="radio"
                                name="reportReason"
                                value={reason}
                                checked={selectedReason === reason}
                                onChange={() => onReasonChange(reason)}
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
                            onChange={onCustomReasonChange}
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
                        onClick={onReport}
                        className="mt-6 bg-theme-skyblue w-24 text-white px-4 py-2 rounded-lg"
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
