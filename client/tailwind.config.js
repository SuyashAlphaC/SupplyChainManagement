const svgToDataUri = require("mini-svg-data-uri");
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette").default;
const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        neutral: {
          950: '#1e1e1e', // Custom dark color
          800: '#3a3a3a', // Custom medium color
        },
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
    },
  },
  plugins: [
    addVariablesForColors,
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-dot-thick": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none">
                <circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle>
              </svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
});

/**
 * Adds each Tailwind color as a global CSS variable.
 */
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));

  // Ensure colors are properly formatted and exclude null values
  let newVars = Object.fromEntries(
    Object.entries(allColors).filter(([_, val]) => val).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
