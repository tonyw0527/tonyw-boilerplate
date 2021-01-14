import React from "react";

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";
import { useDarkMode } from "./styles/useDarkMode";
import { GlobalStyle } from "./styles/global-styles";

function App() {
  const [theme, toggleTheme, componentMounted] = useDarkMode();

  if (!componentMounted) {
    return <div></div>;
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      {"test"}
      <button
        onClick={() => {
          toggleTheme();
        }}
      >
        Click!
      </button>
    </ThemeProvider>
  );
}

export default App;
