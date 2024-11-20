/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    theme: {
        extend: {
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
