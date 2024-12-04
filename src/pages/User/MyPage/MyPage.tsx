import { useUserStore } from '@/stores/useUserStore';
import { ProfileSection } from '@/components/MyPage/ProfileSection';
import { MenuListSection } from '@/components/MyPage/MenuListSection';
import { KeywordListSection } from '@/components/MyPage/KeywordListSection';
import { Container } from '@/components/Common/Container/Container';

export const MyPage = () => {
    const { user } = useUserStore();

    const sampleKeywords = [
        '키워드',
        '베리 롱 롱 키워드',
        '베리 롱 키워드',
        '키워드',
        '키워드'
    ];

    const menuItems = [
        { content: '키워드 편지함', url: '/storage/keyword' },
        { content: '지도 편지함', url: '/storage/map' },
        { content: '보관함', url: '/storage/bookmark' }
    ];

    const labelMenuItems = [{ content: '라벨첩', url: '/mypage/label' }];

    return (
        <Container>
            <div className="flex flex-col gap-8">
                <h1 className="font-semibold text-gray-600 text-[21px]">
                    마이페이지
                </h1>
                <div className="flex flex-col gap-10">
                    <ProfileSection user={user} />
                    <MenuListSection menuItems={menuItems} />
                    <MenuListSection menuItems={labelMenuItems} />
                    <KeywordListSection keywords={sampleKeywords} />
                </div>
            </div>
        </Container>
    );
};
