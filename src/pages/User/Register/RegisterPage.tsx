import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmailInput } from '@/components/Common/Input/EmailInput';
import { PasswordInput } from '@/components/Common/Input/PasswordInput';
import { ConfirmPasswordInput } from '@/components/RegisterPage/ConfirmPasswordInput';
import { VerifyEmailInput } from '@/components/Common/Input/VerifyEmailInput';
import { NicknameInput } from '@/components/Common/Input/NicknameInput';
import { sendEmail } from '@/service/auth/sendEmail';
import { verifyEmail } from '@/service/auth/verifyEmail';
import { checkNickname } from '@/service/auth/checkNickname';

export const RegisterPage = () => {
    const navigate = useNavigate();

    // 이메일
    const [email, setEmail] = useState<string>('');
    const [authNum, setAuthNum] = useState<string>('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);

    // 비밀번호
    const [password, setPassword] = useState<string>('');

    // 닉네임
    const [nickname, setNickname] = useState<string>('');
    const [isNicknameValid, setIsNicknameValid] = useState<boolean>(false);

    // 이메일 인증번호 요청 전송
    const handleRequestEmailVerifyCode = () => {
        if (email) {
            sendEmail({ email }).then((response) => {
                if (response.data === 'success') {
                    // 성공 이후 로직
                }
            });
        }
    };

    // 이메일 인증번호 일치 여부 체크
    const handleVerifyEmail = () => {
        if (authNum) {
            verifyEmail({ email, authNum }).then((response) => {
                if (response.data === 'success') {
                    setIsEmailVerified(true);
                }
            });
        }
    };

    // 닉네임 중복 체크
    const handleCheckNickname = () => {
        if (nickname) {
            checkNickname({ nickname }).then((response) => {
                if (response.data.isDuplicated === true) {
                    setIsNicknameValid(true);
                }
            });
        }
    };

    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     const $registerForm = e.target as HTMLFormElement;
    //     const registerFormData = new FormData($registerForm);
    //     const [email, password, confirmPassword, nickname] = [
    //         registerFormData.get('email') as string,
    //         registerFormData.get('password') as string,
    //         registerFormData.get('confirmPassword') as string,
    //         registerFormData.get('nickname') as string
    //     ];
    //     const isConfirmPasswordValid = password === confirmPassword;
    //     const isTotalValid =
    //         isEmailVerified && isNicknameValid && isConfirmPasswordValid;
    //     // 회원 등록
    //     if (isTotalValid) {
    //         // 회원 등록 로직 작성
    //         // register(email, password, nickname);
    //     }
    // };

    return (
        <div className="p-3 flex flex-col gap-3">
            <h2 className="font-bold text-2xl ">회원가입</h2>
            <div className="flex flex-col gap-10">
                <form>
                    <EmailInput onValueChange={setEmail} />
                    <button
                        type="button"
                        className="bg-slate-200"
                        onClick={handleRequestEmailVerifyCode}
                    >
                        인증번호 전송
                    </button>
                    <VerifyEmailInput onValueChange={setAuthNum} />
                    <button
                        type="button"
                        className="bg-slate-200"
                        onClick={handleVerifyEmail}
                    >
                        인증 확인
                    </button>
                    <div>
                        <PasswordInput />
                        <ConfirmPasswordInput />
                    </div>
                    <div>
                        <NicknameInput
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setNickname(e.target.value)}
                        />
                        <button
                            type="button"
                            className="bg-slate-200"
                            onClick={handleCheckNickname}
                        >
                            중복 확인
                        </button>
                    </div>
                    <button type="submit" className="bg-slate-200">
                        가입하기
                    </button>
                </form>
            </div>
        </div>
    );
};
