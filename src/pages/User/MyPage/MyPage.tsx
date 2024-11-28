import { useUserStore } from '@/stores/useUserStore';
import { ProfileSection } from '@/components/MyPage/ProfileSection';
import { RecordGridSection } from '@/components/MyPage/RecordGridSection';
import { KeywordListSection } from '@//components/MyPage/KeywordListSection';

export const MyPage = () => {
    const { user } = useUserStore();

    const sampleKeywords = [
        '키워드',
        '베리 롱 롱 키워드',
        '베리 롱 키워드',
        '키워드',
        '키워드'
    ];

    return (
        <div className="flex flex-col p-5 gap-8">
            <h1 className="font-semibold text-gray-600 text-[21px]">
                마이페이지
            </h1>
            <div className="flex flex-col gap-10">
                <ProfileSection user={user} />
                <RecordGridSection />
                <KeywordListSection keywords={sampleKeywords} />
            </div>
        </div>
    );
};
