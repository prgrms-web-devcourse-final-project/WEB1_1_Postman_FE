export const AUTH_INPUT_VALIDATION = {
    nickname: {
        regexp: /^[a-zA-Z0-9가-힣]{1,8}$/,
        errorMessage: '8자 이내의 한글, 영문, 숫자'
    },
    password: {
        regexp: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
        errorMessage: '8자 이상의 영문, 숫자'
    },
    email: {
        regexp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        errorMessage: '잘못된 형식입니다.'
    },
    emailVerifyCode: {
        regexp: /^[A-Za-z0-9]{6}$/,
        errorMessage: '잘못된 형식입니다.'
    }
};
