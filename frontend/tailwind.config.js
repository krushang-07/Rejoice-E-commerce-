module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        blink: "blink 0.5s infinite alternate",
      },
      keyframes: {
        blink: {
          "0%": { backgroundColor: "#f4f4f4" }, // Light gray
          "100%": { backgroundColor: "#e0e0e0" }, // Darker gray
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
