module.exports = {
    purge: [
        './src/**/*.{js,jsx,ts,tsx}',
        './public/index.html'
    ],
    darkMode: false,
    theme: {
        extend: {},
        container: {
            center: true,
            padding: '2rem',
        },
    },
    variants: {
        extend: {
            borderWidth: ['hover', 'focus'],
        },
    },
    plugins: [],
}