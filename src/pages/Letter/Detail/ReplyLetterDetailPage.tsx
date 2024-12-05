import { BackButton } from '@/components/Common/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { DeleteButton } from '@/components/LetterDetailPage/Delete/DeleteButton';
import { ReportButton } from '@/components/LetterDetailPage/Report/ReportButton';
import { ReplyLetterDetail } from '@/components/LetterDetailPage/LetterDatail/ReplyLetterDetail';

export const ReplyLetterDetailPage = () => {
    const { id } = useParams<{ id: string }>();

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

    const navigate = useNavigate();

    const onBackClick = () => {
        navigate(-1);
    };

    return (
        <>
            <div className="relative mx-auto mt-4 max-w">
                <div className="mx-auto w-[710px]">
                    <BackButton onClick={onBackClick} />
                </div>
                {id && (
                    <div className="absolute top-0 flex mt-10 right-8">
                        <DeleteButton id={id} />
                        <ReportButton id={id} />
                    </div>
                )}
                <div className="relative mt-16 flex-center">
                    <img
                        src={imageItem.src}
                        alt={imageItem.name}
                        className="w-[710px] h-[900px] relative"
                    />
                    <img
                        src={labelItem.src}
                        alt={labelItem.name}
                        className="absolute top-4 translate-x-40 w-[125.32px] h-[201.1px]"
                    />

                    <ReplyLetterDetail
                        title="편지제목"
                        content="편지내용"
                        date="24.11.18"
                    />
                </div>
            </div>
        </>
    );
};
