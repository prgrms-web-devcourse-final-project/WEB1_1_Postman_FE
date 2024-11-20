/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    theme: {
        extend: {
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                }
            }
        },
        animation: {
            fadeIn: 'fadeIn 2s ease forwards',
            colors: {
                primary: '#D1D5DB'
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
