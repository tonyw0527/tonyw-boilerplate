import { DefaultTheme } from 'styled-components';

// Light Theme
const lightTheme: DefaultTheme = {
  mode: 'light',
  color: {
    body_background: '#E2E2E2',
    body_text: '#363537'
  }
}

const darkTheme: DefaultTheme = {
  mode: 'dark',
  color: {
    body_background: '#363537',
    body_text: '#FAFAFA'
  }
}

export { lightTheme, darkTheme };