import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EmailInput } from '@/components/Common/Input/EmailInput';
import { PasswordInput } from '@/components/Common/Input/PasswordInput';
import { useUserStore } from '@/stores/useUserStore';
import { login } from '@/service/auth/login';
import { getUserInfo } from '@/service/user/getUserInfo';
import { Container } from '@/components/Common/Container/Container';
import { useToastStore } from '@/hooks/useToastStore';

// 성공 시나리오 success@email.com
// 존재하지 않는 유저 fail@email.com
// 서버 오류 fail@email.com
export const LoginPage = () => {
    const navigate = useNavigate();
    const { setUser } = useUserStore();
    const { addToast } = useToastStore();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const $loginForm = e.target as HTMLFormElement;
        const loginFormData = new FormData($loginForm);
        const [email, password] = [
            loginFormData.get('email') as string,
            loginFormData.get('password') as string
        ];

        if (!(email && password)) return;

        try {
            const loginResponse = await login({ email, password });
            console.log('로그인 완료', loginResponse);

            const userInfoResponse = await getUserInfo();
            console.log(userInfoResponse);
            // 임시 (백엔드 데이터 수정 예정)
            const userInfoWithEmail = {
                ...userInfoResponse.result,
                email: email
            };

            setUser(userInfoWithEmail);

            navigate('/');
        } catch (error) {
            console.error(error);
            addToast('로그인 처리에 실패했습니다.', 'error');
        }
    };

    const handleNavigateRegister = () => {
        navigate('/register');
    };

    return (
        <Container>
            <div className="flex flex-col gap-3 h-full my-[50px]">
                <form
                    className=" flex flex-col gap-5"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <h2 className="font-bold text-2xl ">로그인</h2>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <EmailInput></EmailInput>
                            <PasswordInput></PasswordInput>
                        </div>
                        <div className="flex flex-row gap-1 w-full">
                            <button
                                className="btn-primary-filled"
                                type="submit"
                            >
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
                <div className="flex flex- gap-3">
                    <div className="text-caption">회원 정보 찾기</div>
                </div>
            </div>
        </Container>
    );
};
