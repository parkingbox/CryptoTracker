import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  color: {
    text: {
      lv1: "#000000",
      lv2: "#000000",
    },
    bg: {
      lv1: "#F2E0D0",
      lv2: "#ffffff",
      lv3: "#594E45",
    },
    accent: {
      high: "#e02343",
      low: "#1764b6",
    },
    grey: "#eeeeee",

    mode: {
      lv1: "#1f2a3c",
      lv2: "#aab1b9",
    },
  },
};

export const darkTheme: DefaultTheme = {
  color: {
    text: {
      lv1: "#aab1b9",
      lv2: "#ffffff",
    },
    bg: {
      lv1: "#1b2336",
      lv2: "#1f2a3c",
      lv3: "#2a384f",
    },
    accent: {
      high: "#e02343",
      low: "#1764b6",
    },
    grey: "#949caf",

    mode: {
      lv1: "#ffffff",
      lv2: "#000000",
    },
  },
};
