export const AUTH_INPUT_VALIDATION = {
    nickname: {
        regexp: /^[a-zA-Z0-9._%+-]{5,15}$/,
        errorMessage:
            '닉네임은 5자 이상 15자 이하여야 하며 영문자, 숫자, 특수문자(._%+-)만 사용해야 합니다.'
    },
    password: {
        regexp: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
        errorMessage:
            '비밀번호는 8자 이상이어야 하며, 영문과 숫자로만 이루어져야 합니다.'
    },
    email: {
        regexp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        errorMessage: '올바른 이메일 형식을 입력해주세요.'
    },
    emailValidateNumber: {
        regexp: /^[A-Za-z0-9]{6}$/,
        errorMessage: '올바른 인증 코드를 입력해주세요.'
    }
};
