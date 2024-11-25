/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#D1D5DB'
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
        ({ addComponents }) => {
            addComponents({
                '.btn-base': {
                    '@apply bg-primary w-full rounded p-6 text-black hover:opacity-80':
                        ''
                },

                '.text-btn': {
                    '@apply text-black hover:underline': ''
                }
            });
        }
    ]
};
