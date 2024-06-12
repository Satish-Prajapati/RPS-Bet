/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'yolo-primary': '#c5a778',
                'yolo-red': '#E21543',
                'yolo-green': '#17BF52',
                'yolo-blue': '#225EFF',
            },
        },
    },
    plugins: [],
};
