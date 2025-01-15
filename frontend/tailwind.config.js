module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This will scan all files in the src folder for class names
  ],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 10s linear infinite", // Marquee animation applied here
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" }, // Start from right
          "100%": { transform: "translateX(-100%)" }, // End at left
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")], // Optional: for line clamping support (cutting text off after a set number of lines)
};
