import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EmailInput } from '@/components/Common/Input/EmailInput';
import { PasswordInput } from '@/components/Common/Input/PasswordInput';
import { useToastStore } from '@/hooks/useToastStore';
import { useLogin } from './../../../hooks/useLogin';

export const LoginPage = () => {
    const navigate = useNavigate();
    const { addToast } = useToastStore();
    const { mutate } = useLogin();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log('테스트');
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

    const handleNavigateRegister = () => {
        navigate('/register');
    };

    return (
        <div className="flex flex-col gap-3 h-full my-[50px]">
            <form
                className="flex flex-col gap-5 "
                onSubmit={handleSubmit}
                noValidate
            >
                <h2 className="text-2xl font-bold ">로그인</h2>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <EmailInput></EmailInput>
                        <PasswordInput></PasswordInput>
                    </div>
                    <div className="flex flex-row w-full gap-1">
                        <button className="btn-primary-filled" type="submit">
                            로그인
                        </button>
                        <button
                            className="btn-primary"
                            type="button"
                            onClick={handleNavigateRegister}
                        >
                            회원가입
                        </button>
                    </div>
                </div>
            </form>
            <div className="flex gap-3 flex-">
                <div className="text-caption">회원 정보 찾기</div>
            </div>
        </div>
    );
};
