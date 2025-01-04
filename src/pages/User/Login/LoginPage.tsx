import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EmailInput } from '@/components/Common/Input/EmailInput';
import { PasswordInput } from '@/components/Common/Input/PasswordInput';
import { useToastStore } from '@/hooks/useToastStore';
import { useLogin } from './../../../hooks/useLogin';
import { Link } from 'react-router-dom';

// const KAKAO_CLIENT_ID = import.meta.env.VITE_JAVASCRIPT_KEY as string;
// const REDIRECT_URI = 'http://localhost:5173/login/kakao';
// const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const LoginPage = () => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();
    const { mutate } = useLogin();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const $loginForm = e.target as HTMLFormElement;
        const loginFormData = new FormData($loginForm);
        const [email, password] = [
            loginFormData.get('email') as string,
            loginFormData.get('password') as string
        ];

        if (!(email && password)) {
            addToast('모든 정보를 입력해주세요.', 'warning');
            return;
        }

        mutate({ email, password });
    };

    return (
        <div className="flex flex-col items-center gap-3 w-full h-full my-[50px]">
            <h2 className="text-2xl text-center text-sample-blue font-bold py-3">
                Bottler
            </h2>
            <form
                className="flex flex-col gap-5 w-full p-5"
                onSubmit={handleSubmit}
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <EmailInput></EmailInput>
                        <PasswordInput></PasswordInput>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <div className="flex flex-col gap-3 w-full">
                            <button
                                className="btn-primary-filled"
                                type="submit"
                            >
                                로그인
                            </button>
                            <div>
                                계정이 없으신가요?
                                <Link
                                    to="/register"
                                    className="text-bold text-sample-blue"
                                >
                                    {'  '}회원가입
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
