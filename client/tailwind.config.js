/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#2A2A2A',
                secondary: '#F5F5F5',
                accent: '#D4A373',
            }
        },
    },
    plugins: [],
}
