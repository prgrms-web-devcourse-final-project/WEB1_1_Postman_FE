import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EmailInput } from '@/components/Common/Input/EmailInput';
import { PasswordInput } from '@/components/Common/Input/PasswordInput';
import { useUserStore } from '@/stores/useUserStore';
import { login } from '@/service/auth/login';
import { getUserInfo } from '@/service/user/getUserInfo';
import { Container } from '@/components/Common/Container/Container';
import { useToastStore } from '@/hooks/useToastStore';

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

        if (!(email && password)) {
            addToast('모든 정보를 입력해주세요.', 'warning');
            return;
        }

        try {
            const loginResponse = await login({ email, password });
            console.log('응답 : ', loginResponse.code);

            switch (loginResponse.code) {
                case 'COMMON200': {
                    addToast('로그인에 성공했습니다.', 'success');
                    const userInfoResponse = await getUserInfo();
                    const userInfoWithEmail = {
                        ...userInfoResponse,
                        email: email
                    };
                    setUser(userInfoWithEmail);
                    navigate('/');
                    break;
                }
                case 'USER4000': {
                    addToast('유저를 찾을 수 없습니다.', 'warning');
                    break;
                }
                case 'USER4001': {
                    addToast('비밀번호가 일치하지 않습니다.', 'warning');
                    break;
                }
                default:
                    addToast('로그인 처리에 실패했습니다.', 'warning');
                    break;
            }
        } catch (error) {
            console.error('에러: ', error);
            addToast('서버 오류입니다. 다시 시도해주세요', 'error');
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
