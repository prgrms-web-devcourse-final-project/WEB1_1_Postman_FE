import { Logo } from '@/components/Common/LogoContainer/Logo';
import { Margin } from '@/components/Common/Margin/Margin';
import { useNavigate } from 'react-router-dom';

export const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className=" flex flex-col items-center justify-center">
            <Margin top={20} />
            <Logo h={34} />
            <Margin top={300} />
            <h1 className="text-5xl font-bold mb-4">404</h1>
            <div className="text-xl font-semibold text-gray-700 mb-8 text-center">
                페이지를 찾을 수 없습니다.
            </div>
            <p className="text-center mb-8">
                페이지의 주소가 잘못 입력되었거나,
                <br />
                변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
                <br />
                입력하신 페이지 주소를 다시 한번 확인해 주세요.
            </p>
            <button
                className="mt-4 px-4 py-2 bg-sample-blue text-white rounded-md"
                onClick={() => navigate('/')}
            >
                Bottler 홈
            </button>
            <button className="mt-4 px-4 py-2 " onClick={() => navigate(-1)}>
                이전 페이지
            </button>
        </div>
    );
};
