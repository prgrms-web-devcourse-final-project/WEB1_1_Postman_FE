import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EmailInput } from '@/components/Common/Input/EmailInput';
import { PasswordInput } from '@/components/Common/Input/PasswordInput';
import { useUserStore } from '@/stores/useUserStore';
import { login } from '@/service/auth/login';

// 성공 시나리오 success@email.com
// 존재하지 않는 유저 fail@email.com
// 서버 오류 fail@email.com
export const LoginPage = () => {
    const navigate = useNavigate();
    const { setUser } = useUserStore();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const $loginForm = e.target as HTMLFormElement;
        const loginFormData = new FormData($loginForm);
        const [email, password] = [
            loginFormData.get('email') as string,
            loginFormData.get('password') as string
        ];

        login({ email, password }).then((response) => {
            setUser(response.data);
            console.log('로그인 완료 : ', response.data);
            navigate('/');
        });
    };

    return (
        <div className="p-3 flex flex-col gap-3">
            <form className=" flex flex-col gap-5" onSubmit={handleSubmit}>
                <h2 className="font-bold text-2xl ">로그인</h2>
                <div className="flex flex-col gap-10">
                    <EmailInput></EmailInput>
                    <PasswordInput></PasswordInput>
                    <button className="bg-slate-200">로그인</button>
                </div>
            </form>
            <div className="flex flex-col gap-3">
                <div className="bg-slate-200">회원가입</div>
                <div className="bg-slate-200">회원 정보 찾기</div>
            </div>
        </div>
    );
};
