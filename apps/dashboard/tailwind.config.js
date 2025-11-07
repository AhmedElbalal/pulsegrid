/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        // explicitly list shared packages you actually use:
        "../../shared/ui/src/**/*.{js,ts,jsx,tsx}",
        "../../shared/types/src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
            colors: {
                brand: { blue: "#2563EB", purple: "#7C3AED" },
            },
        },
    },
    plugins: [],
};
