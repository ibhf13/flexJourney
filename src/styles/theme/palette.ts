import { PaletteOptions } from '@mui/material';

// Define custom colors as constants
const PRIMARY = {
  lighter: '#E9DBFF',
  light: '#CBB2FC',
  main: '#BB86FC',
  dark: '#8B5CF6',
  darker: '#6833E4',
  contrastText: '#000000',
};

const SECONDARY = {
  lighter: '#B8FFF9',
  light: '#66FFF9',
  main: '#03DAC6',
  dark: '#00B3A6',
  darker: '#018786',
  contrastText: '#000000',
};

const ERROR = {
  lighter: '#FFB4BE',
  light: '#FF939C',
  main: '#CF6679',
  dark: '#9B3F4D',
  darker: '#7D2E3B',
  contrastText: '#FFFFFF',
};

const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#08660D',
  dark: '#229A16',
  darker: '#08660D',
  contrastText: '#ffffff',
};

const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
  contrastText: '#000000',
};

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

export const palette: PaletteOptions = {
  mode: 'dark',
  common: { black: '#000000', white: '#FFFFFF' },
  primary: PRIMARY,
  secondary: SECONDARY,
  error: ERROR,
  warning: WARNING,
  success: SUCCESS,
  grey: GREY,
  background: {
    default: '#121212',
    paper: '#1E1E1E',
  },
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  action: {
    active: '#FFFFFF',
    hover: 'rgba(255, 255, 255, 0.08)',
    selected: 'rgba(255, 255, 255, 0.16)',
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    focus: 'rgba(255, 255, 255, 0.12)',
  },
};