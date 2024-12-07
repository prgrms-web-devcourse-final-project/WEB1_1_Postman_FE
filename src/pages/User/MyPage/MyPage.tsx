import { useUserStore } from '@/stores/useUserStore';
import { ProfileSection } from '@/components/MyPage/ProfileSection';
import { MenuListSection } from '@/components/MyPage/MenuListSection';
import { KeywordListSection } from '@/components/MyPage/KeywordListSection';
import { logout } from '@/service/auth/logout';
import { useToastStore } from '@/hooks';
import { useNavigate } from 'react-router-dom';

export const MyPage = () => {
    const { user } = useUserStore();
    const { addToast } = useToastStore();
    const navigate = useNavigate();

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

    const labelMenuItems = [{ content: '라벨첩', url: '/labels' }];

    const handleLogout = () => {
        addToast('로그아웃 되었습니다.', 'success');
        logout();
        navigate('/login');
    };

    return (
        <div className="flex flex-col gap-8">
            <h1 className="font-semibold text-gray-600 text-[21px]">
                마이페이지
            </h1>
            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4 justify-end">
                    <ProfileSection user={user!} />
                    <div className="" onClick={handleLogout}>
                        로그아웃
                    </div>
                </div>
                <MenuListSection menuItems={menuItems} />
                <MenuListSection menuItems={labelMenuItems} />
                <KeywordListSection keywords={sampleKeywords} />
            </div>
        </div>
    );
};
