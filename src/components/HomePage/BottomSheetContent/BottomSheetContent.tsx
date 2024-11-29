import { UserType } from '@/types/user';
import { useHomeSheetStore } from '@/stores/index';

type BottomSheetContentProps = {
    user: UserType;
};

export const BottomSheetContent = ({ user }: BottomSheetContentProps) => {
    const { setOpen } = useHomeSheetStore();

    const selectedKeywords = ['키워드4', '키워드5', '키워드6', '키워드7'];
    const allKeywords = [
        '키워드1',
        '키워드2',
        '키워드3',
        '키워드4',
        '키워드5',
        '키워드6',
        '키워드7',
        '키워드8',
        '키워드9',
        '키워드10',
        '키워드11',
        '키워드12',
        '키워드13',
        '키워드14'
    ];

    return (
        <div className="p-5">
            <div>
                <p className="">{user.nickname}님이 선택하신 키워드 입니다.</p>
                <p className="">설정하신 키워드로 편지를 추천해드릴게요.</p>
                {selectedKeywords.map((keyword, i) => {
                    return <span key={i}>{keyword}</span>;
                })}
            </div>
            <div>
                <p className="">누구와 마음을 나누고 싶나요?</p>
                <p className="">설정하신 키워드로 편지를 추천해드릴게요.</p>
                {allKeywords.map((keyword, i) => {
                    return <span key={i}>{keyword}</span>;
                })}
            </div>
            <button
                onClick={() => {
                    setOpen(false);
                }}
                className="btn-base flex-center w-full h-[60px]"
            >
                완료
            </button>
        </div>
    );
};
