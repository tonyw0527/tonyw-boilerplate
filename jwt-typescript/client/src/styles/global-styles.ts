import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

// A global style for using in the entire app.
export const GlobalStyle = createGlobalStyle`
  ${normalize}

  html,
  body {
    background: ${({ theme }) => theme.color.body_background};
    color: ${({ theme }) => theme.color.body_text};
    font-size: 16px;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;