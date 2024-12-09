import { useNavigate } from 'react-router-dom';
import { Margin } from '../Margin/Margin';

export const Empty = () => {
    const navigate = useNavigate();
    return (
        <div className=" flex flex-col items-center justify-center mt-[35%]">
            <h1 className="text-5xl font-bold mb-4 text-sample-blue">텅</h1>
            <div className="text-xl font-semibold text-gray-700 text-center">
                아직 편지가 발견되지 않았어요.
            </div>
            <p className="mt-2 text-center mb-8">
                지구 이곳저곳에서 편지를 찾아보거나
                <br />
                마음에 드는 곳에 편지를 흘려 보세요.
            </p>
            <button
                className="mt-2 px-4 py-2 bg-sample-blue text-white rounded-md"
                onClick={() => navigate('/mapexplorer')}
            >
                여행하러 가기
            </button>
        </div>
    );
};
