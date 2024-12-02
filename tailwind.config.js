/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#D1D5DB'
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
                    '@apply bg-primary rounded-2xl p-2': ''
                }
            });
        }
    ]
};
