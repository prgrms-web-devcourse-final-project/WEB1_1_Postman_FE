/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#D1D5DB',
                sample: {
                    blue: '#22B8EF',
                    gray: '#F5F3F1',
                    black: '#5C5C5C',
                    hoverblue: '#1882A8',
                    textgray: '#C3C3C3',
                    select: '#22ABEF',
                    dayBlue: '#3182F7',
                    afternoonGreen: '#00B963'
                },
                theme: {
                    skyblue: '#98c7fd',
                    heart: '#fef0ed',
                    flower: '#f6f4e2'
                }
            },
            maxWidth: {
                DEFAULT: '768px'
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                'toast-slide-in': {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '10%': { opacity: '1', transform: 'translateY(0)' },
                    '90%': { opacity: '1', transform: 'translateY(0)' },
                    '100%': { opacity: '0', transform: 'translateY(-20px)' }
                }
            },
            animation: {
                fadeIn: 'fadeIn 2s ease forwards',
                'toast-slide-in': 'toast-slide-in 2s ease forwards'
            },
            fontFamily: {
                sans: [
                    'Pretendard',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'system-ui',
                    'Roboto',
                    'sans-serif'
                ],
                bagelfatone: ['BagelFatOne', 'sans-serif'],
                cookierun: ['CookieRunRegular', 'sans-serif'],
                inter: ['InterVariableFont', 'sans-serif'],
                pyeongchangpeace: ['PyeongChangPeaceLight', 'sans-serif'],
                sagak: ['Sagak-sagak', 'sans-serif']
            },
            fontSize: {
                display: ['28px', { lineHeight: '1.3' }], // 큰 제목용
                title1: ['24px', { lineHeight: '1.4' }], // 주요 제목
                title2: ['20px', { lineHeight: '1.45' }], // 중간 제목
                title3: ['18px', { lineHeight: '1.5' }], // 작은 제목
                body1: ['16px', { lineHeight: '1.6' }], // 본문 텍스트
                body2: ['15px', { lineHeight: '1.6' }], // 보조 본문
                caption: ['13px', { lineHeight: '1.4' }], // 캡션, 부가설명
                small: ['12px', { lineHeight: '1.4' }] // 매우 작은 텍스트
            },
            fontWeight: {
                thin: '100', // font-thin
                light: '300', // font-light
                normal: '400', // font-normal
                medium: '500', // font-medium
                semibold: '600', // font-semibold
                bold: '700', // font-bold
                extrabold: '800' // font-extrabold
            }
        }
    },
    plugins: [
        require('tailwindcss-animated'),

        ({ addUtilities }) => {
            addUtilities({
                '.flex-center': {
                    '@apply flex justify-center items-center': ''
                }
            });
        },
        ({ addComponents }) => {
            addComponents({
                '.btn-base': {
                    '@apply bg-primary w-full rounded p-6 text-black hover:opacity-80':
                        ''
                },
                '.text-btn': {
                    '@apply text-black hover:underline': ''
                },
                '.keyword-tag': {
                    '@apply bg-white rounded-lg rounded-2xl p-2': ''
                }
            });
        }
    ]
};
