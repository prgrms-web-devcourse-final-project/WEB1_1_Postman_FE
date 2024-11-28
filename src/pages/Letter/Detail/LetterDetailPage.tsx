import { BackButton } from '@/components/Common/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';
import { MapLetterDetail } from '@/components/LetterDetailPage/MapLetterDetail';
import { KeywordLetterDetail } from '@/components/LetterDetailPage/KeywordLetterDetail';
import { useParams } from 'react-router-dom';

export const LetterDetailPage = () => {
    const { type, id } = useParams<{ type: 'map' | 'keyword'; id: string }>();
    console.log(type, id);
    const imageItem = {
        id: '편지지_샘플_1',
        name: '이미지',
        src: '/편지지_샘플_1.png'
    };
    const labelItem = {
        id: '라벨_샘플',
        name: '이미지',
        src: '/라벨_샘플.png'
    };
    const sampleKeywords = [
        '키워드',
        '베리 롱 롱 키워드',
        '베리 롱 키워드',
        '키워드',
        '키워드',
        '베리 롱 키워드',
        '키워드',
        '키워드'
    ];
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <>
            <div className="mt-4 mx-auto max-w">
                <div className="ml-6">
                    <BackButton onClick={handleBackClick} />
                </div>
                <div className="mt-4 flex-center relative">
                    <img
                        src={imageItem.src}
                        alt={imageItem.name}
                        className="w-[710.72px] h-[900px] relative"
                    />
                    <img
                        src={labelItem.src}
                        alt={labelItem.name}
                        className="absolute top-4 translate-x-40 w-[125.32px] h-[201.1px]"
                    />
                    {type === 'map' ? (
                        <MapLetterDetail
                            title="편지제목"
                            content="편지내용"
                            date="24.11.18"
                            place="서울시 종로구 평창동"
                            hint="서대문역 앞 붕어빵 가게에서"
                        />
                    ) : (
                        <KeywordLetterDetail
                            content="편지내용"
                            keywords={sampleKeywords}
                            date="24.11.18"
                        />
                    )}
                </div>
            </div>

            <div className="mt-4 flex-center mx-auto max-w gap-4">
                <button className="btn-base rounded-3xl w-[339.82px] h-[80px]">
                    보관하기
                </button>
                <button className="btn-base rounded-3xl w-[339.82px] h-[80px]">
                    답장하기
                </button>
            </div>
        </>
    );
};
