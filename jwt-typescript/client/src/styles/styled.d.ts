import 'styled-components';

// interface for theme
// add the interface to the styled-components library.
declare module 'styled-components' {
  export interface DefaultTheme {
    mode: string;

    color: {
      body_background: string;
      body_text: string;
    }
  }
}