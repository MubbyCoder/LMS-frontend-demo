import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  sm: "320px",
  md: "769px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
};
const colors = {
  primary: {
    100: "#BFDB38",
    300: "#bdcab8",
    400: "#6b9081",
    500: "#293529",
  },
  text: {
    coral: "#083830",
    charcoal: "#475467",
  },
};

const fonts = {
  body: ["IBM Plex Sans", "sans-serif"],
  heading: ["IBM Plex Sans", "sans-serif"],
};
const theme = extendTheme({
  breakpoints,
  colors,
  fonts,
  components: {
    Button: {
      baseStyle: {
        _hover: {
          // Apply the opacity change on hover
          // bg: "carland.100", // Change this to the color you want on hover
          opacity: 0.9, // Adjust the opacity value as desired
        },
      },
    },
  },
  global: {
    a: {
      _hover: {
        color: "white", // Change this to the desired color for hover
      },
      "&[aria-current='page']": {
        color: "white", // Change this to the desired color for active links
      },
    },
  },
});

export default theme;