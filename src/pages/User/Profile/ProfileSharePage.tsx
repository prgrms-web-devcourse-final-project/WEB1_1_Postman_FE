import { IconMenuButton } from '@/components/MyPage/IconMenuButton';
import { KeywordListSection } from '@/components/MyPage/KeywordListSection';
import { useDownloadCanvas } from '@/hooks';
import { useUserStore } from '@/stores';

export const ProfileSharePage = () => {
    const { user } = useUserStore();
    const { captureRef, downloadCanvasAsImage } = useDownloadCanvas();

    const showModal = () => {};

    const handleShare = async () => {
        await downloadCanvasAsImage();
        showModal();
    };

    const sampleKeywords = [
        '키워드',
        '베리 롱 롱 키워드',
        '베리 롱 키워드',
        '키워드',
        '키워드'
    ];

    return (
        <div className="flex flex-col gap-5 items-center">
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
                    keywords={sampleKeywords}
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
