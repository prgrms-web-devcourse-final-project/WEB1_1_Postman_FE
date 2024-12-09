import { BackButtonCotainer } from '@/components/Common/BackButtonContainer/BackButtonCotainer';
import { IconMenuButton } from '@/components/MyPage/IconMenuButton';
import { KeywordListSection } from '@/components/MyPage/KeywordListSection';
import { useDownloadCanvas } from '@/hooks';
import { getUserFrequentKeyword } from '@/service/user/getUserFrequentKeyword';
import { useUserStore } from '@/stores';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const ProfileSharePage = () => {
    const { user } = useUserStore();
    const { captureRef, downloadCanvasAsImage } = useDownloadCanvas();
    const [convertedImgUrl, setConvertedImgUrl] = useState<string>();

    const { data } = useQuery({
        queryKey: ['userFrequentKeyword'],
        queryFn: getUserFrequentKeyword
    });

    const handleShare = async () => {
        await downloadCanvasAsImage();
    };

    const convertImageToBase64 = async (imageUrl: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/png'));
            };
            img.onerror = reject;
            img.src = imageUrl;
        });
    };

    useEffect(() => {
        if (user?.profileImageUrl) {
            convertImageToBase64(user.profileImageUrl)
                .then((base64) => {
                    setConvertedImgUrl(base64);
                })
                .catch(console.error);
        }
    }, [user?.profileImageUrl]);

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
                        src={convertedImgUrl}
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
