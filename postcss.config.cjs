module.exports = {
    plugins: {
        'postcss-custom-properties-fallback': {
            importFrom: require.resolve(
                'react-spring-bottom-sheet/defaults.json'
            )
        },
        tailwindcss: {},
        autoprefixer: {}
    }
};
