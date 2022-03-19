const plugin = require("tailwindcss/plugin");
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Main Color
        primary: "#4678F3",
        "primary-light": "#808080",
        second: "#E2DDDD",
      },
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif", "Arial"],
    },
    container: {
      center: true,
      padding: "1rem",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // require("@tailwindcss/forms"),
    plugin(({ addUtilities }) => {
      const utilities = {
        ".bg-glass": {
          background: "rgba( 191, 55, 55, 0.10 )",
          boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
          backdropFilter: "blur( 9.0px )",
          borderRadius: "blur( 9.0px )",
        },
      };
      addUtilities(utilities);
    }),
  ],
};
