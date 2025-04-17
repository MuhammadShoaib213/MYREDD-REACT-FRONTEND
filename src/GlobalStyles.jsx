// src/styles/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* 1. Reset box‑model */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* 2. Anchor your root font-size */
  html {
    /* static baseline: 16px */
    font-size: 62.5%;
    /* OR fluid: min 14px, ideal 1.2vw, max 18px */
    /* font-size: clamp(0.875rem, 1.2vw, 1.125rem); */
  }

  body {
    font-family: 'Roboto', sans-serif;
    line-height: 1.5;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }

  /* 3. Optional: sensible defaults for headings */
  h1 { font-size: 2rem; }
  h2 { font-size: 1.75rem; }
  h3 { font-size: 1.5rem; }
`;
console.log(getComputedStyle(document.documentElement).fontSize);
