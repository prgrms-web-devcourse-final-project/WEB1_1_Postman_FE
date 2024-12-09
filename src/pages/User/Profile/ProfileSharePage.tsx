import { BackButtonCotainer } from '@/components/Common/BackButtonContainer/BackButtonCotainer';
import { IconMenuButton } from '@/components/MyPage/IconMenuButton';
import { KeywordListSection } from '@/components/MyPage/KeywordListSection';
import { useDownloadCanvas } from '@/hooks';
import { getUserFrequentKeyword } from '@/service/user/getUserFrequentKeyword';
import { useUserStore } from '@/stores';
import { useQuery } from '@tanstack/react-query';

export const ProfileSharePage = () => {
    const { user } = useUserStore();
    const { captureRef, downloadCanvasAsImage } = useDownloadCanvas();

    const showModal = () => {};

    const handleShare = async () => {
        await downloadCanvasAsImage();
        showModal();
    };

    const { data } = useQuery({
        queryKey: ['userFrequentKeyword'],
        queryFn: getUserFrequentKeyword
    });

    return (
        <div className="flex flex-col gap-5 items-center">
            <BackButtonCotainer />
            <h2 className="text-bold text-lg">{user?.nickname}</h2>
            <div
                className="flex flex-col bg-sample-blue rounded-md p-4 gap-3 w-[290px] items-center"
                ref={captureRef}
            >
                <div className="bg-white w-[full] rounded-md">
                    <img
                        src={user?.profileImageUrl}
                        className="object-contain p-5"
                        crossOrigin="anonymous"
                    />
                </div>
                <KeywordListSection
                    keywords={data?.result.keywords || []}
                    showTitle={false}
                />
            </div>
            <IconMenuButton
                onClick={handleShare}
                iconUrl="/ic_share.svg"
                content="공유하기"
            />
        </div>
    );
};
