import { PaletteOptions } from '@mui/material'

export const palette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#BB86FC',
    light: '#CBB2FC',
    dark: '#8B5CF6',
    contrastText: '#000000',
  },
  secondary: {
    main: '#03DAC6',
    light: '#66FFF9',
    dark: '#00B3A6',
    contrastText: '#000000',
  },
  error: {
    main: '#CF6679',
    light: '#FF939C',
    dark: '#9B3F4D',
  },
  background: {
    default: '#121212',
    paper: '#1E1E1E',
  },
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
  },
}
