import { useUserStore } from '@/stores/useUserStore';
import { ProfileSection } from '@/components/MyPage/ProfileSection';
import { MenuListSection } from '@/components/MyPage/MenuListSection';
import { KeywordListSection } from '@/components/MyPage/KeywordListSection';
import { logout } from '@/service/auth/logout';
import { useToastStore } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserFrequentKeyword } from '@/service/user/getUserFrequentKeyword';

export const MyPage = () => {
    const { user } = useUserStore();
    const { addToast } = useToastStore();
    const navigate = useNavigate();

    const { data } = useQuery({
        queryKey: ['userFrequentKeyword'],
        queryFn: getUserFrequentKeyword
    });

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
                <KeywordListSection keywords={data?.result.keywords || []} />
            </div>
        </div>
    );
};
