import 'styled-components';


declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      text: {
        lv1: string;
        lv2: string;
      };
      bg: {
        lv1: string;
        lv2: string;
        lv3: string;
      };
      accent: {
        high: string;
        low: string;
      };
      grey: string;
      mode: {
        lv1: string;
        lv2: string;
      };
    };
  }
}

declare module "";