module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        banner: "url('/banner.jpeg')", // Define custom image
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
