import { createTheme } from "@mantine/core";

// https://mantine.dev/colors-generator/ to create custom theme

export const appTheme = createTheme({
  colors: {
    app_blue: [
      "#e7f7ff",
      "#d5e9f9",
      "#add1ee",
      "#81b7e3",
      "#5da1da",
      "#4693d5",
      "#378dd3",
      "#2a82c9",
      "#1a6ca9",
      "#005d97"
    ],
    app_pink: [
      "#ffe8f6",
      "#ffcfe5",
      "#fe9ec6",
      "#fb69a6",
      "#f83d8b",
      "#f7207a",
      "#f70c71",
      "#dd0060",
      "#c60055",
      "#ae0049"
    ]
  },
  primaryColor: "app_blue",
});