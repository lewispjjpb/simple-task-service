'use client';
import { createTheme } from '@mui/material/styles';

let themePallete = false;
if (typeof window !== 'undefined') {
   themePallete = window.matchMedia('(prefers-color-scheme: dark)').matches
}

const darkTheme = createTheme({
  colorSchemes: {
    dark: themePallete,
  },
});

export default darkTheme;
