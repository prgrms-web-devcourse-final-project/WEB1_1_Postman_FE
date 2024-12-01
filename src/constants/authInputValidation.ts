export const AUTH_INPUT_VALIDATION = {
    nickname: {
        regexp: /^[a-zA-Z0-9가-힣]{1,10}$/,
        errorMessage: '닉네임은 1-10자 사이의 한글, 영문, 숫자만 가능합니다.'
    },
    password: {
        regexp: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
        errorMessage: '비밀번호는 8자 이상의 영문과 숫자로 작성해주세요.'
    },
    email: {
        regexp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        errorMessage: '올바른 이메일 형식을 입력해주세요.'
    },
    emailVerifyCode: {
        regexp: /^[A-Za-z0-9]{6}$/,
        errorMessage: '올바른 인증 코드를 입력해주세요.'
    }
};
