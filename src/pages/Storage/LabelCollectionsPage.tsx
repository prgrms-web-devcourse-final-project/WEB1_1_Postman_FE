import { getUserLabel } from './../../service/label/get/getUserLabel';
import { useQuery } from '@tanstack/react-query';

export const LabelCollectionsPage = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['userLabel'],
        queryFn: getUserLabel,
        retry: 1
    });

    if (isLoading) return <div>로딩중...</div>;

    if (isError) return <div>에러</div>;

    if (data.isSuccess) {
        return (
            <div className="">
                {data.result.map((item, index) => {
                    return (
                        <div key={item.labelId + { index }}>
                            {item.imageUrl}
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <>
            {' '}
            <h3 className="text-lg font-bold">라벨 모음</h3>
            <button className="btn-base bg-sample-blue text-white h-[50px] flex items-center justify-center">
                라벨 더 뽑으러 가기
            </button>
        </>
    );
};
